import * as React from 'react'

import style from '../styles/guide.css'

interface Props {
  show: boolean
  onSubmit: (name: string) => void
}

interface State {
  name: string
}

class Guide extends React.PureComponent<Props, State> {

  public state = {
    name: ''
  }

  private handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    if(this.state.name.trim()) {
      this.props.onSubmit(this.state.name)
    }
  }

  private handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({name: e.target.value})
  }

  public render = () => {
    return (
      <div className={`${style.guide} ${!this.props.show ? style.hidden : ''}`}>
        <form className={style.form} onSubmit={this.handleSubmit} >
          <h1>Give me a name</h1>
          <input type="text" className={style.input} onChange={this.handleInput} />
        </form>
      </div>
    )
  }
}

export default Guide