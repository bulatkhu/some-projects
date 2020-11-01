import React from 'react'
const styles = {
  height: '100%',
  width: '100%',
  background: '#ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0, left: 0,
  color: '#626267'
}


const NoPhoto = ({text = 'no photo', style = styles}) => {

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default NoPhoto
