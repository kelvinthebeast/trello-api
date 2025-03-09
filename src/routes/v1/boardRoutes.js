//
import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()


Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Board route is working', code: StatusCodes.OK })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'Board created successfully', code: StatusCodes.CREATED })
  })
export const boardRoutes = Router