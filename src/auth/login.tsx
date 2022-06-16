import { useLogin } from "firebase-hooks/auth"
import "firebaseui/dist/firebaseui.css"
import * as React from "react"
import "./login.css"

export const Login: React.FC = () => {
    useLogin("#firebaseui-auth-container")

    return <div id="firebaseui-auth-container" />
}
Login.whyDidYouRender = true
