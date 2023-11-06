import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: {
                version: "1",
                strict: true,
                deprecationErrors: true,
            }
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
}