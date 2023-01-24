import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import Mc from '../../../models/Mc'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'POST': {
      return addMc(req, res)
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function addMc(req, res) {
  try {
    // const options = {
    //   new: true,
    //   runValidators: true
    // }

    const body = JSON.parse(req.body)

    const mc = await Mc.create({
      stageName: body.stageName,
      address: [body.address],
      reppin: [body.reppin]
    })

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      message: "MC has been successfully added.",
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