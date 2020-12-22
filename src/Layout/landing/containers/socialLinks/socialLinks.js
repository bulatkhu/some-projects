import React, {useEffect, useState} from 'react'
import arrowUpIcon from '../../../../images/landing/socialLinks/arrowUp.svg'
import {deleteCallbackOnUnMounting, onScrollWindows} from '../../../../scripts/windowsEvents/windowsEvents'
import './socialLinks.scoped.scss'

const SocialLinks = () => {
  const [showArrowUp, setShowArrowUp] = useState(false)

  const showArrowUpHandler = () => {
    // console.log('send a callback from social link')

    if (window.pageYOffset > 300) {
      setShowArrowUp(true)
    } else {
      setShowArrowUp(false)
    }
  }

  useEffect(() => {

    onScrollWindows(showArrowUpHandler)


    return () => {
      deleteCallbackOnUnMounting(showArrowUpHandler)
    }
  },[])

  return (
    <a href="/#" className={`arrowUp ${showArrowUp ? 'active' : ''}`}>
      <span className="arrowUp__img">
        <img src={arrowUpIcon} alt="arrowUp"/>
      </span>
    </a>
  )
}

export default SocialLinks
