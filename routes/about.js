import { Router } from "express";
import {} from "../validation.js";

const router = Router();

router.route("/").get((req, res) => {
  if(req.session &&req.session.loggedIn)
  {
    return res.render('about',{title:"About us",user:true})
    
  }
  else
  {
  return  res.render('about',{title:"About us",user:false})
  }
});

export default router;
