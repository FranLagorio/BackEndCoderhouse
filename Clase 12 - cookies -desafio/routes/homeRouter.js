import { Router } from "express";
const homeRouter = Router();
import { loginController } from "../controller/loginController.js";

homeRouter.use(loginController.auth);

homeRouter.get("/", (req, res, next) => {
  res.render("pages/home", { name: req.session.user });
});

export default homeRouter;
