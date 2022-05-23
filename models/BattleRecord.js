const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const BattleRecordSchema = new Schema({
  _mc: {
    type: Schema.Types.ObjectId,
    ref: 'Mc',
  },
  _league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
  win: {
    type: Number,
  },
  lose: {
    type: Number,
  },
  draw: {
    type: Number,
  },
  promo: {
    type: Number,
  },
  total: {
    type: Number,
  },
})

module.exports = mongoose.models.BattleRecord || mongoose.model('BattleRecord', BattleRecordSchema)