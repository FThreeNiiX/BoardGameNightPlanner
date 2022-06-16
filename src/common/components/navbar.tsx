import logo from "assets/logo.jpg"
import { Login, Logout } from "auth"
import { GeneratedLink } from "common/components/generatedLink"
import { Routes } from "common/routes"
import { Document, User } from "models"
import React, { useState } from "react"
import usePWA from "react-pwa-install-prompt"

export interface NavbarProperties {
    readonly user: Document<User> | null
}

const Logo: React.FC = () => {
    return (
        <>
            <img src={logo} alt="logo" /> Board Game Night Planner
        </>
    )
}
const NavbarLogo = <Logo />

export const Navbar: React.FC<NavbarProperties> = (props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA()

    const onClickInstall = async () => {
        const didInstall = await promptInstall()
        if (didInstall) {
            // User accepted PWA install
        }
    }

    const renderInstallButton = () => {
        if (!isStandalone)
            return (
                <button className="button is-primary" onClick={onClickInstall}>
                    Install BG-Billy
                </button>
            )
        return null
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <GeneratedLink className="navbar-item" route={Routes.Root}>
                    {NavbarLogo}
                </GeneratedLink>
                {renderInstallButton()}
                <a
                    role="button"
                    className={
                        showMenu
                            ? "navbar-burger burger is-active"
                            : "navbar-burger burger"
                    }
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleShowMenu}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div className={showMenu ? "navbar-menu is-active" : "navbar-menu"}>
                {props.user && (
                    <div className="navbar-start">
                        <GeneratedLink
                            className="navbar-item"
                            route={Routes.Events_MyEvents}
                        >
                            My Events
                        </GeneratedLink>
                        {props.user.data.isAdmin && (
                            <>
                                <GeneratedLink
                                    className="navbar-item"
                                    route={Routes.Events_Edit}
                                    parameters={{ id: undefined }}
                                >
                                    Create Event
                                </GeneratedLink>
                            </>
                        )}
                        <GeneratedLink
                            className="navbar-item"
                            route={Routes.Games_List}
                        >
                            Games
                        </GeneratedLink>
                    </div>
                )}

                <div className="navbar-end">
                    <div className="navbar-item">
                        {props.user ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
        </nav>
    )

    function toggleShowMenu() {
        setShowMenu(!showMenu)
    }
}
Navbar.whyDidYouRender = false
