const express = require("express");
const path = require("path");
const connectDB = require("./db");

const app = express();
const PORT = 3000;

// Read JSON data from requests
app.use(express.json());

// Serve HTML
app.use(express.static(path.join(__dirname, "public")));

// Create User
app.post("/users", async (req, res) => {

    try {
        const db = await connectDB();

        const user = {
            name: req.body.name,
            email: req.body.email
        };

        const result = await db.collection("users").insertOne(user);

        res.json({
            message: "User created successfully",
            userId: result.insertedId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error creating user"
        });
    }
});

// Get all users
app.get("/users", async (req, res) => {

    try {
        const db = await connectDB();

        const users = await db
            .collection("users")
            .find()
            .toArray();

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching users"
        });
    }
});



// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
