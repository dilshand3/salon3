import { Router } from "express";
import passport from "passport";
import { signUp } from "../controller/user.controller";

const router = Router();

router.route("/google").get(passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.route("/google/callback").get(passport.authenticate("google", {
    failureRedirect: "/auth/failure",
}),signUp);

router.get("/failure", (req, res) => {
    res.send(" Google Auth failed.");
});

export default router;