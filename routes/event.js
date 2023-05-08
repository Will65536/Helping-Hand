import { Router } from "express";
import { BSON } from "mongodb";
import * as validation from "../validation.js";
import { eventData } from "../data/index.js";
import { userData } from "../data/index.js";

const router = Router();

router.route("/create").get(async (req, res) => {
  try {
    if (req.session.isHost) {
      return res.render("create_event", {
        title: "Create Event",
        user: true,
        first_name: req.session.first_name,
        isHost: req.session.isHost,
      });
    } else {
      res.status(403).render("error", { error: 403 });
    }
  } catch (e) {
    res.status(500).render("error", { error: 500 });
  }
});
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
router.route("/create").post(async (req, res) => {
  try {
    if (req.session.isHost) {
      const userId = req.session.user_id;
      const userInfo = await userData.getUserById(userId);

      let eventName = validation.isValidString(req.body.event_name);
      let description = validation.isValidString(req.body.description);
      let application_deadline = validation.isValidEventTime(
        parseInt(req.body.application_deadline)
      );
      let host_time = validation.isValidEventTime(parseInt(req.body.host_time));
      let streetAddress = validation.isValidString(req.body.streetAddress);
      let city = validation.isValidString(req.body.city);
      let state = validation.isValidString(req.body.state);
      let zipcode = validation.isValidString(req.body.zipcode);

      if (req.body.image_url) {
        req.body.image_url = validation.isValidImageUrl(req.body.image_url);
        var image_url = req.body.image_url;
      } /*else if (req.body.image_file) {
        var image_url = "";
        console.log(image.file);
        var image_file = req.body.image_file;
        image_file = BSON.Binary(image_file);
      }*/ else {
        var image_url = "No_Image_Available.jpg";
      }

      if (host_time < application_deadline)
        throw "Error: Event Date & Time should be after Registration Deadline";

      if (!userInfo.contact) {
        throw "Error: As a host, You should update your contact message in your profile firstly";
      }

      const hostInfo = {
        host_id: userId,
        host_name: userInfo.first_name + " " + userInfo.last_name,
        contact: userInfo.email,
      };

      hostInfo.host_name = toTitleCase(hostInfo.host_name);
      const location = {
        address: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
      };

      const event = await eventData.addEvent(
        eventName,
        description,
        application_deadline,
        host_time,
        location,
        hostInfo,
        image_url,
      );

      return res.status(200).json({ success: true, event_id: event._id });
    } else {
      return res.status(403).render("error", { error: 403 });
    }
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

router.route("/:id").get(async (req, res) => {
  let eventDetail = await eventData.getEventByEventId(req.params.id);

  eventDetail.isRegistrationExpired = false;
  if (
    new Date(eventDetail.application_deadline).getTime() -
      new Date().getTime() <
    0
  ) {
    eventDetail.isRegistrationExpired = true;
  }
  eventDetail.isEventExpired = false;

  if (new Date(eventDetail.host_time).getTime() - new Date().getTime() < 0) {
    eventDetail.isEventExpired = true;
  }

  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  eventDetail["etime"] = longEnUSFormatter.format(
    new Date(eventDetail.host_time)
  );
  eventDetail.host_time = eventDetail.etime;

  eventDetail.application_deadline = longEnUSFormatter
    .format(new Date(eventDetail.application_deadline))
    .toString();
  let isRegistered = false;

  if (req.session && req.session.loggedIn) {
    let user = req.session.user_id;
    let eventHostUser = eventDetail.host_info.host_id;

    if (eventDetail.volunteers.includes(user)) isRegistered = true;

    if (user === eventHostUser) {
      let volunteers = {};
      let eventVolunteer = eventDetail.volunteers;
      try {
        for (let i = 0; i < eventVolunteer.length; i++) {
          let user = await userData.getUserById(eventVolunteer[i]);
          volunteers[eventVolunteer[i]] = {
            first_name: user.first_name,
            last_name: user.last_name,
            contact: user.contact,
            email: user.email,
          };
        }
      } catch (e) {
        console.log(e);
      }

      return res.render("event", {
        title: "Event Details",
        event: eventDetail,
        isHost: true,
        user: true,
        first_name: req.session.first_name,
        volunteerList: volunteers,
        volunteersCount: Object.keys(volunteers).length,
        isRegistered,
      });
    } else {
      return res.render("event", {
        title: "Event Details",
        event: eventDetail,
        isHost: false,
        user: true,
        first_name: req.session.first_name,
        isRegistered,
      });
    }
  } else {
    return res.render("event", {
      title: "Event Details",
      event: eventDetail,
      isHost: false,
      user: false,
      isRegistered,
    });
  }
});

router.route("/:id").patch(async (req, res) => {
  if (req.body.reqType === "register") {
    try {
      let updatedEventDetail = await eventData.addVolunteers(
        req.params.id,
        req.session.user_id
      );
      console.log(updatedEventDetail);
      if (updatedEventDetail) res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ success: false, error: e });
    }
  } else if (req.body.reqType === "unregister") {
    try {
      let updatedEventDetail = await eventData.removeVolunteerToEvent(
        req.params.id,
        req.session.user_id
      );

      if (updatedEventDetail) res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ success: false, error: e });
    }
  }
});

