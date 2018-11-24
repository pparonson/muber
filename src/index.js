const process  = require("process")

const express = require("express")
const helmet = require("helmet")
const redis = require("redis")

const PORT = 8080

const app = express()
const client = redis.createClient({host: "redis-server"})

app.use(helmet())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())

client.set("visits", 0)
// 0: exit process with status "OK"
// process.exit(0)

app.get("/", (req, res, next) => {
  // 0: exit process with status "OK"
  // process.exit(0)
  client.get("visits", (err, visits) => {
    res.send(`<h2>Number of visits: ${visits}`)
    client.set("visits", parseInt(visits) + 1)
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})
