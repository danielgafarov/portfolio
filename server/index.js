require('dotenv').config({ path: ".env.local", override: true })
const express = require("express");
var cors = require("cors");
const app = express();
const repoRoutes = require('./routes/repoRoutes')
const configRoutes = require('./routes/configRoutes')
const executionRoutes = require('./routes/executionRoutes')

const corsOptions = {
  origin: 'https://frfh467udihg.objectstorage.eu-frankfurt-1.oci.customer-oci.com/',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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
