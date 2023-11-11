import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI_DEV, MONGODB_URI_TEST, NODE_ENV } = process.env;
const connectString = NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI_DEV;

export const connectToMongoDB = () => {
    mongoose.connect(connectString,
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