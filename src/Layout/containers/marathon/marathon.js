import React from 'react'
import './marathon.scss'

const Marathon = () => {

  const marathonTabHandler = event => {
    if (event.target.classList.contains('marathon-active')) return

    const {marathonTab} = event.target.dataset

    if (marathonTab) {
      const tabs = event.currentTarget.querySelectorAll('[data-marathon="true"]')
      tabs.forEach(item => item.classList.remove('marathon-active'))
      event.target.classList.add('marathon-active')

      const tabsItems = event.currentTarget.querySelectorAll('[data-tab-item="true"]')
      tabsItems.forEach(item => {

        if (+item.dataset.tabId === +marathonTab) {

          item.classList.remove('marathon__hidden')

        } else {

          item.classList.add('marathon__hidden')

        }

      })

    }

  }

  return (
    <section className="marathon">

      <h2 className="marathon__title">Марафон</h2>

      <div className="marathon__container _container">
        <div className="marathon__content">
          <div className="marathon__column marathonForm">
            <form action="/"  className="marathonForm__form">
              <input className="marathonForm__input" type="text" placeholder="Аты"/>
              <input className="marathonForm__input" type="text" placeholder="Тегі"/>
              <input className="marathonForm__input" type="text" placeholder="Тегі"/>
              <input className="marathonForm__input" type="text" placeholder="Тел. нөмір"/>

              <button className="marathonForm__button" type="submit">Тіркелу</button>
            </form>
          </div>
          <div className="marathon__column">

            <div className="marathon__wrapper" onClick={marathonTabHandler}>

              <div className="marathon__wrapper__tab marathonTab">
                <div data-marathon="true" data-marathon-tab="1"  className="marathonTab__item marathon-active">Ұстаз</div>
                <div data-marathon="true" data-marathon-tab="2" className="marathonTab__item">Пәні</div>
                <div data-marathon="true" data-marathon-tab="3"  className="marathonTab__item">Форматы</div>
                <div data-marathon="true" data-marathon-tab="4" className="marathonTab__item">Уақыты</div>
              </div>

              <div data-tab-item="true" data-tab-id="1"  className="marathonTab__content">
                <h3 className="marathonTab__title">Leran Out Side of The Classroom <span style={{color: "red"}}>slide 1</span></h3>
                <p className="marathonTab__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean senectus
                  dolor adipiscing dui ullamcorper massa purus nisl ut. Urna tellus venenatis convallis morbi.</p>
              </div>

              <div data-tab-item="true" data-tab-id="2" className="marathonTab__content marathon__hidden">
                <h3 className="marathonTab__title">Leran Out Side of The Classroom <span style={{color: "red"}}>slide 2</span></h3>
                <p className="marathonTab__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean senectus
                  dolor adipiscing dui ullamcorper massa purus nisl ut. Urna tellus venenatis convallis morbi.</p>
              </div>

              <div data-tab-item="true" data-tab-id="3" className="marathonTab__content marathon__hidden">
                <h3 className="marathonTab__title">Leran Out Side of The Classroom <span style={{color: "red"}}>slide 3</span></h3>
                <p className="marathonTab__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean senectus
                  dolor adipiscing dui ullamcorper massa purus nisl ut. Urna tellus venenatis convallis morbi.</p>
              </div>

              <div data-tab-item="true" data-tab-id="4" className="marathonTab__content marathon__hidden">
                <h3 className="marathonTab__title">Leran Out Side of The Classroom <span style={{color: "red"}}>slide 4</span></h3>
                <p className="marathonTab__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean senectus
                  dolor adipiscing dui ullamcorper massa purus nisl ut. Urna tellus venenatis convallis morbi.</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Marathon