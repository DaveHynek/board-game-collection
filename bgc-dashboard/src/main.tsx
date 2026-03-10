import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GameProvider } from './game_context/game_context'
import App from './App'

const rootElement = document.getElementById('root')
if(!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <GoogleOAuthProvider clientId="239945393758-m3jt19hvfjfa9vdogl16d7gt6mo21aeb.apps.googleusercontent.com">
    <GameProvider>
      <App />
    </GameProvider>
  </GoogleOAuthProvider>
)