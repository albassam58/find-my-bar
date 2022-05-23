const mongoose = require('mongoose')

var Schema = mongoose.Schema;

const BattleHistorySchema = new Schema({
  kaliwa: {
    _mcs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mc',
      }
    ],
    vote: {
      type: Number,
    },
    winner: {
      type: Boolean,
    },
  },
  kanan: {
    _mcs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mc',
      }
    ],
    vote: {
      type: Number,
    },
    winner: {
      type: Boolean,
    },
  },
  _league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
  },
  uploadedOn: Date,
  link: String,
  event: String,
})

module.exports = mongoose.models.BattleHistory || mongoose.model('BattleHistory', BattleHistorySchema)