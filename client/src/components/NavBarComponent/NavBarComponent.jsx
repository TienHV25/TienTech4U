import React from 'react'
import { WrapperContent, WrapperLableText, WrapperPrice, WrapperRating, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd'

const NavBarComponent = () => {
  const onChange = () => {}
  const renderContent = (type,options) => {
     switch(type) {
        case 'text':
            return options.map((option) => {
                return (
                     <div> 
                        <WrapperTextValue>{option}</WrapperTextValue>
                     </div>
                ) 
            }
            )
        case 'checkbox': 
            return options.map( (option) => {
                return (
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>               
                       <Checkbox value={option.value}>{option.lable}</Checkbox>                  
                    </Checkbox.Group>
                )
            } 
            )
        case 'rating':
            return options.map((option) => {
                return (
                <>
                    <div style={{display:'flex',marginBottom:'5px'}}>
                       <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
                       <WrapperRating>{`tu ${option} sao`}</WrapperRating>
                    </div>
                </> 
                ) 
            }
            )
        case 'price':
            return options.map((option) => {
                return (      
                    <WrapperPrice>
                         {option}
                    </WrapperPrice>
                ) 
            }
            )
        default: 
            return{}
    }

  }
  return (
    <WrapperContent>
        <WrapperLableText>Label</WrapperLableText>
        {renderContent('text',['Tu Lanh','TV','May Giat'])}
    </WrapperContent>
  )
}

export default NavBarComponent
