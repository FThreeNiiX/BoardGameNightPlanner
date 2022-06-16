import { Description } from "common/components/description"
import { Thumbnail } from "common/components/thumbnail"
import * as React from "react"
import { useContext } from "react"
import { SelectedGameContext } from "./games-list"

export const GameDetails: React.FC = () => {
    const { selectedGame } = useContext(SelectedGameContext)

    return selectedGame ? (
        <div className="card">
            <div className="card-image">
                <figure className="image is-square">
                    <Thumbnail url={selectedGame?.data.bggLink || ""} />
                </figure>
            </div>
            <div className="card-header">
                <h3 className="card-header-title is-size-3">
                    <a
                        href={selectedGame?.data.bggLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {selectedGame?.data.name}
                    </a>
                </h3>
            </div>
            <div className="card-content">
                <div className="content">
                    <Description url={selectedGame?.data.bggLink || ""} />
                    <h4 className="is-size-5">
                        <a
                            href={`https://www.youtube.com/results?search_query=how+to+play+${selectedGame?.data.name.replace(
                                " ",
                                "+"
                            )}+board+game`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            How to Play
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    ) : null
}
