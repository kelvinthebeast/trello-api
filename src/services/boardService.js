import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
//
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ... reqBody,
      slug: slugify(reqBody.title)
    }
    // Xử lý logic dữ liệu tùy đặc thù dự án

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)
    // return createdBoard

    // lấy bản ghi board sau khi gọi và sử dụng tùy mục đích dự án
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vv
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...vv

    // Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw new Error(error) }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) { throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found') }
    // tạo ra board mới để xử lý không ảnh hướng đến board ban đầu
    const resBoard = cloneDeep(board)
    // đưa card về đúng column

    resBoard.columns.forEach((column) => {
      // method equals() của mongoose so sánh ObjectId với nhau
      column.cards = resBoard.cards.filter((card) => card.columnId.equals(column._id))

      // cach 2 la su dung toString() de so sanh
      // column.cards = resBoard.cards.filter((card) => card.columnId.toString() === column._id.toString())
    })


    // xóa cards vì không cần cards nào song song với columns trong mongoDb
    delete resBoard.cards
    return resBoard
  } catch (error) { throw new Error(error) }
}


export const boardService = {
  createNew,
  getDetails
}