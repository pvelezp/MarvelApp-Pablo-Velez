import React, {useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import{useHistory }from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import { AuthContext } from './../../auth/authContext';
import { auth} from '../../firebase'
import './NavBar.scss'
import { types } from './../../types/types';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBar = () => {
    
    const {user,dispatch} = useContext(AuthContext)

    const history = useHistory()

    const LogOut = () => {
        auth.signOut()
        .then(result => {     
           dispatch({
               type: types.LOGOUT,
               user: {
                   displayName: null
               }
           }) })
           .catch(error => alert(error.message))}

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
            <span 
            style={{display:'flex'}}
            className="nav-item nav-link text-info">
                {user? <small className="navbar__logged">
                    {user?.user.displayName}
                    
                </small> : <p>Log in</p>}
                {user.user.displayName !== null ? <ExitToAppIcon 
                style={{cursor:'pointer'}}
                onClick={LogOut} />
                    : null}
            </span>
            
           <IconButton
           
           onClick={() => history.push('/login')}
           >
           <PersonIcon
           className="navbar__favoritesButton"
           />
           </IconButton>

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
