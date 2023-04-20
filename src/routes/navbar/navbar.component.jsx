import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import "./navbar.styles.scss";

const Navbar = ({ user, handleLogout }) => {
  const userId = user?.uid;
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick = () => {
    setMenuOpened(!menuOpened);
  };

  const getScreenSize = () => {
    const screenSize = window.innerWidth;
    return screenSize;
  };

  const handleMenuItemClick = () => {
    getScreenSize() < 731 && handleClick();
    document.getElementById("menuTogglerCheckboc").checked = false;
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <a href="https://moqadi.com" target="_blank" rel="noreferrer">
          <img src={Logo} width="52px" height="50px" alt="logo" />
          <div className="blog-nav-text">
            <span>Go To</span>
            <br />
            <span>Author</span>
          </div>
        </a>
      </div>
      <ul
        className={
          menuOpened ? "routes-container menu-opened" : "routes-container"
        }
      >
        <li onClick={handleMenuItemClick}>
          <NavLink to="/" className="nav-link">
            <span className="navlink-name">Home</span>
          </NavLink>
        </li>

        {userId && (
          <li onClick={handleMenuItemClick}>
            <NavLink to="/create" className="nav-link">
              <span className="navlink-name">Create</span>
            </NavLink>
          </li>
        )}

        {!userId && (
          <li onClick={handleMenuItemClick}>
            <NavLink to="/auth" className="nav-link">
              <span className="navlink-name">Login</span>
            </NavLink>
          </li>
        )}
      </ul>

      {userId && (
        <div className="user-area">
          <div className="profile-logo">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              width="50px"
              height="50px"
            />
          </div>
          <div className="logged-user">
            <p className="welcome-user">
              Hello,&nbsp;
              <span className="username">
                {user && user.displayName
                  ? user.displayName.split(" ").slice(0, 1)
                  : "user"}
              </span>
            </p>
            <span className="logout-user-btn" onClick={handleLogout}>
              Logout
            </span>
          </div>
        </div>
      )}
      <div className="hamburger-menu-toggler">
        <label className="hamburger">
          <input
            id="menuTogglerCheckboc"
            type="checkbox"
            onClick={handleClick}
          />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
