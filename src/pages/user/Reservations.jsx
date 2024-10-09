import React from "react";
import Reservation from "../../components/user/Reservation";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";


function Reservations(){

    return(
        <>
        <Header />
        <main className="main">

    
            <div className="page-title position-relative" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.webp)' }}>

            <div className="container position-relative">
                <h1>RESERVATIONS <br /></h1>
                <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
                <nav className="breadcrumbs">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li className="current">Reservations</li>
                </ol>
                </nav>
            </div>
            </div>
            
            <Reservation />

     </main>
    
     <Footer />
     </>

    );
}

export default Reservations;