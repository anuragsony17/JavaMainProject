import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'

import store from "../src/store/store.js"
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from '../src/authConfig.js'


createRoot(document.getElementById('root')).render(

  <AuthProvider authConfig={authConfig}>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>,
    </Provider>
  </AuthProvider>
)
