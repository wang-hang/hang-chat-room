// 聊天内容

import * as React from 'react';

import style from '../styles/chat-content.css'

interface Props {
  content: string
}

class Record extends React.PureComponent<Props> {
 public render() {
    return (
      <div className={style.chat_content} >{this.props.content}</div>
    )
  }
}

export default Record