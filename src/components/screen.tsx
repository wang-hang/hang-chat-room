import * as React from 'react'

import style from '../styles/screen.css'
import { Msg, ITip } from '../interfaces'
import ChatRecord from './chat-record'
import Tip from './tip'

interface Props {
  complex: Array<{
      type: 'tip' | 'msg';
      data: ITip | Msg;
      isSelf: boolean
  }> // 聊天消息和提示的混合数组
}

class Screen extends React.PureComponent<Props> {
  
  private whichRender = (arr: Props['complex']) => {
    return arr.map(item => {
      if(item.type === 'tip') {
        return <Tip tip={item.data as ITip} key={item.data.time} />
      }else {
        return <ChatRecord msg={item.data as Msg} isSelf={item.isSelf} key={item.data.time}  />
      }
    })
  }

  public render = () => {
    const { complex } = this.props
    return (
      <div className={style.screen}>
        {this.whichRender(complex)}
      </div>
    )
  }
}

export default Screen