const { execFile, spawn } = require("node:child_process");
const fs = require("fs");
const path = require("path");

const getResult = async (req, res) => {
  const python = spawn("python3", ["./controllers/8queens.py"]);
  let data = "";
  for await (const chunk of python.stdout) {
    data += chunk;
  }
    res.send({data});
};

module.exports = { getResult };
