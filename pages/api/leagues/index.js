import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import League from '../../../models/League'

dbConnect()

export default async (req, res) => {
  const { method } = req

  // switch the methods
  switch (method) {
    case 'GET': {
      return getLeagues(req, res);
    }
    case 'POST': {
      return addLeague(req, res);
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getLeagues(req, res){
  try {
    const leagues = await League.find()
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: leagues,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function addLeague(req, res) {
  try {
    const league = await League.create(req.body)
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: league,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}