import React,  { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import routes from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import axios from 'axios'
// import {useQuery} from '@tanstack/react-query'
import { isJsonString } from './utils'
import {useDispatch, useSelector} from "react-redux"
import * as UserService from './services/UserService'
import {jwtDecode} from "jwt-decode"
import { resetUser, updateUser } from  './redux/slides/userSlide'
import LoadingComponent from './components/LoadingComponent/LoadingComponent'

function App() {
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
      let storageRefreshToken = localStorage.getItem('refresh_token')
      let refreshToken = null
      if (storageRefreshToken && storageRefreshToken !== 'undefined' && isJsonString(storageRefreshToken)) {
          refreshToken = JSON.parse(storageRefreshToken)
      }
      const decodeRefreshToken = jwtDecode(refreshToken)
      if(decoded?.exp < currentTime.getTime() / 1000)
      {
        if(decodeRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken)
          config.headers['token'] = `Bearer ${data?.accessToken}`
        }
        else{
          dispatch(resetUser())
        }
      }
      return config

    }, function (error) {
      return Promise.reject(error)
    })

  const handleGetUserDetail = async (id,token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    let refreshToken = null
    if (storageRefreshToken && storageRefreshToken !== 'undefined' && isJsonString(storageRefreshToken)) {
        refreshToken = JSON.parse(storageRefreshToken)
    }
    const res = await UserService.getUserDetail(id,token)
    dispatch(updateUser({...res?.data,access_token:token,refreshToken: refreshToken}))
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