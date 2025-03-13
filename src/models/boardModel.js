//
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
// define Collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(255).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  slug: Joi.string().required().min(3).strim().strict(),
  columnOrderIds: Joi.array().items(Joi.string()).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false)
}) // soft delete
const createNew = async (data) => {
  try {
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew
}
