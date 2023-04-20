import {Router} from "express";
import {} from "../validation.js";

const router = Router();

router.route("/").get((req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

router.route("/").post((req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;

    console.log(username, password)
    res.redirect('/home')
})

export default router