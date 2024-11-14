import React from "react";
import { useTranslation } from 'react-i18next';


function Footer (){
  const { t } = useTranslation();

        return (

            <footer id="footer" className="footer">

                <div className="container footer-top">
                  <div className="row gy-4">
                    <div className="col-lg-4 col-md-6 footer-about">
                      <a href="index.html" className="logo d-flex align-items-center">
                        <span className="sitename">RestaurantPS</span>
                      </a>
                      <div className="footer-contact pt-3">
                        <p>{t('footer.contact.address')}</p>
                        <p>{t('footer.contact.city')}</p>
                        <p className="mt-3"><strong>{t('footer.contact.phone')}</strong> <span>+237 699 999 999</span></p>
                        <p><strong>{t('footer.contact.email')}</strong> <span>info@example.com</span></p>
                      </div>
                      <div className="social-links d-flex mt-4">
                        <a href="#"><i className="bi bi-twitter-x"></i></a>
                        <a href="#"><i className="bi bi-facebook"></i></a>
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-linkedin"></i></a>
                      </div>
                    </div>

                   

                    <div className="col-lg-2 col-md-3 footer-links">
                      
                    </div>

                    

                    <div className="col-lg-4 col-md-12 footer-newsletter">
                     
                    </div>

                    <div className="col-lg-2 col-md-3 footer-links">
                      <h4>{t('footer.services.title')}</h4>
                      <ul>
                        <li><a href="#">{t('footer.services.delivery')}</a></li>
                        <li><a href="#">{t('footer.services.catering')}</a></li>
                        
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="container copyright text-center mt-4">
                  <p><span>{t('footer.copyright.text')}</span> <strong className="px-1 sitename">powerk-soft</strong> <span>{t('footer.copyright.allRights')}</span></p>
                  <div className="credits">
                  
                  {t('footer.credits')} <a href="">Powerk-soft</a>
                  </div>
                </div>

                <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


  </footer>


        );

    }

export default Footer;