interface Msg {
  content: string
  time: string
  user: User
}

interface User {
  name: string
  avatar: string
}

interface ITip {
  name: string
  time: string
  enter: boolean
}

interface Complex { // 消息或者提示
  type: 'tip' | 'msg';
  data: ITip | Msg;
  isSelf?: boolean
}

export {
  Msg,
  User,
  ITip,
  Complex,
}