import { Router } from "express";
import {} from "../validation.js";
import { eventData } from "../data/index.js";

const router = Router();

router.route("/:id").get(async (req, res) => {
  let eventDetail = await eventData.getEventByEventId(req.params.id);
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let eventDateAndTime = eventDetail.host_time.split(" ");
  let deadlineDateAndTime = eventDetail.application_deadline.split(" ");

  eventDetail["etime"] = longEnUSFormatter.format(
    new Date(eventDetail.host_time)
  );
  eventDetail.host_time =
    eventDetail.etime + " " + eventDateAndTime[1] + " " + eventDateAndTime[2];

  eventDetail.application_deadline =
    longEnUSFormatter
      .format(new Date(eventDetail.application_deadline))
      .toString() +
    " " +
    deadlineDateAndTime[1] +
    " " +
    deadlineDateAndTime[2];

  res.render("event", {
    title: "Event Details",
    event: eventDetail,
  });
});

export default router;
