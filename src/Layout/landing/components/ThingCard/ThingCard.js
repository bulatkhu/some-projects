import React from 'react'
import Stars from '../../../general/stars/stars'
import './ThingCard.scss'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ThingCard = ({activeTab, course}) => {
  // const {title, img, rating = 2, curPrice, tab, important, activeTab = 'new'} = props
  const { title, thumbnail, price, currency, id } = course

  // console.log(activeTab)
  // console.log(course)



  return (
    <div className="bottom__column" data-courseid={id} data-item="true" data-forid={'title'}>
      <div className="bottom__item">
        <h3 className="bottom__item_title">{title}</h3>

        <div className="bottom__item_img">
          { thumbnail ? <img src={'https://api.ustaz.xyz/' + thumbnail} alt="thing"/> : null }
        </div>

        <Stars
          className="bottom__item_mark"
          classNameOfValue=""
          rating={5}
        />
        <div className="bottom__item_price item_price">
          <span className="item_price__current">{`${price} ${currency}`}</span>
        </div>
        <Link to={"/subject/" + id}className="btn__shadowFromNull bottom__item_button item_button">
          Толығырақ
        </Link>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    activeTab: state.courseTab.activeTab
  }
}


export default connect(mapStateToProps)(ThingCard)