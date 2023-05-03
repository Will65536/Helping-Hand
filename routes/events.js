import { Router } from "express";
import {} from "../validation.js";
import { eventData } from "../data/index.js";

const router = Router();

export function getEventsInRow(events) {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let deadlineDateAndTime;
  let eventRows = [];
  let eventsCol = {};
  let eventsInRow = [];
  for (let i = 0; i < events.length; i++) {
    deadlineDateAndTime = events[i].application_deadline.split(" ");
    events[i].application_deadline =
      longEnUSFormatter
        .format(new Date(events[i].application_deadline))
        .toString() +
      " " +
      deadlineDateAndTime[1] +
      " " +
      deadlineDateAndTime[2];
    if ((i + 1) % 3 === 0) {
      eventsInRow.push(events[i]);
      eventsCol["row"] = eventsInRow;
      eventRows.push(eventsCol);
      eventsCol = {};
      eventsInRow = [];
    } else {
      eventsInRow.push(events[i]);
    }
  }
  if (eventsInRow.length > 0) {
    eventsCol["row"] = eventsInRow;
    eventRows.push(eventsCol);
  }
  return eventRows;
}
router.route("/").get(async (req, res) => {
  let events = await eventData.getAllAppEvents();
  let eventRows = getEventsInRow(events);
  if (req.session && req.session.loggedIn) {
    return res.render("events", {
      title: "Browse Events",
      user: true,
      allEvents: eventRows,
    });
  } else {
    return res.render("events", {
      title: "Browse Events",
      user: false,
      allEvents: eventRows,
    });
  }
});

export default router;
