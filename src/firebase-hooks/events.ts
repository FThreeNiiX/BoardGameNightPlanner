import { Collections, convertDocument, db } from "firebase-hooks/common"
import * as firebase from "firebase/app"
import { Document, Event, Scores, User } from "models"
import { useEffect, useState } from "react"

export function useMyEvents(
    user: Document<User>,
    page: number
): [Document<Event>[], Error | null] {
    const [myEvents, setMyEvents] = useState<Document<Event>[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const myEventsListener = db
            .collection(Collections.Events)
            .where(`attendees.${user.id}`, "==", user.data.displayName)
            // .where('timestamp', '<', new Date())
            // .orderBy('timestamp', 'asc')
            .onSnapshot(
                (snapshot) => {
                    setMyEvents(snapshot.docs.map((e) => convertDocument(e)))
                },
                (error) => {
                    setError(error)
                }
            )
        return function cleanup() {
            myEventsListener()
        }
    }, [user])

    return [myEvents, error]
}

export function useUpcomingEvents(): [Document<Event>[], Error | null] {
    const [upcomingEvents, setUpcomingEvents] = useState<Document<Event>[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const upcomingEventsListener = db
            .collection(Collections.Events)
            .where("timestamp", ">=", new Date())
            .orderBy("timestamp")
            .limit(3)
            .onSnapshot(
                (snapshot) => {
                    setUpcomingEvents(
                        snapshot.docs.map((e) => convertDocument(e))
                    )
                },
                (error) => {
                    setError(error)
                }
            )
        return function cleanup() {
            upcomingEventsListener()
        }
    }, [])

    return [upcomingEvents, error]
}

export function useRecentEvents(): [Document<Event>[], Error | null] {
    const [recentEvents, setRecentEvents] = useState<Document<Event>[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const recentEventsListener = db
            .collection(Collections.Events)
            .where("timestamp", "<", new Date())
            .orderBy("timestamp", "desc")
            .limit(3)
            .onSnapshot(
                (snapshot) => {
                    setRecentEvents(
                        snapshot.docs.map((e) => convertDocument(e))
                    )
                },
                (error) => {
                    setError(error)
                }
            )
        return function cleanup() {
            recentEventsListener()
        }
    }, [])

    return [recentEvents, error]
}

export function useEvent(id?: string): Document<Event> | null {
    const [event, setEvent] = useState<Document<Event> | null>(null)

    useEffect(() => {
        async function getEvent() {
            const e = await db.collection(Collections.Events).doc(id).get()
            setEvent(convertDocument(e))
        }
        if (id) {
            getEvent()
        } else {
            setEvent(null)
        }
    }, [id])

    return event
}

export async function saveEvent(eventId: string | undefined, event: Event) {
    if (eventId) {
        await db.collection(Collections.Events).doc(eventId).update(event)
    } else {
        await db.collection(Collections.Events).add(event)
    }
}

export async function attendEvent(eventId: string, user: Document<User>) {
    await db
        .collection(Collections.Events)
        .doc(eventId)
        .update(`attendees.${user.id}`, user.data.displayName)
}

export async function unattendEvent(eventId: string, userId: string) {
    await db
        .collection(Collections.Events)
        .doc(eventId)
        .update(`attendees.${userId}`, firebase.firestore.FieldValue.delete())
}

export async function updateScores(eventId: string, scores: Scores) {
    await db.collection(Collections.Events).doc(eventId).update({ scores })
}
