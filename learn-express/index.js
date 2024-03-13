const express = require("express") // creating a server
    const mongoose = require("mongoose")
    const routes = require("./routes/routes")
    
    mongoose
        .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
        .then(() => {
            console.log("Connected to Mongo DataBase")
            const app = express() // app variable to configure our server 
            app.use(express.json()) // : middleware, it comes before our routes(app.use("/api", routes): because we cant access a link when the content type is not json(), it tells our server to use json, if we forget to do this our server will not work
            app.use("/api", routes)
    
            app.listen(5000, () => {
                console.log("Server has started!")
            })
        }).catch((error) => {
            console.error('DBerror:', error)
          })