import { Router } from "express";
import usersData from "../data/users.js";
import eventsData from "../data/events.js";
import * as validation from "../validation.js";

const router = Router();

router.route("/").get(async (req, res) => {
  const id = req.session.user_id;

  const user = await usersData.getUserById(id);

  const events = user.isHost
    ? await eventsData.getAllEventsByHostId(id)
    : await eventsData.getAllEventsByVolunteerId(id);

  return res.render("profile", {
    title: "Profile",
    first_name: user.first_name,
    user: user,
    events: events,
    first_name: req.session.first_name,
    isHost: req.session.isHost,
  });
});

router.route("/").patch(async (req, res) => {
  try {
    const id = req.session.user_id;

    let first_name = validation.isValidString(req.body.first_name);
    validation.isValidName(first_name);
    let last_name = validation.isValidString(req.body.last_name);
    validation.isValidName(last_name);
    let email = validation.isValidString(req.body.email);
    validation.isValidEmail(email);
    let contact = validation.isValidString(req.body.contact);
    let bio = validation.isValidString(req.body.bio);
    let skills = req.body.skills ? req.body.skills : [];
    skills = validation.isValidArray(skills);
    let address = validation.isValidString(req.body.address);

    const userInfo = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      contact: contact,
      bio: bio,
      skills: skills,
      address: address,
    };

    await usersData.updateUserProfile(id, userInfo);

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, error: e });
  }
});

export default router;
