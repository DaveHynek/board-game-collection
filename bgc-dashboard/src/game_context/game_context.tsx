import { createContext, useContext, useState, useEffect } from 'react';
import { type Game } from './game';

const SHEET_ID = "16DBKav8EYK8yDCZMLB1AhVSO4cR8jDTjFDVpC3EBQ1E"
const RANGE = "Board Game List!A1:L1000"

interface GameContextType {
    games: Game[]
    loading: boolean
    error: string | null
    bearerToken: string | null
    setToken: (token: string) => void
    refetchGames: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({children}: {children: React.ReactNode}) {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setloading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [bearerToken, setBearerToken] = useState<string | null>(null)

    const fetchGames = async () => {
        if(!bearerToken) return;

        setloading(true)
        setError(null)

        try {
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}`,
                {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
                }
            )

            if(!response.ok) throw new Error('Failed to fetch games')
            
            const data = await response.json();
            const games = parseGameData(data);
            setGames(games)
        } catch (err){
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setloading(false);
        }
    }

    const parseGameData = (data: any): Game[] => {
        const games: Game[] = []
        var nameIndex: number
        var minPlayersIndex: number
        var maxPlayersIndex: number
        var imgUrlIndex: number

        data.values[0].forEach((header: string, index: number) => {
            if(header === 'Name') nameIndex = index
            else if(header === 'Min Players') minPlayersIndex = index
            else if(header === 'Max Players') maxPlayersIndex = index
            else if(header === 'Img Url') imgUrlIndex = index
        })

        for(let i = 1; i < data.values.length; i++){
            var game: Game = {
                name: data.values[i][nameIndex!],
                minPlayers: parseInt(data.values[i][minPlayersIndex!]),
                maxPlayers: parseInt(data.values[i][maxPlayersIndex!]),
                imgUrl: data.values[i][imgUrlIndex!]
            }
            games.push(game)
        }

        return games
    }

    useEffect(() => {
        fetchGames()
    }, [bearerToken]) // Trigger a refresh when the token changes

    const value: GameContextType = {
        games,
        loading,
        error,
        bearerToken,
        setToken: setBearerToken,
        refetchGames: fetchGames
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export function useGames() {
    const context = useContext(GameContext)
    if(!context) throw new Error('useGames must be used within a GameProvider')
    return context;
}