import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa'; // FontAwesome icons for moon and sun

export class NavBar extends Component {
  render() {
    const { theme, toggleTheme } = this.props;

    return (
      <div>
        <nav className={`navbar navbar-expand-lg navbar-${theme === 'light' ? 'light' : 'dark'} bg-${theme === 'light' ? 'light' : 'dark'} custom-navbar fixed-top`}>
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">NewsMonkey</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/general">General</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/business">Business</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/entertainment">Entertainment</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/health">Health</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/science">Science</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/sports">Sports</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/technology">Technology</NavLink>
                </li>

                {/* Theme Dropdown */}
                <li className="nav-item dropdown d-flex justify-content-center w-100">
                  <button
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Theme
                  </button>
                  <ul className={`dropdown-menu bg-${theme === 'light' ? 'light' : 'dark'}`} aria-labelledby="navbarDropdown">
                    <li>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={theme === 'dark'}
                          onChange={toggleTheme}
                          aria-label={theme === 'light' ? 'dark' : 'light'}
                        />
                        <label className={`form-check-label text-${theme === 'light' ? 'dark' : 'white'}`} htmlFor="flexSwitchCheckDefault">
                          {theme === 'light' ? <FaMoon /> : <FaSun />} {theme === 'light' ? 'Night' : 'Day'}
                        </label>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div >
        </nav >
      </div >
    );
  }
}

export default NavBar;
