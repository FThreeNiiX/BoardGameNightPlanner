import { ObjectSelectField } from "common/components/object-select-field"
import { useGames } from "firebase-hooks/games"
import * as Formik from "formik"
import { Document, Game } from "models"
import * as React from "react"

type GamesSelectProps = Formik.FieldProps<Document<Game>> &
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "form">

export const GamesSelect: React.FC<GamesSelectProps> = (
    props: GamesSelectProps
): JSX.Element => {
    const [games] = useGames()

    return (
        <ObjectSelectField<Document<Game>>
            values={games}
            keySelector={gameKeySelector}
            labelSelector={gameLabelSelector}
            {...props}
        />
    )

    function gameKeySelector(game: Document<Game>) {
        return game.id
    }

    function gameLabelSelector(game: Document<Game>) {
        return game.data.name
    }
}
GamesSelect.whyDidYouRender = false
