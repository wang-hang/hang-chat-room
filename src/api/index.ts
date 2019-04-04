import * as io from "socket.io-client"
import { Msg, ITip, User } from "../interfaces"
import { normalizeParam } from "../utils"
// 触发
// const SEND_MSG = 'SEND_MSG'
const ENTER_ROOM = "ENTER_ROOM"
const EXIT_ROOM = "EXIT_ROOM"
// 监听
// const RECEIVE_TIP = 'RECEIVE_TIP'
const CHAT = "CHAT"
const HOST = "http://localhost:3001"
const SOCKET_URL = `${HOST}/`

const socket = io(SOCKET_URL)

function get(url: string, param: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `${HOST}${url}${normalizeParam(param)}`)

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response))
    }
    xhr.send()
  })
}

export const sendMsg = (msg: string): Promise<any> => {
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

export const enterRoom = (user: User) => {
  return new Promise(resolve => {
    socket.emit(ENTER_ROOM, user)
    resolve()
  })
}

export const receiveTip = (callback: (data: ITip) => void) => {
  socket.on(ENTER_ROOM, (data: any) => {
    callback(data)
  })
  socket.on(EXIT_ROOM, (data: any) => {
    callback(data)
  })
}

export const  login = (userName: string) => {
  return get("/login", { user: userName })
}

export default socket
