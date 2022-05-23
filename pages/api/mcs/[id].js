import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import Mc from '../../../models/Mc'

dbConnect()

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET': {
      return getMc(id, req, res)
    }
    case 'PUT': {
      return updateMc(id, req, res)
    }
    case 'DELETE': {
      return deleteMc(id, req, res)
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getMc(id, req, res) {
  try {
    const mc = await Mc.findById(id)

    if (!mc) {
      return res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Mc does not exist'
      })
    }

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: mc
    })
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function updateMc(id, req, res) {
  try {
    const options = {
      new: true,
      runValidators: true
    }

    const mc = await Mc.findByIdAndUpdate(id, req.body, options)

    if (!mc) {
      return res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Mc does not exist'
      })
    }

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: mc
    })
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function deleteMc(id, req, res) {
  try {
    const options = {
      new: true,
      runValidators: true
    }

    const mc = await Mc.deleteOne({ _id: id })

    if (!mc) {
      return res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Mc does not exist'
      })
    }

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: {}
    })
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}