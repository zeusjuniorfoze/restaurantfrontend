import React from "react";


function HeaderAdmin(){

    return(

        <header id="headers" className="headers fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <a href="/dashboard" className="logo d-flex align-items-center">
            <img src="assetsDashboard/img/logo.png" alt="" />
            <span className="d-none d-lg-block">RestaurantAdmin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
    
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
          </form>
        </div>
    
        <nav className="headers-nav ms-auto">
          <div className="d-flex align-items-center">
  
          <span >K. Anderson</span>
          
    
          </div>
        </nav>
    
      </header>

    );

}

export default HeaderAdmin;
