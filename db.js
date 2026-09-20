const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL || "mongodb://localhost:27017";

const client = new MongoClient(url);

async function connectDB() {
    try {
        await client.connect();

        console.log("MongoDB Connected!");

        return client.db("mydatabase");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

module.exports = connectDB;
