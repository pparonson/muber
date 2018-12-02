const assert = require("assert")
const request = require("supertest")
const mongoose = require("mongoose")

const app = require("../../src/app")
// Driver represents the entire collection
const Driver = mongoose.model("driver")

describe("Drivers Controller", () => {
  it("should create a new driver with POST req to /api/drivers", done => {
    // get count of drivers collection pre/post request
    Driver.countDocuments()
      .then(preCount => {
        // supertest
        request(app)
          .post("/api/drivers")
          .send({email: "test@test.com"}) // send along this information
          .end((err, response) => {
            Driver.countDocuments()
              .then(postCount => {
                assert((preCount + 1) === postCount)
                done()
              })
          })
      })
  })

  it("should edit a driver with PUT req to /api/drivers/:id", done => {
    // create a driver locally
    const driver = new Driver({email: "test@test.com"})
    driver.save()
      // edit the driver via the express api route
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          // edit the isAvailable prop to true
          .send({isAvailable: true})
          .end((err, response) => {
            // confirm the driver edit
            Driver.findOne({email: "test@test.com"})
              .then(driver => {
                assert(driver.isAvailable === true)
                done()
              })
          })
      })
  })

  it("should remove a driver with DELETE req to /api/drivers/:id", done => {
    // create a driver locally
    const driver = new Driver({email: "test@test.com"})
    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err, response) => {
            // confirm deleted driver record
            Driver.findOne({email: "test@test.com"})
              .then(driver => {
                assert(driver === null)
                done()
              })
          })
      })
  })
})
