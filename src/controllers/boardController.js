///
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res) => {
  try {
    // console.log(req.body)
    // điều hướng dữ liệu sang tầng service
    const createdBoard = await boardService.createNew(req.body)
    // có kết quả thì trả về phía client
    // return res.status(StatusCodes.CREATED).json({ message: 'POST from validation: Board created successfully', code: StatusCodes.CREATED })
    res.status(StatusCodes.CREATED).json(createdBoard)
    // throw new ApiError(StatusCodes.BAD_REQUEST, 'This is a custom error message')
  } catch (error) {
    // console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message })
  }
}
export const boardController = {
  createNew
}
