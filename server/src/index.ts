import { app } from "./app";
import { connectDB } from "./db/db";
const port = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(`MongoDB connection failed due to ${error}`)
    });