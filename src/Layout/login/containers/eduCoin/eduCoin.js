import React, { useEffect, useState } from 'react'
import './eduCoin.scoped.scss'
import statisticImg from '../../../../images/login/educCoin/eduCoin.svg'
import coinImg from '../../../../images/login/educCoin/coin.svg'
import { connect } from "react-redux";
import { apiGetEduCoins } from '../../../../request/student/apiStudent'


const EduCoinComponent = ({ credits, id }) => {


  const [count, setCount] = useState(0);
  const [data, setData] = useState({
    videoDay: 0,
    videoTotal: 0,
    quizDay: 0,
    quizTotal: 0,
    comQuizDay: 0,
    comQuizTotal: 0,
    comboDay: 0,
    comboTotal: 0,
    regDay: 0,
    regTotal: 0,
    refDay: 0,
    refTotal: 0,
    courseDay: 0,
    courseTotal: 0,
    bonusDay: 0,
    bonusTotal: 0,
  });

  useEffect(() => {
    const date = Date.now();
    const date2 = Date.parse('2021-03-16T21:19:16.000000Z');
    console.log(date-date2);
    apiGetEduCoins(id)
      .then(data => {
        console.log(data);
        let c = 0;
        let ob = {
          videoDay: 0,
          videoTotal: 0,
          quizDay: 0,
          quizTotal: 0,
          comQuizDay: 0,
          comQuizTotal: 0,
          comboDay: 0,
          comboTotal: 0,
          regDay: 0,
          regTotal: 0,
          refDay: 0,
          refTotal: 0,
          courseDay: 0,
          courseTotal: 0,
          bonusDay: 0,
          bonusTotal: 0,
        };

        const day = 86400000;

        for (let it of data.data) {
          c += it.count;

          if (it.bonus_type === 'video') {
            if (date - Date.parse(it.created_at) < day) {
              ob = {
                ...ob,
                videoDay:ob.videoDay + it.count
              }
            }
            else {
              ob = {
                ...ob,
                videoTotal:ob.videoTotal + it.count
              }
            }
          }


          if (it.bonus_type === 'quiz') {
            if (date - Date.parse(it.created_at) < day) {
              ob = {
                ...ob,
                quizDay:ob.quizDay + it.count
              }
            }
            else {
              ob = {
                ...ob,
                quizTotal:ob.quizTotal + it.count
              }
            }
          }


        }
        setData(ob)
        setCount(c);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="statistic">

      <div className="statistic__img">
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '10.3%',
            left: '84%',
            color: 'black'
          }}
        >
          {data.videoTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '14.8%',
            left: '84%',
            color: 'black'
          }}
        >
          {data.videoDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '36.3%',
            left: '96%',
            color: 'black'
          }}
        >
          {data.quizTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '40.8%',
            left: '96%',
            color: 'black'
          }}
        >
          {data.quizDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '66.1%',
            left: '95%',
            color: 'black'
          }}
        >
          {data.comQuizTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '70.6%',
            left: '95%',
            color: 'black'
          }}
        >
          {data.comQuizDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '93.4%',
            left: '76%',
            color: 'black'
          }}
        >
          {data.comboTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '97.9%',
            left: '76%',
            color: 'black'
          }}
        >
          {data.comboDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '93.4%',
            left: '22%',
            color: 'black'
          }}
        >
          {data.regTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '97.9%',
            left: '22%',
            color: 'black'
          }}
        >
          {data.regDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '67.4%',
            left: '14%',
            color: 'black'
          }}
        >
          {data.refTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '71.9%',
            left: '14%',
            color: 'black'
          }}
        >
          {data.refDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '37.9%',
            left: '14.2%',
            color: 'black'
          }}
        >
          {data.courseTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '42.4%',
            left: '14.2%',
            color: 'black'
          }}
        >
          {data.courseDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '9.8%',
            left: '23%',
            color: 'black'
          }}
        >
          {data.bonusTotal} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div
          className="statistic__creditsSm"
          style={{
            position: 'absolute',
            top: '14.3%',
            left: '23%',
            color: 'black'
          }}
        >
          {data.bonusDay} <img src={coinImg} className='statistic__coinImg' />
        </div>
        <div className="statistic__credits">{count}</div>
        <img src={statisticImg} alt="statisticImg" />
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
