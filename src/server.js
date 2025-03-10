/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
const exitHook = require('async-exit-hook')
import { env } from '~/config/environment'
const app = express()
import { APIs_V1 } from '~/routes/v1'
const START_SERVER = () => {
  // enable json parsing
  app.use(express.json())
  // enable url encoded parsing
  app.use('/v1', APIs_V1)

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    // Test Absolute import mapOrder
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }`)
  })
  exitHook(() => {
    console.log('4. Disconnecting mongoClient connection....')
    CLOSE_DB()
  })

}

(async () => {
  try {
    console.log('1. Connecting to MongoDb CLoud Atlas')
    await CONNECT_DB()
    console.log('2. Successfully connected to MongoDb Cloud Atlas')
    START_SERVER()
  } catch (error) {
    console.log(`Error connecting to mongodb cloud: ${error}`)
    process.exit(0)
  }
})()
// khi kết nối tới database thành công thì mới chạy START_SERVER backend lên
// CONNECT_DB()
//   .then(() => console.log('connected to mongodb cloud atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.log(`Error connecting to mongodb cloud: ${error}`)
//     process.exit(0)
//   })
