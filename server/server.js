const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {serveClient: false})

const PORT = 3001
const ENTER_ROOM = 'ENTER_ROOM'
const EXIT_ROOM = 'EXIT_ROOM'
const CHAT = 'CHAT'
let userStore = {} // 保存在线的user

io.on('connection', function(socket) {
  // 监听断开事件
  socket.on('disconnect', function() {
    if(socket.user) {
      const {user} = socket
      console.log(`${user.name} has disconnected`)
      socket.broadcast.emit(EXIT_ROOM, {
        name: user.name,
        time: new Date(),
        enter: false,
      })
      delete userStore[user.name]
      console.log(`============ ${user.name} exited room ==============`)
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
    io.emit(CHAT, {
      content: msg,
      user:socket.user,
      time: new Date()
    })
  })

})

app.get('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*")
  next()
})

app.get('/login', function(req,res){
  const { user } = req.query
  console.log(`${user} is loging`)
  if(userStore[user]) {
    res.send({hasSameUser: true})
  }else {
    userStore[user] = user
    res.send({hasSameUser: false})
  }
})















http.listen(PORT, function() {
  console.log(`server is serving on *:${PORT}`)
})
