import React from 'react'
import './tabs.scss'

const Tabs = ({data, className, useDefTabs}) => {
  const tabsClassName = ['tabs']
  className && tabsClassName.push(className)

  const tabItems = <>
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
    </>

  if (useDefTabs) {
    return (
      <div onClick={useDefTabs} className={tabsClassName.join(' ')}>
        {tabItems}
      </div>
    )
  }



  return (
    <div className={tabsClassName.join(' ')}>
      {tabItems}
    </div>
  )
}

export default Tabs