import "@fortawesome/fontawesome-free/css/all.css"
import { useMyEvents } from "firebase-hooks/events"
import { Document, User } from "models"
import * as React from "react"
import "./events.css"
import { RecentEventCard } from "./recent-event-card"

export interface EventsProperties {
    readonly user: Document<User>
}

export const MyEvents: React.FC<EventsProperties> = (props) => {
    const [myEvents, myEventsError] = useMyEvents(props.user, 0)

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">My Events</h1>
                <div className="columns is-multiline">
                    {myEvents.map((event, index) => (
                        <div className="column is-one-third" key={event.id}>
                            <RecentEventCard event={event} user={props.user} />
                        </div>
                    ))}
                </div>
                <span>{myEventsError}</span>
            </div>
        </section>
    )
}
MyEvents.whyDidYouRender = true
