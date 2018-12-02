const Driver = require("../models/driver")

module.exports = {
  // es6 method def syntax
  greeting(req, res) {
    res.send({greeting: "Hello World!"}) // send res back to req server
  }
  , create(req, res, next) {
    // console.log(req.body)
    const driverProps = req.body
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      // send to error handling middleware
      .catch(next)
  }
  , edit(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body
    Driver.findByIdAndUpdate({_id: driverId}, driverProps)
      // then return updated driver to the request
      .then(() => Driver.findById({_id: driverId}))
      .then(driver => res.send(driver))
      .catch(next)
  }

  , delete(req, res, next) {
    const driverId = req.params.id
    Driver.findOneAndDelete({_id: driverId})
      .then(driver => res.send(driver))
      .catch(next)
  }
}
