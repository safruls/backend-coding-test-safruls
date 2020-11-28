module.exports = {
  apps: [
    {
      name: "orchestrator",
      script: "cd orchestrator && npm install && nodemon app.js"
    },
    {
      name: "services/safrullauparenta",
      script: "cd services/safrullauparenta && npm install && nodemon app.js"
    },
  ]
}