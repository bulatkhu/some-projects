import React from 'react'
import './tabs.scss'

const Tabs = ({data, className}) => {
  const tabsClassName = ['tabs']
  className && tabsClassName.push(className)

  return (
    <div className={tabsClassName.join(' ')}>

      {data.map((item, index) => {
        const cls = ['tabs__item']

        if (index === 0) {
          cls.push('active-tab')
        }

        return (
          <div
            className={cls.join(' ')}
            data-tab="true"
            data-tabid={item.id}
            key={index + item.id}
          >
            {item.title}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs