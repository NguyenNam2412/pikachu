import React from 'react'
import { connect } from 'react-redux'

import { renderActions } from '../actions/render.actions'
import { getDataList } from '../selectors'

import styles from './Styles.module.css'

function Reroll(props) {
  const { data, rerollClick } = props

  return (
    <div className={styles.header}>
      <button className={styles.btnReRoll} onClick={() => rerollClick(data)}>
        Re-roll
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
    rerollClick:(data) => dispatch(renderActions.reroll(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reroll)