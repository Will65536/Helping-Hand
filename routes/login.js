import {Router} from "express";
import {} from "../validation.js";

const router = Router();

router.
route("/").
get((req, res) => {
    res.render('login', {
        title: 'Login'
    })
})

router.
route("/").
post((req, res) => {
    
})

export default router