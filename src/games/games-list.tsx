import { useGames } from "firebase-hooks/games"
import { Document, Game, User } from "models"
import * as React from "react"
import { useState } from "react"
import { GameDetails } from "./game-details"
import { GameForm } from "./game-form"
import { GameListItem } from "./game-list-item"

const GamesListTable: React.FC<GamesListProperties> = ({ user }) => {
    const [games, gamesError] = useGames()
    const { selectedGame, setSelectedGame } = React.useContext(
        SelectedGameContext
    )
    React.useEffect(() => {
        if (!selectedGame) setSelectedGame(games[0])
    }, [games, selectedGame, setSelectedGame])
    console.log("selectedGame", selectedGame)
    console.log("games", games)
    return (
        <>
            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th className="th">Name</th>
                        <th className="th">Cover Art</th>
                        <th className="th">Max Players</th>
                        <th className="th">Times Played</th>
                        <th className="th">Wishlisted</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {games.map((g, i) => (
                        <GameListItem key={g.id} game={g} user={user} />
                    ))}
                </tbody>
            </table>
            <span>{gamesError}</span>
        </>
    )
}
GamesListTable.whyDidYouRender = false

interface SelectedGame {
    readonly selectedGame: Document<Game> | null
    readonly setSelectedGame: (game: Document<Game> | null) => void
}
export const SelectedGameContext = React.createContext<SelectedGame>({
    selectedGame: null,
    setSelectedGame: () => {},
})

const SelectGameContextProvider: React.FC = (props) => {
    const [selectedGame, setSelectedGame] = useState<Document<Game> | null>(
        null
    )
    return (
        <SelectedGameContext.Provider value={{ selectedGame, setSelectedGame }}>
            {props.children}
        </SelectedGameContext.Provider>
    )
}

export interface GamesListProperties {
    readonly user: Document<User> | null
}

export const GamesList: React.FC<GamesListProperties> = ({ user }) => {
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Games</h1>
                <SelectGameContextProvider>
                    <div className="columns">
                        <div className="column is-half">
                            <GamesListTable user={user} />
                        </div>
                        <div className="column is-half">
                            {user?.data.isAdmin ? (
                                <GameForm />
                            ) : (
                                <GameDetails />
                            )}
                        </div>
                    </div>
                </SelectGameContextProvider>
            </div>
        </section>
    )
}
GamesList.whyDidYouRender = false
