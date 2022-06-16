import { Thumbnail } from "common/components/thumbnail"
import { saveGame } from "firebase-hooks/games"
import { Document, Game, User } from "models"
import * as React from "react"
import { SelectedGameContext } from "./games-list"

export interface GameListItemProperties {
    readonly game: Document<Game>
    readonly user: Document<User> | null
}

interface WishlistItemProperties {
    name: string
}
const WishlistItem: React.FC<WishlistItemProperties> = ({ name }) => {
    return <p>{name}</p>
}

export const GameListItem: React.FC<GameListItemProperties> = ({
    game,
    user,
}) => {
    const selectedGameContext = React.useContext(SelectedGameContext)

    return (
        <tr
            className={
                selectedGameContext.selectedGame === game
                    ? "tr is-selected"
                    : "tr"
            }
            style={{ cursor: "pointer" }}
            onClick={handleItemClick}
        >
            <td className="td">{game.data.name}</td>
            <td className="td">
                {" "}
                <Thumbnail url={game.data.bggLink} small={true} />
            </td>
            <td className="td">{game.data.maxPlayers}</td>
            <td className="td">{game.data.timesPlayed || 0}</td>
            <td className="td">
                {game.data.wishlist && game.data.wishlist?.length > 0
                    ? game?.data?.wishlist.map((item, index) => {
                          let name = item
                          if (game.data.wishlist) {
                              name =
                                  index !== game.data.wishlist.length - 1
                                      ? `${item}, `
                                      : item
                          }
                          return <WishlistItem name={name} key={item} />
                      })
                    : "No wishlist"}
                <button
                    className="button is-primary"
                    onClick={() => handleSubmit()}
                >
                    {game.data.wishlist &&
                    user?.data.displayName &&
                    game.data.wishlist?.indexOf(user?.data?.displayName) >
                        -1 ? (
                        <i className="fas fa-heart-broken" />
                    ) : (
                        <i className="fas fa-heart" />
                    )}
                </button>
            </td>
        </tr>
    )

    function handleItemClick(event: React.MouseEvent<HTMLTableRowElement>) {
        selectedGameContext.setSelectedGame(game)
    }

    async function handleSubmit() {
        let wishlist = game.data.wishlist || []
        const name = user?.data.displayName || ""
        if (wishlist.indexOf(name) === -1) {
            wishlist.push(name)
        } else wishlist = wishlist.filter((item) => item !== name)
        await saveGame({ ...game.data, wishlist }, game.id)
    }
}
GameListItem.whyDidYouRender = false
