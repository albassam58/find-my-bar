import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import BattleHistory from '../../../models/BattleHistory'

dbConnect()

export default async (req, res) => {
  const { method } = req

  // switch the methods
  switch (method) {
    case 'GET': {
      return getBattleHistories(req, res);
    }
    case 'POST': {
      return addBattleHistory(req, res);
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getBattleHistories(req, res){
  try {
    const battleHistories = await BattleHistory.find()
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: battleHistories,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function addBattleHistory(req, res) {
  try {
    const battleHistory = await BattleHistory.create(req.body)
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: battleHistory,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}