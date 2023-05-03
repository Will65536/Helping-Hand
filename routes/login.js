import { Router } from "express";
import { isValidEmail, isValidString, validatePassword } from "../validation.js";
import usersData from "../data/users.js";

const router = Router();

router.route("/").get((req, res) => {
  res.render("login", {
    title: "Login",
  });
});

router.route("/").post(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try{
    email = isValidString(email);
    email = email.toLowerCase();
    isValidEmail(email);
    password = isValidString(password);
    validatePassword(password);
  }catch(e){
    res.status(400).render('login', {title: 'Login', error: e});
  }

  try{
    // check the credentials against the database
    // if they are valid, redirect to the home page

    const result = await usersData.verifyUser(email, password)
    if(result){
      console.log(email, password);
      req.session.loggedIn = true;
      res.render("homepage",{user:req.session.loggedIn});
    }
  }catch(e){
    res.status(400).render('login', {title: 'Login', error: e});
  }
});

export default router;
