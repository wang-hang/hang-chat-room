import * as io from 'socket.io-client'
import { Msg } from '../interfaces'

// 触发
// const SEND_MSG = 'SEND_MSG'
const ENTER_ROOM = 'ENTER_ROOM'
// 监听
const RECEIVE_TIP = 'RECEIVE_TIP'
const CHAT = 'CHAT'

const SOCKET_URL = 'localhost:3001/'

const socket = io(SOCKET_URL)

export const sendMsg = (msg: string):Promise<any> => {
  return new Promise((resolve, reject) => {
    socket.emit(CHAT, msg, (data: any) => {
      resolve(data)
    })
  })
}

export const receiveMsg = (callback: (data: Msg) => void) => {
    socket.on(CHAT, (data: any) => {
      callback(data)
    })
}

export const enterRoom = (user: {name: string; avatar: string}) => {
  return new Promise((resolve) => {
    socket.emit(ENTER_ROOM, user)
    resolve()
  })
}

export const receiveTip = () => {
  return new Promise((resolve) => {
    socket.on(RECEIVE_TIP, (data: any) => {
      resolve(data)
    })
  })
}

export default socket