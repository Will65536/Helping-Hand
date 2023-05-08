import { Router } from "express";
import { eventData } from "../data/index.js";
import { changeDateFormat } from "../routes/events.js";
const router = Router();

router.route("/").get(async (req, res) => {
  if (req.session) {
    let id = req.session.user_id;
    if (id) {
      id = id.toString();
      try {
        let allParticipatedEvents = await eventData.getAllEventsByVolunteerId(
          id
        );

        for (let i = 0; i < allParticipatedEvents.length; i++) {
          allParticipatedEvents = changeDateFormat(allParticipatedEvents);
        }
        let expired_participated_events =
          eventData.filterExpiredEventsOrNonExpiredEventsByHostTime(
            allParticipatedEvents,
            true
          );
        let future_participated_events =
          eventData.filterExpiredEventsOrNonExpiredEventsByHostTime(
            allParticipatedEvents,
            false
          );

        let allHostedEvents = await eventData.getAllEventsByHostId(id);
        for (let i = 0; i < allHostedEvents.length; i++) {
          allHostedEvents = changeDateFormat(allHostedEvents);
        }
        let expired_hosted_events =
          eventData.filterExpiredEventsOrNonExpiredEventsByHostTime(
            allHostedEvents,
            true
          );
        let furture_hosted_events =
          eventData.filterExpiredEventsOrNonExpiredEventsByHostTime(
            allHostedEvents,
            false
          );

        return res.render("landing", {
          title: "Your Events",
          user: true,
          first_name: req.session.first_name,
          expiredParticipated: expired_participated_events,
          futureParticipated: future_participated_events,
          expiredHost: expired_hosted_events,
          futureHost: furture_hosted_events,
          isHost: req.session.isHost,
        });
      } catch (e) {
        return res.render("landing", {
          title: "Your Events",
          user: true,
          first_name: req.session.first_name,
          error: e,
        });
      }
    } else return res.redirect("/login");
  } else {
    return res.redirect("/login");
    //return res.render('landing',{title:"History",user:true,first_name:req.session.first_name})
  }
});

export default router;
