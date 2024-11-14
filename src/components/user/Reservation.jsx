import React, { useState } from "react";
import reservationService from "../../services/reservationService";
import { useTranslation } from 'react-i18next';


function Reservation() {
  const { t } = useTranslation();

  const [nomClient, setNom] = useState('');
  const [emailClient, setEmail] = useState('');
  const [numeroClient, setNumero] = useState('');
  const [dateReservation, setDate] = useState('');
  const [heureReservation, setHeure] = useState('');
  const [nombrePlace, setPlace] = useState('');
  const [motifReservation, setMotif] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('nomClient', nomClient);
      formData.append('numeroClient', numeroClient);
      formData.append('emailClient', emailClient);
      formData.append('dateReservation', dateReservation);
      formData.append('heureReservation', heureReservation);
      formData.append('nombrePlace', nombrePlace);
      formData.append('motifReservation', motifReservation);

      const response =  await reservationService.create(formData);
      if(response.data.success == true){
          setMessage(t("reservation.form.messages.successMessage"));
      }else{
          setMessage(t("reservation.form.messages.errorMessage"));
      }

      setTimeout(function(){
          setMessage(' ');
      }, 3000);
      
      event.target.reset();
  };

  
  const today = new Date().toISOString().split("T")[0];

  // Fonction pour générer les options d'heures
  const renderTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 22; hour++) {
      const formattedHour = hour < 10 ? `0${hour}` : hour; 
      options.push(
        <option key={formattedHour} value={`${formattedHour}:00`}>
          {formattedHour}:00
        </option>
      );
    }
    return options;
  };

  return (
    <section id="book-a-table" className="book-a-table section">
      <div className="container section-title" data-aos="fade-up">
        <h2>{t('reservations')}</h2>
        <p>{t('reserver_table')}</p>
      </div>
      <div className="message-info"><p>{message}</p></div>
      
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <form onSubmit={handleSubmit} role="form" className="php-email-form">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <input type="text" name="nomClient" className="form-control" id="name" placeholder={t("reservation.form.placeholders.name")} 
                     required onChange={event => setNom(event.target.value)} />
            </div>
            <div className="col-lg-4 col-md-6">
              <input type="email" className="form-control" name="emailClient" id="email" placeholder={t("reservation.form.placeholders.email")} 
                     required onChange={event => setEmail(event.target.value)} />
            </div>
            <div className="col-lg-4 col-md-6">
              <input type="text" className="form-control" name="numeroClient" id="phone" placeholder={t("reservation.form.placeholders.phone")}
                     required onChange={event => setNumero(event.target.value)} />
            </div>
            <div className="col-lg-4 col-md-6">
              <input type="date" name="dateReservation" className="form-control" id="date" placeholder={t("reservation.form.placeholders.date")}
                     required min={today} onChange={event => setDate(event.target.value)} />
            </div>
            <div className="col-lg-4 col-md-6">
              <select className="form-control" name="heureReservation" id="time" required onChange={event => setHeure(event.target.value)}>
                <option value="" >{t("reservation.form.placeholders.time")}</option>
                {renderTimeOptions()}
              </select>
            </div>
            <div className="col-lg-4 col-md-6">
              <input type="number" className="form-control" name="nombrePlace" id="people" placeholder={t("reservation.form.placeholders.people")} 
                     required onChange={event => setPlace(event.target.value)} />
            </div>
          </div>

          <div className="form-group mt-3">
            <textarea className="form-control" name="motifReservation" rows="5" placeholder={t("reservation.form.placeholders.reason")} 
                      onChange={event => setMotif(event.target.value)}></textarea>
          </div>

          <div className="text-center mt-3">
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message"><p>{message}</p></div>
            <button className="submitbtn">{t('reserver_table')}</button>
          </div>
        </form>
        
       
      </div>
    </section>
  );
}

export default Reservation;
