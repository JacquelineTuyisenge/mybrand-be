// contains our middleware/ server
const express = require("express") // creating a server
const routes = require("./src/routes/routes")

const app = express() // app variable to configure our server 

app.use(express.json()) // : middleware, it comes before our routes(app.use("/api", routes): because we cant access a link when the content type is not json(), it tells our server to use json, if we forget to do this our server will not work

app.use("/api", routes)

app.use("/api", (req, res) => {
    res.status(200).json({message: "welcome to the blogs api"})
})

module.exports = app;