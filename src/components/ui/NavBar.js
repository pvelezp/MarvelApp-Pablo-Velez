import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import{useHistory }from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {

    const history = useHistory()
    return (
        <nav className="navbar navbar-expand-sm navbar-dark sticky-top">
          <div className="navbar__top">
          <Link
            className="navbar-brand"
            to='/'
            >
            <h1
            className="navbar__brandTitle"
            >Marvel <strong>Universe</strong>   </h1>
            </Link>
            
           <div className="navbar__favoritesIcon">
           <IconButton
           
           onClick={() => history.push('/favorites')}
           >
           <FavoriteIcon
           className="navbar__favoritesButton"
           />
           </IconButton>
           </div>

          </div>
            <div className="navbar-collapse">
                <ul className="navbar-nav  ">
                    <li className="nav-item pr-5 ml-5">
                    <NavLink
                activeClassName="active"
                className="nav-item nav-link "
              
                to='/characters'>Characters
                </NavLink>
                    </li >
                    <li className="nav-item pr-5 ml-5">
                <NavLink
                 activeClassName="active"
                 className="nav-item nav-link"
                to='/comics'>Comics
                </NavLink>
                    </li>
                    <li className="nav-item pr-5 ml-5">
                <NavLink 
                 activeClassName="active"
                 className="nav-item nav-link"
                to='/stories'>Stories</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
