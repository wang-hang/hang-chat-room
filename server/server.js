const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {serveClient: false})

const PORT = 3001
const ENTER_ROOM = 'ENTER_ROOM'
const EXIT_ROOM = 'EXIT_ROOM'
const SEND_MSG_TO_CLIENT = 'SEND_MSG_TO_CLIENT'
const RECEIVE_MSG_FROM_CLIENT = 'RECEIVE_MSG_FROM_CLIENT'
const CHAT = 'CHAT'

io.on('connection', function(socket) {
  console.log('an user connected')

  // 监听断开事件
  socket.on('disconnect', function() {
    if(socket.user) {
      console.log(`${socket.user.name} has disconnected`)
      socket.broadcast.emit(EXIT_ROOM, {
        name: socket.user.name,
        time: new Date(),
        enter: false,
      })
      console.log(`============ ${socket.user.name} exited room ==============`)
    }else {
      console.log(`an user has disconnected`)
    }
  })

  // 监听enterroom 事件
  socket.on(ENTER_ROOM, function(user) {
    socket.user = user
    socket.broadcast.emit(ENTER_ROOM, {
      name: socket.user.name,
      time: new Date(),
      enter: true,
    })
    console.log(`============ ${user.name} entered room ==============`)
  })

  // 监听客户端的发送消息事件
  socket.on(CHAT, function(msg) {
    console.log(socket.user)
    // console.log(`${socket.user.name} say:  ${msg}`)
    io.emit(CHAT, {
      content: msg,
      user:socket.user,
      time: new Date()
    })
  })


})















http.listen(PORT, function() {
  console.log(`server is serving on *:${PORT}`)
})
