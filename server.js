const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST } = process.env;

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => console.log(err.message));
