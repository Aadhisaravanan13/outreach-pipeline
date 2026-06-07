const express = require("express");
const cors = require("cors");

const outreachRoutes = require("./routes/outreachRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/outreach", outreachRoutes);

app.get("/" , (req, res) => {
    res.json({
        success: true,
        message: "Automated Outreach Pipeline Running"
    });
});


module.exports = app;