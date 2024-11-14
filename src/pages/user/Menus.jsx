import React from "react";
import {Link} from 'react-router-dom';
import Menu from "../../components/user/Menu";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import { useTranslation } from 'react-i18next';



function Menus(){
    const { t } = useTranslation();

    return(
        <>
        <Header />
        <main className="main">

    
            <div className="page-title position-relative" data-aos="fade" style={{ backgroundImage: 'url(assets/img/page-title-bg.webp)' }}>
  
            <div className="container position-relative">
                <h1>{t('menus')} <br /></h1>
                <p>Esse dolorum voluptatum ullam est sint nemo et est ipsa porro placeat quibusdam quia assumenda numquam molestias.</p>
                <nav className="breadcrumbs">
                <ol>
                    <li><Link to='/' >{t('accueil')}</Link></li>
                    <li className="current">{t('menus')}</li>
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