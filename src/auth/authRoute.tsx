import { Document, User } from "models"
import * as React from "react"
import { Route, RouteProps } from "react-router"

export interface AuthRouteProperties extends RouteProps {
    readonly user: Document<User> | null
}

export const AuthRoute: React.FC<AuthRouteProperties> = (props) => {
    return props.user ? <Route {...props} /> : null
}
AuthRoute.whyDidYouRender = true
