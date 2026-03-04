import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'

const SHEET_ID = "16DBKav8EYK8yDCZMLB1AhVSO4cR8jDTjFDVpC3EBQ1E"
const RANGE = "Board Game List!A1:E100"

function App() {
  const [data, setData] = useState(null)

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    onSuccess: async (tokenResponse) => {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      )

      const json = await res.json()
      setData(json.values)
    }
  })

  return (
    <div style={{ padding: 40 }}>
      <h1>Private Sheets Dashboard</h1>

      <button onClick={() => login()}>
        Sign in with Google
      </button>

      {data && (
        <table border="1" cellPadding="5">
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App