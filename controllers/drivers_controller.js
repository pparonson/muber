const Driver = require("../models/driver")

module.exports = {
  greeting(req, res) {
    res.send({greeting: "Hello World!"}) // send res back to req server
  }
  , create(req, res, next) {
    // console.log(req.body)
    const driverProps = req.body
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  }
}
