const { execFile, spawn } = require("node:child_process");
const { readJSON } = require("../utils/readJSON");

const getExec = async (req, res) => {
  const entryPoints = readJSON("/static/exec.json")
  const id = req.params.id
  const python = spawn("python3", [`./controllers/programs/${entryPoints[id]}`]);
  let data = "";
  for await (const chunk of python.stdout) {
    data += chunk;
  }
  res.send({ data });
};

module.exports = { getExec };
