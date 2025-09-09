const { Octokit } = require("octokit");
const { readJSON } = require("../utils/readJSON");

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const getRepos = async (req, res) => {
  try {
    const {data: repos} = await octokit.request("GET /users/{username}/repos", {
      username: "danielgafarov",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    const whitelistedProjects = readJSON("/static/whitelistedProjects.json");
    whitelistedProjects.forEach(project => {
      project["description"] = repos.filter( (repo) => repo.name === project.name)[0].description
    });
    res.send(whitelistedProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRepo = async (req, res) => {
  const whitelistedProjects = readJSON("/static/whitelistedProjects.json");
  const id = req.params.id;
  const filteredProject = whitelistedProjects.filter(
    (projectFilter) => projectFilter.name === id
  )[0];
  if (!filteredProject) {
    res.status(403).json({ error: "This project is not whitelisted." });
    return;
  }
  try {
    const { data: code } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "danielgafarov",
        repo: id,
        path: filteredProject.code,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const { data: readme } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "danielgafarov",
        repo: id,
        path: "README-de.md",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    res.send({
      name: id,
      code: code.content,
      readme: readme.content,
      lang: filteredProject.lang,
      params: filteredProject.params,
    });
  } catch (error) {
    console.log(error);
    switch (error.status) {
      case 404:
        res.status(404).json({ error: error.message });
        break;
      default:
        res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { getRepos, getRepo };
