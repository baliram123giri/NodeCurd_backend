const express = require("express");
const app = express();
require("dotenv").config();
require("./db/db");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;
//create endpoints

app.use("/api", require("./Router/user"));

app.use("", async (req, res) => {
  try {
    res.status(200).json({
      msg: "Url not found!",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
app.listen(port, () => {
  console.log(`this server is running successfully at ${port}`);
});
