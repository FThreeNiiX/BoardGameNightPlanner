import { signOut } from "firebase-hooks/auth"
import * as React from "react"

export const Logout: React.FC = () => {
    return (
        <div className="buttons">
            <button className="button is-light" type="button" onClick={signOut}>
                Logout
            </button>
        </div>
    )
}
Logout.whyDidYouRender = true
