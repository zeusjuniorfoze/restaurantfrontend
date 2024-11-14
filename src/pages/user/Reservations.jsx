import React from "react";
import {Link} from 'react-router-dom';
import Reservation from "../../components/user/Reservation";
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import { useTranslation } from 'react-i18next';



function Reservations(){
    const { t } = useTranslation();

    return(
        <>
        <Header />
        <main className="main">

    
            <div className="page-title position-relative" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.webp)' }}>

            <div className="container position-relative">
                <h1>{t('reservations')} <br /></h1>
                <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
                <nav className="breadcrumbs">
                <ol>
                    <li><Link to='/' >{t('accueil')}</Link></li>
                    <li className="current">{t('reservations')}</li>
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