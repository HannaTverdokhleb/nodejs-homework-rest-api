const express = require("express");
const path = require("node:path");
const app = express()

const routes = require("./routes/index")

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.use('/api', routes);

app.use('/avatars', express.static(path.join(__dirname, "public", "avatars")))

app.use((req, res, next) => {
    res.status(404).send({ message: "Not Found" })
})

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).send({ message: "internal Server Error" })
})

module.exports = app;