// 聊天窗口输入框
import * as React from 'react'

import style from '../styles/inputArea.css'

interface Props {
  sendMsg: (msg: string) => void
}

interface State {
  value: string
}


class InputArea extends React.PureComponent<Props, State> {
  public state = {
    value: '',
  }
private handelSubmit = (e: React.FormEvent):void => {
  e.preventDefault()
  this.props.sendMsg(this.state.value)
  this.setState({value: ''})
}

private handleInput = (e: React.ChangeEvent<HTMLInputElement>):void => {
  this.setState({value: e.target.value})
}

public render = () => {
  return (
    <div className={style.input_area}>
    <form className={style.form} onSubmit={this.handelSubmit} >
      <input type="text" className={style.input} onChange={this.handleInput} value={this.state.value} />
      <button type="submit" className={style.submit} >提交</button>
    </form>
    </div>
  )
}
}

export default InputArea