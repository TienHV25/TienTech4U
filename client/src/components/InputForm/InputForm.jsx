import React from 'react'
import { Input } from 'antd';

const InputForm = ({placeholder, value, onChange,id,...rests}) => {
  return (
    <div>
       <Input placeholder={placeholder}
        value={value}
        onChange={onChange} 
        id={id}
        {...rests}
        />
    </div>
  )
}

export default InputForm
