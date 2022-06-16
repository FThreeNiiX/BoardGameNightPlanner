import { saveEvent } from "firebase-hooks/events"
import { saveGame } from "firebase-hooks/games"
import { Document, Event, Game } from "models"
import * as React from "react"

interface GameTimesPlayedFormProps {
    game: Document<Game>
    event: Document<Event>
    isAdmin: boolean
}

export const GameTimesPlayedForm: React.FC<GameTimesPlayedFormProps> = ({
    event,
    game,
    isAdmin,
}) => {
    async function handleSubmit(val: number) {
        const timesPlayed = game.data?.timesPlayed
            ? game.data.timesPlayed + val
            : 1
        await saveGame({ ...game.data, timesPlayed }, game.id)
        await saveEvent(event.id, {
            ...event.data,
            game: { id: game.id, data: { ...game.data, timesPlayed } },
        })
    }

    return (
        <>
            <h3 className="is-size-7">Times Played: {game.data.timesPlayed}</h3>
            {isAdmin && (
                <div className="columns">
                    <div className="column">
                        <button
                            className="button is-primary"
                            onClick={() => handleSubmit(1)}
                        >
                            +1
                        </button>
                    </div>
                    <div className="column">
                        <button
                            className="button is-primary"
                            onClick={() => handleSubmit(-1)}
                        >
                            -1
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
