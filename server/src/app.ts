import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "./auth/googleStrategy";
const app = express();

app.use(cors());
app.use(cookieParser());
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
app.use("/auth", googleAuthRoute);

import userRoute from './routes/user.route';
app.use("/api", userRoute);

import salonRoute from './routes/salon.route';
app.use("/api", salonRoute);

import serviceRoute from './routes/service.route';
app.use("/api", serviceRoute);

import workerRoute from './routes/worker.route';
app.use("/api", workerRoute);

import reviewRoute from './routes/review.route';
app.use("/api", reviewRoute);

import bookingRoute from "./routes/booking.route";
app.use("/api", bookingRoute);

export { app }