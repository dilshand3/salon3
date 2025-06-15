import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});
import express, { Request, Response } from 'express';
const app = express();

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
   res.send("Salon3 server is working")
})

export { app }