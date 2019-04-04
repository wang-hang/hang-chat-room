import * as React from 'react'

import style from '../styles/tip.css'
import { ITip } from '../interfaces'
import { formatDate } from '../utils'

const ENTER_TIP = '进入了聊天室'
const EXIT_TIP = '离开了聊天室'

interface Props {
  tip: ITip
}

class Tip extends React.PureComponent<Props> {
  public render = () => {
    const { name, enter, time } = this.props.tip
    return (
      <div className={style.tip}>
        <span className={style.name} >{name}</span>
        <span>
          {`${enter ? ENTER_TIP : EXIT_TIP}`}
        </span>
        <span>{formatDate(time)}</span>
        
      </div>
    )
  }
}

export default Tip