import {
    auth,
    authSignInOptions,
    authUI,
    Collections,
    db,
} from "firebase-hooks/common"
import { Document, User } from "models"
import { useEffect, useState } from "react"

export function useLogin(authElementId: string) {
    useEffect(() => {
        authUI.start(authElementId, {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    if (authResult.user) {
                        const user: User = {
                            displayName: authResult.user.displayName,
                            email: authResult.user.email,
                        }
                        db.collection(Collections.Users)
                            .doc(authResult.user.uid)
                            .set(user, { merge: true })
                    }
                    return false
                },
            },
            signInFlow: "popup",
            signInOptions: authSignInOptions,
        })
    }, [authElementId])
}

export function useCurrentUser() {
    const [user, setUser] = useState<Document<User> | null>(null)

    useEffect(() => {
        auth.onAuthStateChanged(async (fbUser) => {
            if (fbUser) {
                const token = await fbUser.getIdTokenResult(true)
                const user: Document<User> = {
                    id: fbUser.uid,
                    data: {
                        displayName: fbUser.displayName,
                        email: fbUser.email,
                        // isAdmin: token.claims.admin
                        isAdmin: fbUser.uid === "MHzd4g8yKEXXzUVPSqKv5xEFOB03",
                    },
                }
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    return user
}

export async function signOut() {
    await auth.signOut()
}
