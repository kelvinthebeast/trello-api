/* eslint-disable no-console */

import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
const exitHook = require('async-exit-hook')

const app = express()

const hostname = 'localhost'
const port = 8017
const devName = 'kevinthebeast'
const START_SERVER = () => {

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    // Test Absolute import mapOrder
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${devName}, I am running at ${ hostname }:${ port }`)
  })
  exitHook(() => {
    console.log('4. Disconnecting mongoclient connection....')
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
