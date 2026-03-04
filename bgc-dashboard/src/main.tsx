import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="239945393758-m3jt19hvfjfa9vdogl16d7gt6mo21aeb.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)