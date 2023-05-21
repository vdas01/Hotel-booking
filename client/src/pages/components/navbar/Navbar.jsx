import React, { useContext } from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    
  const {user} = useContext(AuthContext);

  return (
    <div className="navbar">
       <div className="navContainer">
       <Link to="/" style={{textDecoration:"none",color:"inherit",fontWeight:"bold"}}>
          <span className="logo">Hotelbooking</span>
        </Link>
          {user? 
               <div className="user">
                     <FontAwesomeIcon icon={faUser} id='icon'/>
                     <span id='username'>{user.username}</span>
               </div>
            : <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
          </div>
         } 
       </div>
    </div>
  )
}

export default Navbar