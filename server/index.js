require('dotenv').config({ path: ".env.local", override: true })
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const https = require("https");
const repoRoutes = require('./routes/repoRoutes')
const configRoutes = require('./routes/configRoutes')
const executionRoutes = require('./routes/executionRoutes')

const corsOptions = {
  origin: ['https://gafarov.de',/\.gafarov\.de$/],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use("/api",repoRoutes)
app.use("/api",configRoutes)
app.use("/api",executionRoutes)

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`);
});

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/gafarov.de/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/gafarov.de/fullchain.pem")
    },
    app
  )
  .listen(8443)