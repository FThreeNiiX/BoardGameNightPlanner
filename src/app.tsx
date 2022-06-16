import { AuthRoute } from "auth"
import "bulma/css/bulma.css"
import { Navbar } from "common/components/navbar"
import { Routes } from "common/routes"
import { useCurrentUser } from "firebase-hooks/auth"
import { GamesList } from "games"
import { createBrowserHistory } from "history"
import * as React from "react"
import { Router, Switch } from "react-router"
import { EventForm, Events, MyEvents } from "./events" //Have to do this one relative to prevent conflict with events NodeJS module

const history = createBrowserHistory()

export const App: React.FC = () => {
    const user = useCurrentUser()

    return (
        <>
            <Router history={history}>
                <Navbar user={user} />
                <Switch>
                    <AuthRoute
                        path={Routes.Root}
                        exact={true}
                        user={user}
                        render={renderEvents}
                    />
                    <AuthRoute
                        path={Routes.Events_MyEvents}
                        user={user}
                        render={renderMyEvents}
                    />
                    <AuthRoute
                        path={Routes.Events_Edit}
                        user={user}
                        component={EventForm}
                    />
                    <AuthRoute
                        path={Routes.Games_List}
                        user={user}
                        component={renderGamesList}
                    />
                </Switch>
            </Router>
        </>
    )

    function renderMyEvents() {
        return <MyEvents user={user!} />
    }

    function renderEvents() {
        return <Events user={user!} />
    }

    function renderGamesList() {
        return <GamesList user={user} />
    }
}
