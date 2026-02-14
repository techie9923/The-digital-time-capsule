const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

/* API 1: Save message and date */
app.post("/save", (req, res) => {

    const { message, openTime } = req.body;

    const data = {
        message: message,
        openTime: openTime
    };

    fs.writeFileSync("capsule.json", JSON.stringify(data));

    res.json({
        msg: "Capsule saved successfully"
    });
});

/* API 2: Open capsule */
app.get("/open", (req, res) => {

    if (!fs.existsSync("capsule.json")) {
        return res.json({ error: "No message found" });
    }

    const data = JSON.parse(fs.readFileSync("capsule.json"));

    const currentTime = new Date();
    const savedTime = new Date(data.openTime);

    // checking date
    if (currentTime >= savedTime) {
        res.json({
            message: data.message
        });
    } else {
        res.json({
            error: "Date not matched yet"
        });
    }
});

/* server */
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
