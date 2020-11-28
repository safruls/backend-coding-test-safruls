const express = require('express')
const app = express()
const port = 3001
const routes = require('./routes/index')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)

app.listen(port, () => {
    console.log("Server is running on  http://localhost:" + port )
})