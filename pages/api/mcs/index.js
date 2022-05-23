import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import Mc from '../../../models/Mc'

dbConnect()

export default async (req, res) => {
  const { method } = req

  // switch the methods
  switch (method) {
    case 'GET': {
      return getMcs(req, res);
    }
    case 'POST': {
      return addMc(req, res);
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getMcs(req, res){
  try {
    const mcs = await Mc.find()
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: mcs,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function addMc(req, res) {
  try {
    const mc = await Mc.create(req.body)
    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: mc,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}