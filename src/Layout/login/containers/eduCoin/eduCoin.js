import React, {useEffect,useState} from 'react'
import './eduCoin.scoped.scss'
import statisticImg from '../../../../images/login/educCoin/eduCoin.svg'
import {connect} from "react-redux";
import {apiGetEduCoins} from '../../../../request/student/apiStudent'


const EduCoinComponent = ({credits,id}) => {
  

  const [count,setCount] = useState(0);

  useEffect(()=>{
    apiGetEduCoins(id)
    .then(data=>{
      console.log(data);
      let c = 0;
      for(let it of data.data){
        c += it.count;
      }
      setCount(c);
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  
  return (
    <div className="statistic">

      <div className="statistic__img">
        <div className="statistic__credits">{count}</div>
        <img src={statisticImg} alt="statisticImg"/>
      </div>

    </div>
  )
}


function mapStateToProps(state) {
  return {
    credits: state.user.user ? state.user.user.credit : '0',
    id: state.user.user ? state.user.user.id : '1'
  }
}


export default connect(mapStateToProps)(EduCoinComponent)
