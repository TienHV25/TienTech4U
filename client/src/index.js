import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'
import {
  QueryClientProvider,QueryClient
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
root.render(
 // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
         <App />
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} toggleButtonStyle={{ display: 'none' }} />
    </QueryClientProvider>
    
 // </React.StrictMode>
)

reportWebVitals();
