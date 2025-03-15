import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

// define Collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(255).trim().strict(),
  description: Joi.string().required().min(3).max(255).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  columnOrderIds: Joi.array().items(
    Joi.string().pattern( OBJECT_ID_RULE ).message( OBJECT_ID_RULE_MESSAGE )
  ).default([]),
  createdAt: Joi.date().timestamp('javascript').default(() => Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

// Create new board
const createNew = async (data) => {
  try {
    // Validate input data
    const validatedData = await BOARD_COLLECTION_SCHEMA.validateAsync(data)

    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validatedData)
    return createdBoard
  } catch (error) {
    throw new Error(error.message)
  }
}

// Find board by ID
const findOneById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ID format')

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: id })
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
}
