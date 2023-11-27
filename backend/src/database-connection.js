import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URI_DEV, MONGODB_URI_TEST, MONGODB_URI_PROD, NODE_ENV } = process.env;
//const connectString = NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI_DEV;

const connectString = () => {
    if (NODE_ENV === "test") {
        return MONGODB_URI_TEST;
    } else if (NODE_ENV === "production") {
        return MONGODB_URI_PROD;
    } else {
        return MONGODB_URI_DEV;
    }
}

export const connectToMongoDB = () => {
    mongoose.connect(connectString(),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: {
                version: "1",
                strict: true,
                deprecationErrors: true,
            }
        })
        .then(() => console.log(`Connected to MongoDB in ${NODE_ENV} environment`))
        .catch((err) => console.log(err));
}


process.on("uncaughtException", (err) => {
    console.log("Uncaught exception! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
    }
)