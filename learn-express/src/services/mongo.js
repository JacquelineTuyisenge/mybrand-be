// our database
const mongoose = require("mongoose")

mongoose.connection.on("open", () => {
    console.info("Database Connected")
}) // these are events: event wil happen when connection is there

mongoose.connection.on("close", () => {
    console.info("Something went wrong") // when connection is not there
}) 

const mongoConnect = async () => { // async : if js has to wait for an operation to complete, it will execute the rest of the code while waiting
    await mongoose
    .connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
}
const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

module.exports = {mongoConnect,mongoDisconnect} // exporting