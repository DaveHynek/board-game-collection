import { useGoogleLogin } from '@react-oauth/google'
import { useGames } from './game_context/game_context'
import { GameGrid } from './components/gameGrid'

function App() {
  const { setToken, games} = useGames()

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    onSuccess: async (tokenResponse) => {
      setToken(tokenResponse.access_token)
      console.log('Login successful, access token stored.')
    }
  })

  return (
    <div style={{ padding: 40 }}>
      <h1>Board Game Collection</h1>

      {games.length === 0 ? (
        <button onClick={() => login()}>
          Sign in with Google
        </button>
      ) : ''}

      <GameGrid />
    </div>
  )
}

export default App