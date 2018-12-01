const express = require("express")
const helmet = require("helmet")
const redis = require("redis")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const routes = require("../routes/routes")

const app = express()
// const client = redis.createClient({host: "redis-server"})
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/muber", { useNewUrlParser: true })
}


// middleware
app.use(helmet())
app.use(express.static("public"))
// app.use(bodyParser.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// client.set("visits", 0)

routes(app)

// error handler: err receives prev middleware err
// next: passes to next middleware in chain
app.use((err, req, res, next) => {
  res.send({error: err.message})
})

module.exports = app
