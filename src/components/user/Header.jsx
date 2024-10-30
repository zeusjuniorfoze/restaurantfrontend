import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(prev => !prev);
  };

  // Ajoute ou retire la classe du body en fonction de l'état du menu
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
    
    // Cleanup : retire la classe lorsque le composant est démonté
    return () => {
      document.body.classList.remove('mobile-nav-active');
    };
  }, [isMobileNavOpen]);

  return (
    <header id="header" className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a to="mailto:contact@example.com">contact@example.com</a>
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

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
            <img src="assets/img/logo.png" alt="Logo" />
            <h1 className="sitename">RestaurantPS</h1>
          </a>

          <nav id="navmenu" className={`navmenu ${isMobileNavOpen ? 'mobile-nav-active' : ''}`}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menus">Menus</Link></li>
            </ul>
          </nav>

          <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={toggleMobileNav}></i>

          <Link to="/reservations" className="btn-book-a-table d-none d-xl-block">
            Reserver une table
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
