import { Router } from "express";
import {
  isValidTimeStamp,
  isUserAdult,
  isValidEmail,
  isValidName,
  isValidString,
  validatePassword,
} from "../validation.js";
import usersData from "../data/users.js";

const router = Router();

router.route("/").get((req, res) => {
  return res.render("signup", {
    title: "Sign Up",
  });
});

router.route("/").post(async (req, res) => {
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let birth_date = Date.parse(req.body.birth_date);
  let email = req.body.email;
  let password = req.body.password;
  let repeatPassword = req.body.repeat_password;
  let role = req.body.role;

  try {
    firstName = isValidString(firstName);
    isValidName(firstName);

    lastName = isValidString(lastName);
    isValidName(lastName);

    if(!isValidTimeStamp(birth_date)) {
      throw " Invalid birth_date timeStamp"
    }
    isUserAdult(birth_date);

    email = isValidString(email);
    email = email.toLowerCase();
    isValidEmail(email);

    password = isValidString(password);
    validatePassword(password);

    repeatPassword = isValidString(repeatPassword);
    if (repeatPassword !== password) throw "Passwords do not match";

    role = isValidString(role);
    if (role !== "host" && role !== "volunteer") throw "Invalid role";
  } catch (e) {
    return res.status(400).render("signup", { title: "Sign Up", error: e });
  }

  try {
    // add the user to the database
    const isHost = role === "host" ? true : false;
    const result = await usersData.addUser(
      firstName,
      lastName,
      birth_date,
      email,
      password,
      isHost
    );
    if (result) {
      res.redirect("/login");
    } else {
      return res
        .status(500)
        .render("signup", { title: "Sign Up", error: "Internal Server Error" });
    }
  } catch (e) {
    return res.status(400).render("signup", { title: "Sign Up", error: e });
  }
});

export default router;
