import React, {useRef} from 'react'
import Select from 'react-select'

const MySelect = ({isMulti, onMenuOpenProps, ...props}) => {
  const selectRef = useRef(null)

  return (
    <Select
      ref={selectRef}
      isMulti={isMulti}
      {...props}
    />
  )
}

export default MySelect
