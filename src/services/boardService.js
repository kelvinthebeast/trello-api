import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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
    console.log(createdBoard)
    // return createdBoard

    // lấy bản ghi board sau khi gọi và sử dụng tùy mục đích dự án
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log(getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vv
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...vv

    // Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw new Error(error) }
}

export const boardService = {
  createNew
}