import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';

function Main(){
    const { t } = useTranslation();

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

                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
                        <h2 data-aos="fade-up" data-aos-delay="100">{t('hero.welcome')}<span>RestaurantPS</span></h2>
                        <p data-aos="fade-up" data-aos-delay="200">{t('hero.slogan')}</p>
                        <div className="d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                        <Link to='/menus' className="cta-btn">{t('menus')}</Link>
                        <Link to='/reservations' className="cta-btn">{t('reserver_table')}</Link>
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
                        <h3>{t('about.title')}</h3>
                        <p className="fst-italic">
                            {t('about.intro')}
                        </p>
                        <ul>
                        <li><i className="bi bi-check2-all"></i> <span>{t('about.commitments.item1')}</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>{t('about.commitments.item2')}</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>{t('about.commitments.item3')}</span></li>
                        </ul>
                        <p>
                        {t('about.details')}
                        </p>
                    </div>
                    </div>

                </div>

                </section>


                <section id="why-us" className="why-us section">

                
                <div className="container section-title" data-aos="fade-up">
                    <h2>{t('why_us.title')}</h2>
                    <p>{t('why_us.subtitle')}</p>
                </div>

                <div className="container">

                    <div className="row gy-4">

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="card-item">
                        <span>01</span>
                        <h4><a href="" className="stretched-link">{t('why_us.reasons.reason1.title')}</a></h4>
                        <p>{t('why_us.reasons.reason1.description')}</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="card-item">
                        <span>02</span>
                        <h4><a href="" className="stretched-link">{t('why_us.reasons.reason3.title')}</a></h4>
                        <p>{t('why_us.reasons.reason3.description')}</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="card-item">
                        <span>03</span>
                        <h4><a href="" className="stretched-link">{t('why_us.reasons.reason3.title')}</a></h4>
                        <p>{t('why_us.reasons.reason3.description')}</p>
                        </div>
                    </div>

                    </div>

                </div>

            </section>

                
            <section id="gallery" className="gallery section">

                
                <div className="container section-title" data-aos="fade-up">
                <h2>{t('gallery.title')}</h2>
                <p>{t('gallery.description')}</p>
                </div>

                <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">

                <div className="row g-0">

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-1.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-1.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-2.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-2.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-3.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-3.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-4.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-4.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-5.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-5.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-6.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-6.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-7.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-7.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                    <div className="col-lg-3 col-md-4">
                    <div className="gallery-item">
                        <a href="assets/img/gallery/gallery-8.jpg" className="glightbox" data-gallery="images-gallery">
                        <img src="assets/img/gallery/gallery-8.jpg" alt="" className="img-fluid" />
                        </a>
                    </div>
                    </div>

                </div>

                </div>

                </section>




    </main>


    );


}

export default Main;