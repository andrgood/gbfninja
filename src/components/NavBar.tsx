import React from 'react'
import { Link, NavLink } from 'react-router-dom'


function NavBar(): React.ReactElement {
    return(
        <nav className="navbar" style={{ height: '60px'}} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item"> gbf.ninja </Link>
            </div>
            <NavLink to="/" className="navbar-item" activeClassName="is-active"> Ability search </NavLink>
            <a className="navbar-item" href="#">Glossary</a>
            <a className="navbar-item" href="#">Owned</a>
            <a className="navbar-item" href="#">History</a>
            <a className="navbar-item" href="#">About</a>
        </nav>
    )
}

export default NavBar