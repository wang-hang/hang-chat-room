// 聊天的头像

import * as React from 'react'

import { User } from '../interfaces'
import style from '../styles/chat-avatar.css'
interface Props {
  user: User
}

class ChatAvatar extends React.PureComponent<Props> {
  private format = (name: string):string => {
    return name[0].toLocaleUpperCase()
  }
  public render = () => {
    const { user } = this.props
    return (
      <div className={style.chat_avatar} style={{backgroundColor: user.avatar}} >
        {this.format(user.name)}
      </div>
    )
  }
}

export default ChatAvatar