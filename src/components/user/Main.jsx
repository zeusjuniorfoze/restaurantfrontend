import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Main(){

    useEffect(() => {
        AOS.init({
          duration: 1200, // Durée des animations en millisecondes
          once: true,     // L'animation ne se déclenche qu'une fois
        });
        console.log("AOS initialized");
      }, []);
      
    return(

        <main className="main">
             
                <section id="hero" className="hero section dark-background">

                <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />

                <div class="container">
                    <div className="row">
                    <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
                        <h2 data-aos="fade-up" data-aos-delay="100">Bienvenue au <span>RestaurantPS</span></h2>
                        <p data-aos="fade-up" data-aos-delay="200">Donne du bon depuis 18 ans!</p>
                        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                        <Link to='/menus' className="cta-btn">Menu</Link>
                        <Link to='/reservations' className="cta-btn">Reserver une Table</Link>
                        </div>
                    </div>
                    
                    </div>
                </div>

                </section>

                
                <section id="about" className="about section">

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">
                    <div className="col-lg-6 order-1 order-lg-2">
                        <img src="assets/img/about.jpg" className="img-fluid about-img" alt="" />
                    </div>
                    <div className="col-lg-6 order-2 order-lg-1 content">
                        <h3>Voluptatem dignissimos provident</h3>
                        <p className="fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                        </p>
                        <ul>
                        <li><i className="bi bi-check2-all"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
                        </ul>
                        <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident
                        </p>
                    </div>
                    </div>

                </div>

                </section>



                


            </main>


    );


}

export default Main;