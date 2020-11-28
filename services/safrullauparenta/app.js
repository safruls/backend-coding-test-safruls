const express = require('express')
const app = express()
const port = 3000
const allRoutes = require('./routes/index.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(allRoutes)
app.listen(port, () => {
  console.log("Server is running on port " + port);
})