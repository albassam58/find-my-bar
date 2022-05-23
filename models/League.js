const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: [255, 'Name must be 255 characters only'],
  },
  description: String,
  foundedBy: {
    type: String,
    maxlength: [255, 'Name must be 255 characters only'],
  },
  foundedAt: Date,
  socmed: [String],
})

module.exports = mongoose.models.League || mongoose.model('League', LeagueSchema)