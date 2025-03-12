import { slugify } from '~/utils/formatters'


//
const createNew = async (reqBody) => {
  const newBoard = {
    ... reqBody,
    slug: slugify(reqBody.title)
  }

  return newBoard
  // Xử lý logic dữ liệu tùy đặc thù dự án

  // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
  // ...

  // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vv
  // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...vv

// Trả kết quả về, trong Service luôn phải có return
}
export const boardService = {
  createNew
}