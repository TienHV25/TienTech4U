import React, { useEffect,  useState } from 'react'
import TypeProducts from '../../components/TypeProducts/TypeProducts'
import { WrapperButtonMore, WrapperTypeProduct ,WrapperButtonEnd} from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import slider5 from '../../assets/images/slider5.webp'
import slider6 from '../../assets/images/slider6.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from "@tanstack/react-query"
import * as ProductService from '../../services/ProductService'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
// import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'


const HomePage = () => {
  const searchProduct = useSelector((state) => state.product.search)
  const seaerchDebounce = useDebounce(searchProduct,1000)
  const [stateProducts,setStateProducts] = useState([])
  const [limit,setLimit] = useState(12)

  const arr = ['TV','Tủ Lạnh','Lap Top','Điện Gia Dụng','Thời Trang Nam','Thời Trang Nữ',
    'Nội Thất','Đồ Chơi','Giày Dép','Điện Lạnh','Điện Tử','Máy Ảnh','ĐTDĐ','Đồng Hồ','Trang Sức','Balo','Xe Máy','Sách']
  
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProducts(search,limit)
    setStateProducts(res?.data)
    return res
  }

  const { data: products } = useQuery({
    queryKey: ['products',limit,seaerchDebounce],
    queryFn: fetchProductAll,
    retry:3,
    retryDelay: 1000,
    keepPreviousData: true
  })
  
  useEffect(() => {
    if(products?.data?.length > 0 && searchProduct.length === 0) {
      setStateProducts(products?.data)
    }
  },[products])
  
  console.log(products)
  return (
 <>
  <div  style={{padding:'0 120px'}}>
    <WrapperTypeProduct>
        {arr.map( (item) => {
          return (
           <TypeProducts name={item} key={item}/>
          )
        })}            
    </WrapperTypeProduct> 
  </div>
  <div style={{backgroundColor:'#efefef',padding:'0 120px'}}>   
   <SliderComponent arrImages1={[slider1,slider2,slider3]} arrImages2={[slider4,slider5,slider6]} /> 
   <div style={{marginTop:'35px',display:'flex',gap:'15px',flexWrap:'wrap'}}>
     {stateProducts?.map((product,index) => 
       {
         return (
          <CardComponent 
          key={product.id || `product-${index}`} 
          countInStock={product.countInStock} 
          description={product.description}
          image={product.image}
          name={product.name}
          price={product.price}
          rating={product.rating}
          type={product.type}
          selled={product.selled}
          discount={product.discount}
           />
         )
       }
     )}
   </div>
   <div style={{ textAlign:'center'}}>
       {products?.totalProduct !== products?.data?.length ?
       <WrapperButtonMore textButton="Xem thêm" type="outline"
         styleButton={{marginTop:'20px',marginBottom:'20px',border:'1px solid',
         fontWeight:'500',fontSize:'16px',width:'240px',height:'38px',
         color:'rgb(11,116,229)'}}
         onClick = {() => setLimit((prev) => prev + 6 )}  /> :
         <WrapperButtonEnd textButton="Hết sản phẩm" type="outline"
         styleButton={{marginTop:'20px',marginBottom:'20px',border:'1px solid',
         fontWeight:'500',fontSize:'16px',width:'240px',height:'38px',
         color:'grey'}}
          />
          }
   </div>
  </div>
  <div>
     <FooterComponent />
  </div>
  </>
  )
}

export default HomePage