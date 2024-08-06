import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaSearch, FaMoon } from 'react-icons/fa';
import { RiSunFill } from 'react-icons/ri';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import './index.css';
import SearchContext from '../../SearchContext';

const Header = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [homeClick, setHomeClick] = useState(false);

  const navigate = useNavigate();
  const {
    changeSearchInput,
    enterSearchButton,
    clickSearchButton,
    isDark,
    changeTheme,
  } = useContext(SearchContext);

  const clickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const menuList = () => {
    setShowHamburger(prev => !prev);
    setIsSearch(false);
  };

  const showSearchBar = () => {
    setIsSearch(prev => !prev);
    setShowHamburger(prev => !prev);
  };

  const onHomeClick = () => {
    setHomeClick(prev => !prev);
  };

  const searchResult = (event) => {
    changeSearchInput(event.target.value);
  };

  const enterSearch = (event) => {
    if (event.key === 'Enter') {
      enterSearchButton();
    }
  };

  const clickSearchResult = () => {
    clickSearchButton();
  };

  const navHeader = isDark ? 'nav-header nav-head' : 'nav-header';
  const navHeading = isDark ? 'web-heading web-heading2' : 'web-heading';
  const navSearch = isDark ? 'nav-search nav-search2' : 'nav-search';
  const menuIcon = isDark ? 'menu-icon theme' : 'menu-icon';
  const closeIcon = isDark ? 'close-icon theme' : 'close-icon';
  const home = homeClick ? 'search' : 'search text2';

  return (
    <nav className={navHeader}>
      <div className="nav-lg-container">
        <div className="header-logo">
          <Link to="/" className="links">
            <img
              className="website-logo"
              alt="website logo"
              src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
            />
          </Link>
          <h1 className={navHeading}>Insta Share</h1>
        </div>
        <ul className="nav-links-container">
          <li className="nav-link">
            <div className={navSearch}>
              <input
                className="search-input"
                type="search"
                placeholder="Search Caption"
                onChange={searchResult}
                onKeyDown={enterSearch}
              />
              <button
                className="search-button"
                type="button"
                onClick={clickSearchResult}
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
          </li>
          <Link to="/" className="links">
            <li className="nav-link">
              <button
                className={home}
                type="button"
                onClick={onHomeClick}
              >
                Home
              </button>
            </li>
          </Link>
          <Link to="/my-profile" className="links">
            <li className="nav-link">
              <button className="search text2" type="button">
                Profile
              </button>
            </li>
          </Link>
          <li className="nav-link">
            <button
              className="theme-button"
              type="button"
              onClick={changeTheme}
            >
              {isDark ? (
                <RiSunFill className="theme-icon theme" />
              ) : (
                <FaMoon className="theme-icon" />
              )}
            </button>
          </li>
          <li className="nav-link">
            <button
              className="logout-button"
              type="button"
              onClick={clickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="nav-sm-container">
        <div className="menu-header">
          <div className="header-logo">
            <Link to="/" className="links">
              <img
                className="website-logo"
                alt="website logo"
                src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
              />
            </Link>
            <h1 className={navHeading}>Insta Share</h1>
          </div>
          <ul className="nav-links-container nav2">
            <li className="nav-link">
              <button
                className="theme-button"
                type="button"
                onClick={changeTheme}
              >
                {isDark ? (
                  <RiSunFill className="theme-icon theme" />
                ) : (
                  <FaMoon className="theme-icon" />
                )}
              </button>
            </li>
            <li className="nav-link">
              <button
                className="theme-button"
                type="button"
                onClick={menuList}
              >
                <AiOutlineMenu className={menuIcon} />
              </button>
            </li>
          </ul>
        </div>
        {showHamburger && (
          <ul className="nav-links-container1">
            <Link to="/" className="links">
              <li className="nav-link">
                <button
                  className={home}
                  type="button"
                  onClick={onHomeClick}
                >
                  Home
                </button>
              </li>
            </Link>

            <li className="nav-link">
              <button
                className="search text2"
                type="button"
                onClick={showSearchBar}
              >
                Search
              </button>
            </li>
            <Link to="/my-profile" className="links">
              <li className="nav-link">
                <button className="search text2" type="button">
                  Profile
                </button>
              </li>
            </Link>
            <li className="nav-link">
              <button
                className="logout-button"
                type="button"
                onClick={clickLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-link close">
              <button
                className="search"
                type="button"
                onClick={menuList}
              >
                <AiFillCloseCircle className={closeIcon} />
              </button>
            </li>
          </ul>
        )}
        {isSearch && (
          <ul className="nav-links-container">
            <li className={navSearch}>
              <input
                className="search-input"
                type="search"
                placeholder="Search Caption"
                onChange={searchResult}
                onKeyDown={enterSearch}
              />
              <button
                className="search-button"
                type="button"
                onClick={clickSearchResult}
              >
                <FaSearch className="search-icon" />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
