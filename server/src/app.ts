import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import "./auth/googleStrategy";
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Salon3 server is working")
});

import googleAuthRoute from "./auth/oAuth.route";
app.use("/auth",googleAuthRoute);

export { app }