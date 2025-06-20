import React from 'react';
import {WrapperFooter,WrapperFooterText} from './style';


const FooterComponent = () => {
 
  return (
    <WrapperFooter>
      <WrapperFooterText>
         &copy;2025 TienTech4U.More Information,can visit another website.
            <a target="_blank" href='http://localhost:3000/home' rel="noopener noreferrer" style={{ color: 'white', fontWeight: 'bold' }}>
                &#8594; Click here &#8592;
            </a>
      </WrapperFooterText>
    </WrapperFooter>
  )
}

export default FooterComponent
