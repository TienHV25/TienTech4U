import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({textButton, styleButton,type, ...rest}) => {
  return (
    <div >
       <Button
        style={styleButton} 
        type={type}
        {...rest} >
        {textButton}
       </Button>
    </div>
  )
  
}

export default ButtonComponent
