import { Collections, convertDocument, db } from "firebase-hooks/common"
import { Document, User } from "models"
import { useEffect, useState } from "react"

export function useUsers(): [Document<User>[], Error | null] {
    const [users, setUsers] = useState<Document<User>[]>([])
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const usersListener = db
            .collection(Collections.Users)
            .orderBy("displayName", "asc")
            .onSnapshot(
                (snapshot) => {
                    setUsers(snapshot.docs.map((e) => convertDocument(e)))
                },
                (error) => {
                    setError(error)
                }
            )
        return function cleanup() {
            usersListener()
        }
    }, [])

    return [users, error]
}
