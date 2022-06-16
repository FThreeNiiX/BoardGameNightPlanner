import "@fortawesome/fontawesome-free/css/all.css"
import { useRecentEvents, useUpcomingEvents } from "firebase-hooks/events"
import { Document, User } from "models"
import * as React from "react"
import "./events.css"
import { RecentEventCard } from "./recent-event-card"
import { UpcomingEventCard } from "./upcoming-event-card"

export interface EventsProperties {
    readonly user: Document<User>
}

const UpcomingEvents: React.FC<EventsProperties> = (props) => {
    const [upcomingEvents, upcomingEventsError] = useUpcomingEvents()

    return (
        <>
            <h1 className="title">Upcoming Events</h1>
            <div className="columns">
                {upcomingEvents.map((event, index) => (
                    <div className="column is-one-third" key={index}>
                        <UpcomingEventCard event={event} user={props.user} />
                    </div>
                ))}
            </div>
            <span>{upcomingEventsError}</span>
        </>
    )
}
UpcomingEvents.whyDidYouRender = true

const RecentEvents: React.FC<EventsProperties> = (props) => {
    const [recentEvents, recentEventsError] = useRecentEvents()
    return (
        <>
            <h1 className="title">Recent Events</h1>
            <div className="columns">
                {recentEvents.map((event, index) => (
                    <div className="column is-one-third" key={index}>
                        <RecentEventCard event={event} user={props.user} />
                    </div>
                ))}
            </div>
            <span>{recentEventsError}</span>
        </>
    )
}
RecentEvents.whyDidYouRender = true

export const Events: React.FC<EventsProperties> = (props) => {
    return (
        <section className="section">
            <div className="container">
                <UpcomingEvents user={props.user} />
                <RecentEvents user={props.user} />
            </div>
        </section>
    )
}
Events.whyDidYouRender = true
