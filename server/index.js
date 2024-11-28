const express = require('express')
var cors = require('cors');
const app = express();
const {execFile} = require('node:child_process');
var whitelist = ['http://localhost:5173'];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const port = 3000

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get('/api', (req, res) => {
  const child = execFile("./main.exe",(error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    res.send(stdout);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})