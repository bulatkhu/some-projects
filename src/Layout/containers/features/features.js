import React from 'react'
import './features.scss'
import icon1 from '../../../images/features/feature-icon1.svg'
import icon2 from '../../../images/features/feature-icon2.svg'
import icon3 from '../../../images/features/feature-icon3.svg'
import icon4 from '../../../images/features/feature-icon4.svg'
import FeatureBox from '../../components/FeatureBox/FeatureBox'

const FeatureBoxes = [
  {icon: icon1, title: 'ҰБТ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},
  {icon: icon2, title: 'НЗМ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},
  {icon: icon3, title: 'БИЛ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},
  {icon: icon4, title: 'Мектепке қосымша', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '}
]

const Features = () => {

  return (
    <section className="features">

      <div className="features__container _container">
        <div className="features__content">
          {FeatureBoxes.map((item, index) => (
            <FeatureBox
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features