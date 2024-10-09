import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header id="header" className="header fixed-top">
      {/* Topbar section */}
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">contact@example.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+237 699 999 999</span>
            </i>
          </div>
          <div className="languages d-none d-md-flex align-items-center">
            <ul>
              <li>Fr</li>
              <li><a href="#">En</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Branding section */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <img src="assets/img/logo.png" alt="" />
            <h1 className="sitename">RestaurantPS</h1>
          </a>

          {/* Navigation menu */}
          <nav id="navmenu" className={`navmenu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/menus'>Menu</Link></li>
            </ul>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            className="mobile-nav-toggle d-xl-none bi bi-list"
            onClick={toggleMobileMenu}
          ></button>

          {/* Button visible only on large screens */}
          <Link to='/reservations' className="btn-book-a-table d-none d-xl-block">Réserver une Table</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
