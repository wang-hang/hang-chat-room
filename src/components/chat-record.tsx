// 聊天记录

import * as React from 'react'

import { Msg } from '../interfaces'
import ChatContent from './chat-content'
import ChatAvatar from './chat-avatar'
import style from '../styles/chat-record.css'
interface Props {
  msg: Msg
  isSelf: boolean
}
class ChatRecord extends React.PureComponent<Props> {
  public render = () => {
    const { msg, isSelf } = this.props
    const reverseStyle:React.CSSProperties = isSelf ? {flexDirection: "row-reverse"} : {}
    return (
      <div className={style.chat_record} style={reverseStyle} >
        <ChatAvatar  user={msg.user} />
        <ChatContent content={msg.content} />
      </div>
    )
  }
}

export default ChatRecord