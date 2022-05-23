import dbConnect from '../../../utils/dbConnect'
import httpStatus from '../../../constants/httpStatus'
import Bar from '../../../models/Bar'

dbConnect()

export default async (req, res) => {
  const { method } = req

  // switch the methods
  switch (method) {
    case 'GET': {
      return getBars(req, res);
    }
    case 'POST': {
      return addBar(req, res);
    }
    default:
      res.status(httpStatus.ERROR).json({
        success: false,
        message: 'Invalid method',
      })
  }
}

async function getBars(req, res){
  try {
    const { search } = req.query

    let bars
    if (search) {
      const searchOption = {
        $text: {
          $search: `/^${search}$/i`,
        },
      }
      const scoreOption = {
        score: {
          $meta: "textScore",
        },
      }
      const sortOption = {
        score: {
          $meta: "textScore",
        },
      }
      bars = await Bar.find(searchOption, scoreOption).sort(sortOption)
    } else {
      bars = await Bar.find()
    }

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: bars,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}

async function addBar(req, res) {
  try {
    const bar = await Bar.create(req.body)

    return res.status(httpStatus.SUCCESS).json({
      success: true,
      data: bar,
    });
  } catch (error) {
    return res.status(httpStatus.ERROR).json({
      success: false,
      message: new Error(error).message,
    });
  }
}