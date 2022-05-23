const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const BarSchema = new Schema({
  _mc: {
    type: Schema.Types.ObjectId,
    ref: 'Mc',
  },
  _battleHistory: {
    type: Schema.Types.ObjectId,
    ref: 'BattleHistory'
  },
  bars: String,
  round: Number,
})

module.exports = mongoose.models.Bar || mongoose.model('Bar', BarSchema)