require("dotenv").config();
const port = process.env.PORT;
const app = require("./app")

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

app.listen(port, async() => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(':::> Connected to MongoDB Database');
    } catch (error) {
        console.log("<::: Fail: Could not connect to database ", error);
    }

    console.log(`:::> Server listening on http://localhost:${port}`)
})