const app = require('./app')
const {mongoConnect} = require('./src/services/mongo')

const startServer = async() => {

    await mongoConnect();

    app.listen(5000, () => {
        console.log("Server has started on port 5000 !")
    })
}
startServer();

// intrance of our application, 