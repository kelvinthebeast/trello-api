///
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)
    // điều hướng dữ liệu sang tầng service
    const createdBoard = await boardService.createNew(req.body)
    // có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    // console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message })
  }
}
export const boardController = {
  createNew
}
