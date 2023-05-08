import { events } from "../config/mongoCollections.js";
import userInfo from "./users.js";
import { ObjectId } from "mongodb";
import * as validation from "../validation.js";
import e from "express";

const exportedMethods = {
  async addEvent(
    event_name,
    description,
    application_deadline,
    host_time,
    location,
    host_info,
    image_urls,
  ) {
    let tempEvent = validation.checkEventsInputs(
      event_name,
      description,
      application_deadline,
      host_time,
      location,
      host_info,
      image_urls,
    );

    const release_time = new Date().getTime();
    const newEvent = {
      event_name: tempEvent.event_name,
      description: tempEvent.description,
      release_time: release_time,
      application_deadline: tempEvent.application_deadline,
      host_time: tempEvent.host_time,
      location: tempEvent.location,
      volunteers: tempEvent.volunteers,
      host_info: tempEvent.host_info,
      stories: tempEvent.stories,
      feedbacks: tempEvent.feedbacks,
      likes: tempEvent.likes,
      image_urls: tempEvent.image_urls,
    };

    const eventsCollection = await events();
    const insertEvent = await eventsCollection.insertOne(newEvent);
    if (!insertEvent.insertedId) throw "Failed Inserting a event";
    let newId = insertEvent.insertedId.toString();
    const InsertedEvent = await this.getEventByEventId(newId);
    InsertedEvent._id = InsertedEvent._id.toString();
    return InsertedEvent;
  },

  async removeEventById(_id) {
    _id = validation.isValidId(_id);
    _id = _id.trim();

    const eventsCollection = await events();
    const deletionInfo = await eventsCollection.findOneAndDelete({
      _id: new ObjectId(_id),
    });
    if (deletionInfo.lastErrorObject.n === 0) {
      throw [404, `Error: Could not delete event with id of ${_id}`];
    }

    return { removeId: _id, isRemoved: true };
  },

  async updateEventPatch(_id, eventInfo) {
    validation.isValidId(_id);
    _id = _id.trim();

    const updatedEventData = {};
    if (eventInfo.event_name) {
      updatedEventData.event_name = validation.isValidString(
        eventInfo.event_name
      );
    }

    if (eventInfo.description) {
      updatedEventData.description = validation.isValidString(
        eventInfo.description
      );
    }

    if (eventInfo.application_deadline) {
      updatedEventData.application_deadline = validation.isValidEventTime(
        eventInfo.application_deadline,
        eventInfo.release_time
      );
    }

    if (eventInfo.host_time) {
      updatedEventData.host_time = validation.isValidEventTime(
        eventInfo.host_time
      );
    }

    if (eventInfo.location) {
      updatedEventData.location = validation.isValidLocation(
        eventInfo.location
      );
    }

    if (eventInfo.host_info) {
      updatedEventData.host_info = validation.isValidHostInfo(
        eventInfo.host_info
      );
    }

    if (eventInfo.image_urls) {
      image_urls = validation.isValidImageUrls(image_urls);
      updatedEventData.image_urls = eventInfo.image_urls;
    }

    const eventCollection = await events();
    let newEvent = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: updatedEventData },
      { returnDocument: "after" }
    );
    if (newEvent.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${_id}`];

    return newEvent.value;
  },

  async checkIfHost(event_id, host_id) {
    event_id = event_id.trim();
    validation.isValidId(event_id);

    host_id = host_id.trim();
    validation.isValidId(host_id);

    const eventCollection = await events();
    const event = await eventCollection.findOne({
      _id: new ObjectId(event_id),
    });
    if (!event) throw `Error: event with id ${event_id} not found`;

    if (event.host_info.host_id !== host_id) {
      throw `Error: host with ${host_id} id is not the host of the event`;
    }

    return true;
  },

  async getPopularEvents(limit, skip) {
    const eventCollection = await events();

    if (!limit) limit = 0;
    if (!skip) skip = 0;
    let popularEvents = await eventCollection
      .aggregate([
        { $match: { application_deadline: { $gte: new Date().getTime() } } },

        {
          $project: {
            event_name: 1,
            description: 1,
            release_time: 1,
            application_deadline: 1,
            host_time: 1,
            location: 1,
            image_url: 1,
            volunteers: 1,
            host_info: 1,
            stories: 1,
            feedbacks: 1,
            likes: 1,
            likeCount: { $size: { $ifNull: ["$likes", []] } },
          },
        },
        {
          $sort: { likeCount: -1 },
        },
      ])
      .skip(skip)
      .limit(limit)
      .toArray();

    return popularEvents;
  },

  // will return all app's events
  async getAllAppEvents(limit, skip) {
    const eventCollection = await events();

    if (limit) {
      if (!skip) skip = 0;
      let all = await eventCollection
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();
      all = all.map((element) => {
        element._id = element._id.toString();
        return element;
      });
      return all;
    } else {
      let all = await eventCollection.find({}).toArray();
      all = all.map((element) => {
        element._id = element._id.toString();
        return element;
      });
      return all;
    }
  },

  async getEventsCount() {
    const eventCollection = await events();
    return eventCollection.count();
  },

  async getEventByEventId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();
    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: new ObjectId(_id) });

    if (!event) throw `Error: event with id ${_id} not found`;

    return event;
  },

  async getAllEventsByHostId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();

    const eventsArray = await eventCollection
      .find({ "host_info.host_id": _id })
      .toArray();

    return eventsArray;
  },

  async getAllEventsByVolunteerId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();

    const eventsArray = await eventCollection
      .find({ volunteers: { $in: [_id] } })
      .toArray();

    return eventsArray;
  },

  filterExpiredEventsOrNonExpiredEventsByApplicationDeadline(
    events,
    needExpired
  ) {
    let todaysDate = new Date();
    if (needExpired) {
      return events.filter(
        (event) => new Date(event.application_deadline) < todaysDate
      );
    } else {
      return events.filter(
        (event) => new Date(event.application_deadline) >= todaysDate
      );
    }
  },

  filterExpiredEventsOrNonExpiredEventsByHostTime(events, needExpired) {
    let todaysDate = new Date();
    if (needExpired) {
      return events.filter((event) => new Date(event.host_time) < todaysDate);
    } else {
      return events.filter((event) => new Date(event.host_time) >= todaysDate);
    }
  },

  sortByHostTime(events, needNearestToFurthest) {
    if (needNearestToFurthest) {
      events.sort((a, b) => new Date(b.host_time) - new Date(a.host_time));
      return events;
    } else {
      events.sort((a, b) => new Date(a.host_time) - new Date(b.host_time));
      return events;
    }
  },

  sortByReleaseTime(events, needNearestToFurthest) {
    if (needNearestToFurthest) {
      events.sort(
        (a, b) => new Date(b.release_time) - new Date(a.release_time)
      );
      return events;
    } else {
      events.sort(
        (a, b) => new Date(a.release_time) - new Date(b.release_time)
      );
      return events;
    }
  },

  sortByLikes(events, needPopularToNonPopular) {
    if (needPopularToNonPopular) {
      events.sort((a, b) => b.likes.length - a.likes.length);
      return events;
    } else {
      events.sort((a, b) => a.likes.length - b.likes.length);
      return events;
    }
  },

  async getAllFeedbacksByEventId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();
    const event = eventCollection.findOne({ _id: new ObjectId(_id) });
    if (!event) {
      throw `Error: event with ${_id} not found`;
    }

    return event.feedbacks;
  },

  async getFeedbackByFeedbackId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();
    const event = eventCollection.findOne({
      "feedbacks._id": new ObjectId(_id),
    });
    if (!event) {
      throw `Error: feedback with ${_id} not found`;
    }

    for (let feedback of event.feedbacks) {
      if (feedback._id.toString() === _id) {
        feedback._id = feedback._id.toString();
        return feedback;
      }
    }
  },

  async getAllStoriesByEventId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();
    const event = await eventCollection.findOne({ _id: new ObjectId(_id) });
    if (!event) {
      throw `Error: event with ${_id} not found`;
    }

    return event.stories;
  },

  async getAllStoriesByVolunteerId(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();
    const events = eventCollection
      .find({ "stories.volunteer_id": _id })
      .toArray();
    if (!events) {
      throw `Error: volunteer with ${_id} has no story`;
    }

    const stories = [];
    for (let event of events) {
      for (let story of event.stories) {
        if (story.volunteer_id === _id) {
          story._id = story._id.toString();
          stories.push(story);
        }
      }
    }

    return stories;
  },

  async removeStory(_id) {
    validation.isValidId(_id);
    _id = _id.trim();

    const eventCollection = await events();
    const event = eventCollection.findOne({ "stories._id": new Object(_id) });
    if (!event) {
      throw `Error: story with ${_id} not found`;
    }

    event.stories.filter((story) => story._id.toString() === _id);

    const unpdateInfo = eventCollection.findOneAndUpdate(
      { _id: event._id },
      { $set: { stories: event.stories } },
      { returnDocument: "after" }
    );

    if (unpdateInfo.lastErrorObject.n === 0)
      throw [404, `Could not remove the story with id ${_id}`];

    return unpdateInfo.value;
  },

  async addVolunteers(event_id, volunteer_id) {
    validation.isValidId(event_id);
    event_id = event_id.trim(event_id);
    validation.isValidId(volunteer_id);
    volunteer_id = volunteer_id.trim();

    const eventCollection = await events();

    const event = await eventCollection.findOne({
      _id: new ObjectId(event_id),
    });
    if (!event) throw `Error: event with id ${event_id} not found`;

    if (event.volunteers.includes(volunteer_id)) {
      throw `Error: volunteer with ${volunteer_id} id is already in event.volunteers array`;
    }

    event.volunteers.push(volunteer_id);
    let updateInfo = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(event_id) },
      { $set: { volunteers: event.volunteers } },
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${_id}`];

    return updateInfo.value;
  },

  async removeVolunteerToEvent(event_id, volunteer_id) {
    validation.isValidId(event_id);
    event_id = event_id.trim(event_id);
    validation.isValidId(volunteer_id);
    volunteer_id = volunteer_id.trim();

    const eventCollection = await events();

    const event = await eventCollection.findOne({
      _id: new ObjectId(event_id),
    });
    if (!event) throw `Error: event with id ${event_id} not found`;

    if (event.volunteers.includes(volunteer_id)) {
      event.volunteers.splice(event.volunteers.indexOf(volunteer_id), 1);
    }

    //console.log(event.volunteers);

    let updateInfo = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(event_id) },
      { $set: { volunteers: event.volunteers } },
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${_id}`];

    return updateInfo.value;
  },

  async addAndRemoveLikes(event_id, volunteer_id) {
    validation.isValidId(event_id);
    event_id = event_id.trim(event_id);
    validation.isValidId(volunteer_id);
    volunteer_id = volunteer_id.trim();

    const eventCollection = await events();

    const event = await eventCollection.findOne({
      _id: new ObjectId(event_id),
    });
    if (!event) throw `Error: event with id ${event_id} not found`;

    if (event.likes.includes(volunteer_id)) {
      // throw `Error: volunteer with ${volunteer_id} id is already in event.likes array`;
      const index = event.likes.indexOf(volunteer_id);
      if (index > -1) {
        event.likes.splice(index, 1);
      }
    } else {
      event.likes.push(volunteer_id);
    }

    let updateInfo = await eventCollection.findOneAndUpdate(
      { _id: new ObjectId(event_id) },
      { $set: { likes: event.likes } },
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Could not update the event with id ${_id}`];

    return event.likes.length;
  },

  async upsertLoggedInUserFeedback(eventId, userId, feedback_comment) {
    eventId = eventId.toString().trim();
    validation.isValidId(eventId);

    userId = userId.toString().trim();
    validation.isValidId(userId);

    feedback_comment = validation.isValidString(feedback_comment);
    validation.isValidFeedbackString(feedback_comment);
    
    const eventsCollection = await events();

    let updateInfo = await eventsCollection.updateOne(
      {
        _id: new ObjectId(eventId),
        "feedbacks.volunteer_id": userId,
      },
      { $set: { "feedbacks.$.feedback_comment": feedback_comment } }
    );

    if(updateInfo.modifiedCount === 0){
      let userData = await userInfo.getUserById(userId);

      let newFeedback = {
        _id: new ObjectId(),
        volunteer_id: userId,
        email: userData.email,
        firstname: userData.first_name,
        lastname: userData.last_name,
        feedback_comment: feedback_comment,
      };

      let insertFeedback = await eventsCollection.findOneAndUpdate(
        { _id: new ObjectId(eventId) },
        { $push: { feedbacks: newFeedback } }
      );

      if (insertFeedback.lastErrorObject.n === 0) {
        throw "Error: could not update feedback";
      }
    }

    return { updatedFeedback: true };
  },

  async addNonLoggedInUserFeedback(eventId, feedbackObj) {
    eventId = eventId.toString().trim();
    validation.isValidId(eventId);

    feedbackObj.firstname = validation.isValidString(feedbackObj.firstname)
    validation.isValidName(feedbackObj.firstname)

    feedbackObj.lastname = validation.isValidString(feedbackObj.lastname)
    validation.isValidName(feedbackObj.lastname)

    feedbackObj.email = validation.isValidString(feedbackObj.email)
    validation.isValidEmail(feedbackObj.email)

    feedbackObj.feedback_comment = validation.isValidString(feedbackObj.feedback_comment)
    validation.isValidFeedbackString(feedbackObj.feedback_comment)

    const eventsCollection = await events();

    let feedbackSearch = await eventsCollection.findOne({
      _id: new ObjectId(eventId),
      "feedbacks.email": feedbackObj.email
    })

    if(feedbackSearch) throw `Feedback already submitted with email ${feedbackObj.email} !`

    let newFeedback = {
      _id: new ObjectId(),
      volunteer_id: "",
      email: feedbackObj.email,
      firstname: feedbackObj.firstname,
      lastname: feedbackObj.lastname,
      feedback_comment: feedbackObj.feedback_comment,
    };

    let insertFeedback = await eventsCollection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $push: { feedbacks: newFeedback } }
    );

    if (insertFeedback.lastErrorObject.n === 0) {
      throw "Error: could not update feedback";
    }

    return { updatedFeedback: true };
  },

  async upsertStory(eventId, userId, story) {
    eventId = eventId.toString().trim();
    validation.isValidId(eventId);
    userId = userId.toString().trim();
    validation.isValidId(userId);
    story = validation.isValidString(story);
    validation.isValidStoryString(story);

    const eventsCollection = await events();

      let updateInfo = await eventsCollection.updateOne(
        { 
          _id: new ObjectId(eventId),
          'stories.volunteer_id': userId
        },
        { $set: { 'stories.$.story_comment': story } }
      );
      if (updateInfo.modifiedCount === 0) {
        let userData = await userInfo.getUserById(userId);
  
        let newStory = {
          _id: new ObjectId(),
          volunteer_id: userId,
          volunteer_fname: userData.first_name,
          volunteer_lname: userData.last_name,
          story_comment: story,
        };
  
        let insertInfo = await eventsCollection.findOneAndUpdate({
          _id: new ObjectId(eventId)
        },
        { $push: { stories: newStory }})

        if (insertInfo.lastErrorObject.n === 0) {
          throw "Error: could not insert story";
        }
      }

    return { updatedStory: true };
  },

  async getEventByKeyword(keyword) {
    const regex = new RegExp(keyword, "i");
    keyword = keyword.trim();
    let array = await this.getAllAppEvents();
    const filteredArray = array.filter((obj) => {
      return validation.searchObject(obj, regex);
    });
    //console.log(filteredArray);
    return filteredArray;
  },
};

export default exportedMethods;
