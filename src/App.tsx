import * as React from 'react';

import Screen from './components/screen'
import InputArea from './components/input-area'
import Guide from './components/guide'

import { Complex, User } from './interfaces'
import { sendMsg, receiveMsg, receiveTip, enterRoom  } from './api'
import style from './App.css';
import { rndColor, storeUser, getUser, hasUser, isSelf } from './utils'

interface State {
  complex: Complex[]
  showGuide: boolean
  self: User
}

class App extends React.Component<any, State> {
  public state = {
    complex: [],
    showGuide: true,
    self: {
      name: '',
      avatar: '',
    },
  }

  public componentDidMount = () => {
    this.onReceiveMsg()
    this.onReceiveTip()
    if(hasUser()) {
      const user = getUser()
      this.setState({
        showGuide: false,
        self: {name: user.name, avatar: user.avatar}
      })
      enterRoom(user)
    }
  }

  // 发送聊天消息
  private handleSendMsg = (msg: string):void => {
    sendMsg(msg)
  }

  private onReceiveMsg = () => {
    receiveMsg(data => {
        const { complex } = this.state
        const msgData:Complex = {
          type: 'msg',
          data,
          isSelf: isSelf(data.user, this.state.self)
        }
        this.setState({
          complex: [...complex, msgData]
        })
    })
  }
  
  private onReceiveTip = () => {
    receiveTip(data => {
      console.log(data)
      const { complex } = this.state
      const tipData: Complex = {
        type: 'tip',
        data,
      }
      this.setState({
        complex: [...complex, tipData]
      })
    })
  }

  // 获取名字的表单提交
  private handleGuidFormSubmit = (name: string) => {
    const user = {
      name,
      avatar: rndColor(),
    }
    this.setState({self: user, showGuide: false})
    storeUser(user)
    enterRoom(user)
  }

  public render() {
    return (
      <div className={style.App}>
        <Screen complex={this.state.complex} />
        <InputArea sendMsg={this.handleSendMsg} />
        <Guide show={this.state.showGuide} onSubmit={this.handleGuidFormSubmit} />
      </div>
    );
  }
}

export default App;
