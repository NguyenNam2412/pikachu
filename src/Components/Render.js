import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'

import { renderActions } from '../actions/render.actions'
import { getDataList } from '../selectors'
import Reroll from './Reroll'
import Gameover from './Gameover'

import styles from './Styles.module.css'

function Render(props) {
  const { renderData, data, iconClick } = props

  const [pointLine, setPointLine] = useState([])

  useEffect(() => {
    while(pointLine.length > 1) {
      iconClick(pointLine)
      pointLine.length = 0
    }
  }, [iconClick, pointLine])

  useEffect(() => {
    renderData()
  }, [renderData])

  return (
    <div className={styles.main}>
      <Gameover/>
      <div className={styles.data}>
      {data.map((row, i) => (
        <div className={styles.boder} key={i}>
          {row.map((col, j) => (
            <button 
              className={clsx(styles.btn, {[styles.disabled]: col.id == null})} 
              key={j} 
              onClick={() => {setPointLine([...pointLine, {x: i, y: j}])}}>
                <img className={styles.img} id={j} src={col.images} alt={""}/>
            </button>
          ))}
        </div>
      ))}
      </div>
      <Reroll/>
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
    iconClick: (pointLine) => dispatch(renderActions.click(pointLine)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Render)
