import React from 'react'
// import Stars from '../../../general/stars/stars'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SITE_BASE_URL} from '../../../../app.config'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import './ThingCard.scss'
import '../../../landing/containers/checkOut/checkOut.scoped.scss'

const stylesForNoPhoto = {
  height: '100%',
  width: '100%',
  background: 'rgb(204, 204, 204)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0px',
  left: '0px',
  color: 'rgb(98, 98, 103)',
}


const ThingCard = ({activeTab, course}) => {
  // const {title, img, rating = 2, curPrice, tab, important, activeTab = 'new'} = props
  const { title, thumbnail, img, id } = course

  let image = null
  if (thumbnail) {
    if (thumbnail.toString().includes('static/media')) {
      image = thumbnail
    } else {
      image = `${SITE_BASE_URL}/${thumbnail}`
    }
  } else if (img) {
    if (img.toString().includes('static/media')) {
      image = img
    } else {
      image = `${SITE_BASE_URL}/${img}`
    }
  }


  // console.log(activeTab)
  // console.log(course)




  return (
    <div className="bottom__column" data-courseid={id} data-item="true" data-forid={'title'}>
      <div className="bottom__item">
        <h3 className="bottom__item_title">{title}</h3>

        <div className="bottom__item_img">
          {
            image
              ? <img src={image} alt="subject"/>
              : <NoPhoto style={stylesForNoPhoto}/>
          }
        </div>

        {/*<Stars*/}
        {/*  className="bottom__item_mark"*/}
        {/*  classNameOfValue=""*/}
        {/*  rating={5}*/}
        {/*/>*/}
        {/*<div className="bottom__item_price item_price">*/}
        {/*  <span className="item_price__current">{`${price} ${currency}`}</span>*/}
        {/*</div>*/}
        <Link to={"/subject/" + id} className="btn__shadowFromNull bottom__item_button item_button">
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
