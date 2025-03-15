//
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()
import { boardValidation } from '../../validations/boardValidation'
import { boardController } from '~/controllers/boardController'

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Board route is working', code: StatusCodes.OK })
  })
  // chỗ createNew không có () bới vì chúng sẽ gọi hàm qua api chứ không gọi trực tiếp như này
  .post( boardValidation.createNew, boardController.createNew)
  //
export const boardRoute = Router