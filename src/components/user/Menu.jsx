import React, { useEffect, useState } from "react";
import Isotope from 'isotope-layout';
import menuService from "../../services/menuService";
import { useTranslation } from 'react-i18next';


function Menu(){
  const { t } = useTranslation();

  const [menus, setMenus] = useState({ data: [] }); 

      const fetchMenus = async () => {
        try {
          const response = await menuService.getMenu();
          console.log(response.data); 
          setMenus(response.data); 
        } catch (error) {
          console.error("Erreur lors de la récupération des menus:", error);
        }
      };

      useEffect(() => {
        fetchMenus();
      }, []);
      

      useEffect(() => {
        // Initialisation de Isotope
        const isotope = new Isotope('.isotope-container', {
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows',
        });
    
        // Gestion des filtres
        const filters = document.querySelectorAll('.isotope-filters li');
        const handleFilterClick = function() {
          document.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          const filterValue = this.getAttribute('data-filter');
          isotope.arrange({ filter: filterValue });
        };
    
        filters.forEach(filter => filter.addEventListener('click', handleFilterClick));
        
        return () => {
          filters.forEach(filter => filter.removeEventListener('click', handleFilterClick));
        };
      }, [menus]);   


    return(
        <section id="menu" className="menu section">

     
        <div className="container section-title" data-aos="fade-up">
          <h2>{t('menus')}</h2>
          <p>{t('menu.description')}</p>
        </div>
  
        <div className="container isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
  
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul className="menu-filters isotope-filters">
                <li data-filter="*" className="filter-active">{t('menu.all')}</li>
                {menus != undefined && menus.data.length > 0 && 
                  menus.data.map(menu => (
                    <li key={menu._id} data-filter={'.filter-'+menu.typeplat}>
                      {menu.typeplat}
                    </li>
                  ))
                }
             
              </ul>
            </div>
          </div>
  
          <div className="row isotope-container" data-aos="fade-up" data-aos-delay="200">
  
          {menus && menus.data && menus.data.length > 0 &&
            menus.data.map((menu, menuIndex) => 
              menu.platinfo.map((plat, platIndex) => (
                <div key={`${menuIndex}-${platIndex}`} className={'col-lg-6 menu-item isotope-item filter-'+menu.typeplat}>
                  <img src={plat.imageplat || "assets/img/menu/default-image.jpg"} className="menu-img" alt={plat.nomplat} />
                  <div className="menu-content">
                    <a href="#">{plat.nomplat}</a><span>{plat.prixplat}</span>
                  </div>
                  <div className="menu-ingredients">
                    {plat.descripplat || t('menu.defaultDescription')}
                  </div>
                </div>
              ))
            )
          }

  
          </div>
  
        </div>
  
      </section>

    );
}

export default Menu;