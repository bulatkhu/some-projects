import React from 'react'
import './eduCoin.scoped.scss'
import statisticImg from '../../../../images/login/educCoin/eduCoin.svg'
import {connect} from "react-redux";


const EduCoinComponent = ({credits}) => {
  
  
  return (
    <div className="statistic">

      <div className="statistic__img">
        <div className="statistic__credits">{credits}</div>
        <img src={statisticImg} alt="statisticImg"/>
      </div>

    </div>
  )
}


function mapStateToProps(state) {
  return {
    credits: state.user.user ? state.user.user.credit : '0'
  }
}


export default connect(mapStateToProps)(EduCoinComponent)
