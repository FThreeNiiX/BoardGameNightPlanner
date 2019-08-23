import logo from 'assets/logo.jpg';

import React from 'react';
import { GeneratedLink } from 'common/components/generatedLink';
import { Routes } from 'common/routes';
import { useState } from 'react';
import { Document, User } from 'models';
import { Logout } from 'auth/logout';
import { Login } from 'auth/login';

export interface NavbarProperties {
    readonly user: Document<User> | null;
}

export const Navbar: React.FC<NavbarProperties> = (props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <GeneratedLink className="navbar-item" route={Routes.Root}>
                    <img src={logo} alt="logo" /> Board Game Night Planner
                </GeneratedLink>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className={showMenu ? 'navbar-burger burger is-active' : 'navbar-burger burger'} aria-label="menu" aria-expanded="false" onClick={toggleShowMenu}>
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>

            <div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'}>
                {props.user &&
                    <div className="navbar-start">
                        <GeneratedLink className="navbar-item" route={Routes.Root}>Home</GeneratedLink>
                        {props.user.data.isAdmin && <>
                            <GeneratedLink className="navbar-item" route={Routes.Events_Edit}>Events</GeneratedLink>
                            <GeneratedLink className="navbar-item" route={Routes.Games_List}>Games</GeneratedLink>
                        </>}
                    </div>
                }

                <div className="navbar-end">
                    <div className="navbar-item">
                        {props.user ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
        </nav>
    );

    function toggleShowMenu() {
        setShowMenu(!showMenu);
    }
}