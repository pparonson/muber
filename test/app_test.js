const assert = require("assert")
const request = require("supertest")

const app = require("../src/app")

describe("Express", () => {
  it("should handle GET request to /api", done => {
    // supertest
    request(app)
      .get("/api")
      .end((err, response) => {
        assert(response.body.greeting === "Hello World!")
        done()
      })
  })
})
