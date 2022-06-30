import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { renderActions } from '../actions/render.actions'
import { getDataList } from '../selectors'

import styles from './Styles.module.css'

function Gameover(props) {
  const { data, renderData } = props
  const [check, setCheck] = useState(true)

  useEffect(() => {
    if(data.every(row => row.every(cell => cell === 0))) {
      setCheck(false)
    } else {
      setCheck(true)
    }
  }, [data])

  return (
    <div className={clsx(styles.end, {[styles.display]: check})}>
      <span className={styles.font}>
        Game Over
      </span>
      <button className={styles.new} onClick={()=>{renderData()}}>
        New Game
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    data: getDataList(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    renderData: () => dispatch(renderActions.render()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gameover)