import { Router } from "express";
import passport from "passport";

const router = Router();

router.route("/google").get(passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.route("/google/callback").get(passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
}));

router.get("/success", (req, res) => {
    res.send(" Google Auth successful!");
});

router.get("/failure", (req, res) => {
    res.send(" Google Auth failed.");
});

export default router;