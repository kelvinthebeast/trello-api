///
// elliotlee
// Eka5bX5kudQ695wh

// const MONGO_URI = 'mongodb+srv://elliotlee:Eka5bX5kudQ695wh@cluster0.hjmq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// const DATABASE_NAME ='trello-web-api'

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
// khoi tao doi tuog trelloDatabaseInstance la null vi ban dau chua co connect
let trelloDatabaseInstance = null

// khởi tạo mongoClientInstance để connect tới database
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}
)
// connect db
export const CONNECT_DB = async () => {
  // gọi kết nối tới mongoDb atlas với uri đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // kết nối thành công thì  lấy ra db theo tên và gán ngược lại vào  trelloDbInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
// func GET_DB không async này dùng để gọi tới trelloDbInstance sau khi đã connect thành công
// tới MongoDb để chúng ta sử dụng ở nhiều nơi khác nhau trong code

// lưu ý phải đảm bảo chỉ luôn gọi  cái getDb khi đã connect thành công tới MongoDb
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to DB first')
  return trelloDatabaseInstance
}


export const CLOSE_DB = async () => {
  // eslint-disable-next-line no-console
  console.log('5. MongoClient connection closed')
  return await mongoClientInstance.close()
}