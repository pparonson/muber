const assert = require("assert")
const request = require("supertest")
const mongoose = require("mongoose")

const app = require("../../src/app")
// Driver represents the entire collection
const Driver = mongoose.model("driver")

describe("Drivers Controller", () => {
  it("should create a new driver with POST to /api/drivers", done => {
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
})
