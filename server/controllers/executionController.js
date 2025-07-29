const { execFile, spawn } = require("node:child_process");
const { readJSON } = require("../utils/readJSON");
const { endianness } = require("node:os");

const getExec = async (req, res) => {
  const entryPoints = readJSON("/static/exec.json")
  
  const values = Array()
  for (const x in req.query.params.values)
    values.push(req.query.params.values[x])
  const id = req.query.params.id
  const python = spawn(entryPoints[id].command, [`./controllers/programs/${id}/${entryPoints[id].file}`,values]);
  let data = "";
  for await (const chunk of python.stdout) {
    data += chunk;
  }
  res.send({ data });
};

module.exports = { getExec };
