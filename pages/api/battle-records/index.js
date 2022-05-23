import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import BattleRecord from '../../../models/BattleRecord'

dbConnect()

export default async (req, res) => {
  const { method } = req

  // switch the methods
  switch (method) {
    case 'GET': {
      return getBattleRecords(req, res);
    }
    case 'POST': {
      return addBattleRecord(req, res);
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getBattleRecords(req, res){
  try {
    const battleRecords = await BattleRecord.find().populate(['_mc', '_league'])
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: battleRecords,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function addBattleRecord(req, res) {
  try {
    const battleRecord = await BattleRecord.create(req.body)
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: battleRecord,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}