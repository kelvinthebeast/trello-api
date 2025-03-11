///
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: Board created successfully', code: StatusCodes.CREATED })
  } catch (error) {
    // console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message })
  }
}
export const boardController = {
  createNew
}
