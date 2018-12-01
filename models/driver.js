const mongoose = require("mongoose")

const Schema = mongoose.Schema

// create schema
const DriverSchema = new Schema({
  email: {
    type: String
    , required: true
  }
  , isAvailable: {
    type: Boolean
    , default: false
  }
  //, location: String
})

// Driver represents the entire collection
const Driver = mongoose.model("driver", DriverSchema)

module.exports = Driver
