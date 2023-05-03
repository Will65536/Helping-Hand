import loginRoutes from "./login.js";
import eventsRoutes from "./events.js";
import aboutRoutes from "./about.js";
import signUpRoutes from "./signup.js";
import logoutRoute from "./logout.js";
import { eventData } from "../data/index.js";
import eventRoutes from "./event.js";
const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    return res.redirect("/home");
  });

  app.use("/home", async (req, res) => {
    let events = await eventData.getAllAppEvents();
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    let deadlineDateAndTime;
    events.forEach((eventDetail) => {
      deadlineDateAndTime = eventDetail.application_deadline.split(" ");
      eventDetail.application_deadline =
        longEnUSFormatter
          .format(new Date(eventDetail.application_deadline))
          .toString() +
        " " +
        deadlineDateAndTime[1] +
        " " +
        deadlineDateAndTime[2];
    });

    if (req.session && req.session.loggedIn) {
      return res.render("homepage", {
        title: "Helping Hands",
        user: true,
        allEvents: events,
      });
    } else {
      return res.render("homepage", {
        title: "Helping Hands",
        user: false,
        allEvents: events,
      });
    }
  });
  app.use("/logout", logoutRoute);
  app.use("/login", loginRoutes);
  app.use("/events", eventsRoutes);
  app.use("/event", eventRoutes);
  app.use("/about", aboutRoutes);
  app.use("/signup", signUpRoutes);

  app.use("*", (req, res) => {
    res.send({ Error: "Resource not found" });
  });
};

export default constructorMethod;
