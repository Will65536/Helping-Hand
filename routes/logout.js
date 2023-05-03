import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {

    req.session.destroy()
   return res.render('logout')
});

export default router;
