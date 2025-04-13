
import React, { useContext } from 'react';
import './Navbar.css';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const Navbar = ({ setLoginPopUp, setPasswordPopup }) => {
  const { token, user, logout } = useContext(StoreContext);
  
  return (
    <div className='navbar'>
      <Link to="/">
        <img src="https://i.pinimg.com/564x/a3/2b/19/a32b19c33d4a36e69069493a0353e531.jpg" alt="" />
      </Link>
      <div className='search-signup-container'>
        <div className='search-container'>
          <img src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-search-icon-png-image_4699282.jpg" alt="" />
          <input type="search" placeholder='search..' />
        </div>
        {!token ? (
          <button onClick={() => setLoginPopUp(true)} className='sign-up'>Sign Up</button>
        ) : (
          <div className='profile-container'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIs1XePP0G1O0AQB8x6uxPkXyY_PvXlYWGLTJWZfpios_3gsrcqX_jZz1dkxjgCZjrC-w&usqp=CAU' alt="" />
            <div className='profile-option'>
              {user?.role === 'system_admin' && (
                <li>Admin Panel</li>
              )}
              <ul onClick={() => setPasswordPopup(true)}><li>Change Password</li></ul>
              <hr />
              <ul onClick={logout}><li>Logout</li></ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;