router.route("/edit/:id").get(async (req, res) => {
  try {
    if (req.session.isHost) {
      const eventId = req.params.id;
      const userId = req.session.user_id;
      let eventDetail = await eventData.getEventByEventId(eventId);

      if (eventDetail.host_info.host_id === userId) {
        return res.render("edit_event", {
          title: "Edit Event",
          event: eventDetail,
          user: true,
          first_name: req.session.first_name,
          isHost: req.session.isHost
        });
      } else {
        res.status(403).render("error", { error: 403 });
      }
    } else {
      res.status(403).render("error", { error: 403 });
    }
  } catch (e) {
    res.status(500).render("error", { error: 500 });
  }
});

router.route("/edit/:id").patch(async (req, res) => {
  try {
    if (req.session.isHost) {
      const eventId = req.params.id;
      const userId = req.session.user_id;
      let eventDetail = await eventData.getEventByEventId(req.params.id);

      if (eventDetail.host_info.host_id === userId) {
        let description = validation.isValidString(req.body.description);
        let application_deadline = validation.isValidEventTime(
          parseInt(req.body.application_deadline)
        );
        let host_time = validation.isValidEventTime(
          parseInt(req.body.host_time)
        );
        let streetAddress = validation.isValidString(req.body.streetAddress);
        let city = validation.isValidString(req.body.city);
        let state = validation.isValidString(req.body.state);
        let zipcode = validation.isValidString(req.body.zipcode);

        if (req.body.image_url) {
          req.body.image_url = validation.isValidImageUrl(req.body.image_url);
          var image_url = req.body.image_url;
        } /*else if (req.body.image_file) {
          var image_url = "";
          console.log(image.file);
          var image_file = req.body.image_file;
          image_file = BSON.Binary(image_file);
        }*/ else {
          var image_url = "No_Image_Available.jpg";
        }

        if (host_time < application_deadline)
          throw "Error: Event Date & Time should be after Registration Deadline";

        eventDetail.description = description;
        eventDetail.application_deadline = application_deadline;
        eventDetail.host_time = host_time;
        eventDetail.image_url = image_url;
        eventDetail.location = {
          address: streetAddress,
          city: city,
          state: state,
          zipcode: zipcode,
        };

        await eventData.updateEventPatch(eventId, eventDetail);

        res.json({ success: true });
      } else {
        res.status(403).render("error", { error: 403 });
      }
    } else {
      res.status(403).render("error", { error: 403 });
    }
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

router.route("/details/:id").get(async (req, res) => {
    try{
      if(req.xhr){
        let eventId = req.params.id.trim();
        validation.isValidId(eventId);
        const event_details = await eventData.getEventByEventId(eventId);

        let user_details = {
          isUser: false
        };
        if (req.session.user_id){
          user_details ={
            isUser: true,
            user_id: req.session.user_id.trim()
          }
        }
        
        res.json({event_details: event_details, user_details: user_details})
      }else{
        res.render("error", {error: 404})
      }
    }catch(e){
      res.status(500).render("error", {error: 500});
    }
})

router.route("/:id/story").post(async (req, res) => {
    try{
      if (req.session.loggedIn){
        const eventId = req.params.id.trim();
        validation.isValidId(eventId);
        const userId = req.session.user_id.trim();
        validation.isValidId(userId);
        
        const event = await eventData.getEventByEventId(eventId);
        const isRegistered = event.volunteers.indexOf(userId)

        if(isRegistered !== -1){
          const story = validation.isValidString(req.body.story);
          validation.isValidStoryString(story);

          await eventData.upsertStory(eventId, userId, story);
          
          res.json({ success: true });
        }else{
          res.json({ success: false, error: "You must be registered for this event to submit a story"})
        }

      }else{
        res.json({ success: false, error: "You must be logged in to submit a story"})
      }

    }catch(e){
        return res.json({ success: false, error: e });
    }
});

router.route("/:id/feedback").post(async (req, res) => {
  try{
    const eventId = req.params.id.trim();
    validation.isValidId(eventId);

    const feedback = validation.isValidString(req.body.feedback);
    validation.isValidFeedbackString(feedback);

    if (req.session.loggedIn){
      const userId = req.session.user_id.trim();
      validation.isValidId(userId);

      await eventData.upsertLoggedInUserFeedback(eventId, userId, feedback);
      
      res.json({ success: true });

    }else{
      let first_name = validation.isValidString(req.body.first_name);
      validation.isValidName(first_name)

      let last_name = validation.isValidString(req.body.last_name)
      validation.isValidName(last_name)

      let email = validation.isValidString(req.body.email)
      validation.isValidEmail(email)

      const feedbackObj = {
        firstname: first_name,
        lastname: last_name,
        email: email,
        feedback_comment: feedback
      }

      await eventData.addNonLoggedInUserFeedback(eventId, feedbackObj)

      res.json({success: true})
    }

  }catch(e){
      return res.json({ success: false, error: e });
  }
})

export default router;
