import React from 'react'
import { Link, NavLink } from 'react-router'

export default function Header() {
  return (
   <nav className="navbar navbar-expand-sm bg-dark " data-bs-theme="dark">
        <div className="container py-1">
            <Link className="navbar-brand" to="/">Localization</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  ms-auto  mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" style={{fontSize:"1.4rem"}} to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link"  to="/history">History</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}