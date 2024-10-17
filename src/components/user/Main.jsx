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

                <div className="container">
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
                        <h3>Nos Engagements pour Vous Satisfaire</h3>
                        <p className="fst-italic">
                        Chez RestaurantPS, nous croyons que chaque repas doit être une expérience inoubliable. Nos chefs passionnés préparent des plats savoureux en utilisant uniquement des ingrédients frais et de saison, soigneusement sélectionnés pour vous offrir le meilleur. Que vous soyez amateur de cuisine traditionnelle ou en quête de nouvelles saveurs, notre menu varié saura ravir vos papilles.
                        </p>
                        <ul>
                        <li><i className="bi bi-check2-all"></i> <span>Ingrédients frais et locaux.</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>Une cuisine authentique et créative.</span></li>
                        <li><i className="bi bi-check2-all"></i> <span>Réservation facile et commande en ligne.</span></li>
                        </ul>
                        <p>
                        Dans une ambiance conviviale et chaleureuse, nous mettons un point d'honneur à offrir un service attentionné et personnalisé, afin que chaque visite soit un véritable moment de plaisir. Que vous veniez en famille, entre amis ou pour un dîner romantique, notre équipe se fera un plaisir de vous accueillir.
                        </p>
                    </div>
                    </div>

                </div>

                </section>


                <section id="why-us" className="why-us section">

                
                <div className="container section-title" data-aos="fade-up">
                    <h2>votre choix</h2>
                    <p>Pourquoi choisir notre restaurant ?</p>
                </div>

                <div className="container">

                    <div className="row gy-4">

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="card-item">
                        <span>01</span>
                        <h4><a href="" className="stretched-link">L'expérience culinaire par excellence</a></h4>
                        <p>chaque plat raconte une histoire. Nous allions avec soin des saveurs authentiques et des techniques modernes pour vous offrir une cuisine raffinée et créative.</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                        <div className="card-item">
                        <span>02</span>
                        <h4><a href="" className="stretched-link">Des saveurs qui inspirent</a></h4>
                        <p>c’est opter pour une cuisine pleine de passion, de créativité et de respect des produits. Notre engagement est simple : vous offrir une carte composée de plats maison, préparés avec des ingrédients locaux et de première qualité.</p>
                        </div>
                    </div>

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                        <div className="card-item">
                        <span>03</span>
                        <h4><a href="" className="stretched-link">Une aventure gastronomique unique              </a></h4>
                        <p>Parce que nous offrons bien plus qu'un repas, nous vous offrons une aventure gastronomique. </p>
                        </div>
                    </div>

                    </div>

                </div>

            </section>

                
            <section id="gallery" className="gallery section">

                
                <div className="container section-title" data-aos="fade-up">
                <h2>Gallery</h2>
                <p>Photo venant du Restaurant</p>
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

                <section id="contact" className="contact section">

    
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Contactez nous</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Location</h3>
                <p>Yaounde, CAMEROUN, Gendamerie national</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Ouvert</h3>
                <p>Lundi-Dimanche:<br />11:00 AM - 23:00 PM</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Appelez nous</h3>
                <p>+237 699 999 999</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email </h3>
                <p>info@example.com</p>
              </div>
            </div>

          </div>

          <div className="col-lg-8">
            <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Entrer votre nom" required />
                </div>

                <div className="col-md-6 ">
                  <input type="email" className="form-control" name="email" placeholder="Entrer votre email" required />
                </div>

                <div className="col-md-12">
                  <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit">Envoyez message</button>
                </div>

              </div>
            </form>
          </div>

        </div>

      </div>

    </section>


    </main>


    );


}

export default Main;