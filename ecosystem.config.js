module.exports = {
  apps: [
    {
      name: "orchestrator",
      script: "cd orchestrator && npm install && nodemon app.js"
    },
    {
      name: "service - safrullauparenta",
      script: "cd safrullauparenta && npm install && nodemon app.js"
    },
  ]
}