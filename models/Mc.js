const mongoose = require('mongoose')

var Schema = mongoose.Schema

const McSchema = new Schema({
  stageName: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [255, 'Stage name must be 255 characters only'],
  },
  realFirstName: {
    type: String,
    required: false,
    maxlength: [255, 'First name must be 255 characters only'],
  },
  realMiddleName: {
    type: String,
    required: false,
    maxlength: [255, 'Middle name must be 255 characters only'],
  },
  realLastName: {
    type: String,
    required: false,
    maxlength: [255, 'Last name must be 255 characters only'],
  },
  realSuffixName: {
    type: String,
    required: false,
    maxlength: [255, 'Suffix name must be 255 characters only'],
  },
  reppin: [String],
  address: [String],
})

module.exports = mongoose.models.Mc || mongoose.model('Mc', McSchema)