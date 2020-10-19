import React, {useEffect} from 'react'
import './tabs.scss'
import {connect} from 'react-redux'
import {setActiveTab} from '../../../../redux/actions/coursesTabActionsFunc'


function capsFirstLetter(word) {
  return word[0].toUpperCase() + word.substr(1)
}


const Tabs = props => {
  const {data, className, useDefTabs, activeTab} = props
  const tabsClassName = ['tabs']
  className && tabsClassName.push(className)


  useEffect(() => {

    if (data.length) {
      if (!activeTab) {
        props.selectTab(data[0].title)
      }
    }

  }, [data, props, activeTab])




  const selectTab = event => {
    const {tabid} = event.target.dataset

    if (tabid) {
      props.selectTab(tabid)
    }
  }

  const tabItems = data.map((item, index) => {
    const cls = ['tabs__item']

    if (item.title === activeTab) {
      cls.push('active-tab')
    }

    return (
      <div
        className={cls.join(' ')}
        data-tab="true"
        data-tabid={item.title}
        key={index}
      >
        {capsFirstLetter(item.title)}
      </div>
    )
  })

  if (useDefTabs) {
    return (
      <div onClick={useDefTabs} className={tabsClassName.join(' ')}>
        {tabItems}
      </div>
    )
  }



  return (
    <div className={tabsClassName.join(' ')} onClick={selectTab}>
      {tabItems}
    </div>
  )
}


function mapStateToProps(state) {
  return {
    activeTab: state.courseTab.activeTab
  }
}


function mapDispatchToProps(dispatch) {
  return {
    selectTab: tab => dispatch(setActiveTab(tab))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Tabs)