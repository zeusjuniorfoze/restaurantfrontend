import React from 'react';

function Header(){

    return(

        <header id="header" className="header fixed-top">

                <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                    <i className="bi bi-envelope d-flex align-items-center"><a href="mailto:contact@example.com">contact@example.com</a></i>
                    <i className="bi bi-phone d-flex align-items-center ms-4"><span>+237 699 999 999</span></i>
                    </div>
                    <div className="languages d-none d-md-flex align-items-center">
                    <ul>
                        <li>Fr</li>
                        <li><a href="#">En</a></li>
                    </ul>
                    </div>
                </div>
                </div>

                <div className="branding d-flex align-items-cente">

                <div className="container position-relative d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
                    
                    <img src="assets/img/logo.png" alt="" />
                    <h1 className="sitename">RestaurantPS</h1>
                    </a>

                    <nav id="navmenu" className="navmenu">
                    <ul>
                        <li><a href="/" >Home<br /></a></li>
                        <li><a href="/menus">Menu</a></li>
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>

                    <a className="btn-book-a-table d-none d-xl-block" href="/reservations">Reserver une Table</a>

                </div>

                </div>

            </header>

    );

}

export default Header;
