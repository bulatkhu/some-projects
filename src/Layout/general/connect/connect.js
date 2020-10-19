import React from 'react'
import './connect.scss'


const Connect = () => {

  const copyValueHandler = event => {
    event.preventDefault()

    const copyText = document.getElementById(event.target.dataset.id)

    copyText.select()

    document.execCommand("copy")

  }

  return (
    <section className="connect">

      <div className="connect__wrapper">
        <h1 className="connect__title">Connect your live stream to the Live API</h1>
        <h2 className="connect__subtitle">
          Use live-streaming software or a hardware encoder.
          <a href="/"> Learn More</a>
        </h2>

        <form className="connect-box">

          <p className="connect-box__preview">Preview your broadcast with a stream key or paired encoder.</p>


          <div className="connect-box__wrap">

            <label className="connect-box__label" htmlFor="url">Server URL*</label>

            <div className="connect-box__input">
              <input type="text" defaultValue="rtmps://live-api-s.edututs+.com:443/rtmp/" name="url" id="url" placeholder="input url..."/>
              <button onClick={copyValueHandler} data-id="url">Copy</button>
            </div>

          </div>


          <div className="connect-box__wrap">

            <label className="connect-box__label" htmlFor="key">Persistent stream key*</label>

            <div className="connect-box__input">
              <input type="text" defaultValue="592030151361629?s_bl=1&s_ps=1&s_sw=065&s_vt=api-s&a=AbzB7xYk7XdnKpBf" name="key" id="key" placeholder="input key..."/>
              <button onClick={copyValueHandler} data-id="key">Copy</button>
            </div>

          </div>

          <button className="connect__button">Go Live</button>

        </form>
      </div>

    </section>
  )
}

export default Connect