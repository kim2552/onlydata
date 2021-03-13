import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <Link to="/about">
                <div className="menu-item">
                    about
                </div>
            </Link>
        </div>
    )
}

export default Navbar
