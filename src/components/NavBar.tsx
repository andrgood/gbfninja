import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar(): React.ReactElement {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">gbf.ninja</a>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" activeClassName="active"> Ability search </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Glossary</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Owned</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">History</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar