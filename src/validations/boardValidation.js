import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(30).max(100).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowed to be empty',
      'string.min': 'Title length must be at least 3 characters long',
      'string.max': 'Title length must be less than or equal to 50 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }

    ),
    description: Joi.string().required().min(20).max(500).trim().strict()
  })

  try {
    console.log('req body: ', req.body)
    // set abortEarly: false để trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    res.status(StatusCodes.CREATED).json({ message: 'POST from validation: Board created successfully', code: StatusCodes.CREATED })
    next() // xong xuôi thì cho đi tiếp
  } catch (error) {
    const errorsMessage = new Error(errorsMessage)
    const customMessage = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorsMessage.message)
    next(customMessage)
  }
  // việc validate là BẮT BUỘC Ở PHÍA BACKEND vì đây là điểm cuối để lưu trữ dữ liệu và lưu vào database
}

export const boardValidation = {
  createNew
}