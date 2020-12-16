import React from 'react'
import './socialLinks.scoped.scss'
import arrowUpIcon   from '../../../../images/landing/socialLinks/arrowUp.svg'

const SocialLinks = () => {

  const scrollToTop = event => {
    event.preventDefault()
    let intervalId = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(intervalId)
      }
      window.scroll(0, window.pageYOffset - 30)
    }, 1)
  }

  return (
    <a href="/" onClick={scrollToTop} className="arrowUp">
      <span className="arrowUp__img">
        <img src={arrowUpIcon} alt="arrowUp"/>
      </span>
    </a>
  )
}

export default SocialLinks