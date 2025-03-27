require('dotenv').config({ path: ".env.local", override: true })
const express = require("express");
var cors = require("cors");
const app = express();
var whitelist = ["http://localhost:5173"];
const repoRoutes = require('./routes/repoRoutes')
const configRoutes = require('./routes/configRoutes')
const executionRoutes = require('./routes/executionRoutes')

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
app.use("/api",repoRoutes)
app.use("/api",configRoutes)
app.use("/api",executionRoutes)

const port = 3000;

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
