import { Thumbnail } from "common/components/thumbnail"
import { Document, Game } from "models"
import * as React from "react"
import { SelectedGameContext } from "./games-list"

export interface GameListItemProperties {
    readonly game: Document<Game>
}

export const GameListItem: React.FC<GameListItemProperties> = (props) => {
    const selectedGameContext = React.useContext(SelectedGameContext)

    return (
        <tr
            className={
                selectedGameContext.selectedGame === props.game
                    ? "tr is-selected"
                    : "tr"
            }
            onClick={handleItemClick}
        >
            <td className="td">{props.game.data.name}</td>
            <td className="td">
                {" "}
                <Thumbnail url={props.game.data.bggLink} small={true} />
            </td>
            <td className="td">{props.game.data.maxPlayers}</td>
            <td className="td">{props.game.data.timesPlayed || 0}</td>
        </tr>
    )

    function handleItemClick(event: React.MouseEvent<HTMLTableRowElement>) {
        selectedGameContext.setSelectedGame(props.game)
    }
}
GameListItem.whyDidYouRender = true
