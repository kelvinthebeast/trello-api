//
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
const Router = express.Router()

// check api v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Board route is working', code: StatusCodes.OK })
})

// nhung api lien quan den board goi la boardRoute
Router.use('/boards', boardRoute)

export const APIs_V1 = Router