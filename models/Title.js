const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const TitleSchema = new Schema({
  _mc: {
    type: Schema.Types.ObjectId,
    ref: 'Mc',
  },
  _battleHistory: {
    type: Schema.Types.ObjectId,
    ref: 'BattleHistory'
  },
  title: String,
})

module.exports = mongoose.models.Title || mongoose.model('Title', TitleSchema)