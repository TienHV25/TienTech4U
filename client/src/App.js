import React,  { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import routes from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import axios from 'axios'
// import {useQuery} from '@tanstack/react-query'
import { isJsonString } from './utils'
import {useDispatch, useSelector} from "react-redux"
import * as UserService from './services/UserService'
import { jwtDecode } from "jwt-decode"
import { updateUser } from  './redux/slides/userSlide'
import LoadingComponent from './components/LoadingComponent/LoadingComponent'

function App() {
  // const fetchApi = async() => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product/get-product-all`);
  //     return res.data
  //   } catch (error) {
  //     console.error('Error:', error)
  //   }
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('Query:',query)
  const dispatch = useDispatch()
  const [isPending,setIsPending] = useState(false)
  const user = useSelector((state) => state.user)
  
  useEffect(() => {
    setIsPending(true)
    const {storageData,decoded} = handleDecoded()
      if(decoded?.id) {
        handleGetUserDetail(decoded?.id,storageData)
      }
      setIsPending(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData) ) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { storageData,decoded}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
      const currentTime = new Date()
      const {decoded} = handleDecoded()
      if(decoded?.exp < currentTime.getTime() / 1000)
      {
        const dataRefreshToken = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${dataRefreshToken?.accessToken}`
      }
      return config

    }, function (error) {
      return Promise.reject(error)
    })

  const handleGetUserDetail = async (id,token) => {
    const res = await UserService.getUserDetail(id,token)
    dispatch(updateUser({...res?.data,access_token:token}))
    setIsPending(false)
  }
  
  return (
  <>
  <LoadingComponent isPending={isPending}>
    <Router>
      <Routes>
        {
          routes.map( (route,index) => 
            { const Page = route.page
              const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowPage ? DefaultComponent : React.Fragment
              return (
                  <Route key={index} path={isCheckAuth ? route.path : ''} element={
                  <>
                    <Layout>
                      <Page/>
                    </Layout>
                  </>   
                  } />
              ) 
            }     
          )                
        }  
      </Routes>
    </Router>
  </LoadingComponent>
  </>
  )
}
export default App;