import React from "react";
import Menu from "../../components/user/Menu";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";



function Menus(){

    return(
        <>
        <Header />
        <main className="main">

    
            <div className="page-title position-relative" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.webp)' }}>
  
            <div className="container position-relative">
                <h1>MENUS <br /></h1>
                <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
                <nav className="breadcrumbs">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li className="current">Menus</li>
                </ol>
                </nav>
            </div>
            </div>
            
            <Menu />

         </main>
         <Footer />

        </>

    );
}

export default Menus;