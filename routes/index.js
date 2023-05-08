import loginRoutes from "./login.js";
import eventsRoutes from "./events.js";
import aboutRoutes from "./about.js";
import signUpRoutes from "./signup.js";
import logoutRoute from "./logout.js";
import { eventData } from "../data/index.js";
import eventRoutes from "./event.js";
import searchRoute from "./search.js";
import landingRoute from "./landing.js";
import profileRoute from "./profile.js";
import { changeDateFormat } from "./events.js";
const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    return res.redirect("/home");
  });

  app.use("/home", async (req, res) => {
    let popularEvents = await eventData.getPopularEvents(10); //showing top 10 popular events
    popularEvents = changeDateFormat(popularEvents);

    if (req.session && req.session.loggedIn) {
      return res.render("homepage", {
        title: "Helping Hands",
        user: true,
        isHost: req.session.isHost,
        allEvents: popularEvents,
        first_name: req.session.first_name,
      });
    } else {
      return res.render("homepage", {
        title: "Helping Hands",
        user: false,
        allEvents: popularEvents,
      });
    }
  });
  app.use("/logout", logoutRoute);
  app.use("/login", loginRoutes);
  app.use("/events", eventsRoutes);
  app.use("/event", eventRoutes);
  app.use("/about", aboutRoutes);
  app.use("/signup", signUpRoutes);
  app.use("/search", searchRoute);
  app.use("/landing", landingRoute);
  app.use("/profile", profileRoute);
  app.use("*", (req, res) => {
    res.status(404).render("error", { error: 404 });
  });
};
export default constructorMethod;
