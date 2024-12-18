import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UsersService from '../../services/usersService';
import { useTranslation } from 'react-i18next';


function Login() {
  const { t } = useTranslation();
  const [emailUser, setEmail] = useState('');
  const [passwordUser, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initialiser à true pour le chargement initial
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await UsersService.verifyToken();
        if (response.valid) { 
          navigate('/dashboard');
        } else {
          setIsLoading(false); // Désactiver le chargement si le token n'est pas valide
        }
      } catch (error) {
        console.error(t('login.messages.loadingTokenError'), error);
        setIsLoading(false); // Désactiver le chargement en cas d'erreur
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Active le chargement pour la soumission

    const formData = {
      emailUser: emailUser.trim(),
      passwordUser: passwordUser.trim()
    };

    try {
      const response = await UsersService.login(formData);  
      if (response.data.success === true && response.data.role === 'admin') {  
        setMessage(t('login.messages.success'));

        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role;

        dispatch({ type: 'LOGIN_SUCCESS', payload: { role: userRole } });
        navigate('/dashboard');
      } else {
        setMessage(t('login.messages.error'));
      }
    } catch (error) {
      setMessage(t('login.messages.loadingError'));
    } finally {
      setIsLoading(false); // Désactive le chargement
    }

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  useEffect(() => {
    dispatch({ type: 'SET_ADMIN_ROUTE', payload: true });

    return () => {
      dispatch({ type: 'SET_ADMIN_ROUTE', payload: false });
    };
  }, [dispatch]);

  return (
    <main id="arriereplan" className="arriereplan">
      <div className="arriereplan" id="arriereplan">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="" id="arriereplan">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div className="d-flex justify-content-center py-4">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="assetsDashboard/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">RestaurantPS</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">{t('login.title')}</h5>
                      <p className="text-center small">{t('login.subtitle')}</p>
                    </div>

                    {isLoading ? ( // Affichage du spinner si isLoading est true
                      <div className="d-flex justify-content-center my-4">
                        <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                        <span className="sr-only">{t('login.loading')}</span>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">{t('login.placeholders.email')}</label>
                          <div className="input-group has-validation">
                            <input type="text" name="emailUser" className="form-control" id="emailUser" 
                              required onChange={event => setEmail(event.target.value)} />
                            <div className="invalid-feedback">{message}.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">{t('login.placeholders.password')}</label>
                          <input type="password" name="passwordUser" className="form-control" id="passwordUser" 
                            required onChange={event => setPassword(event.target.value)} />
                          <div className="invalid-feedback">{message}!</div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? (
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                              t('login.title')
                            )}
                          </button>
                        </div>
                        <div className="sent-message"><p>{message}</p></div>
                        <div className="col-12">
                          <p className="small mb-0"><Link to="/">{t('login.redirect')}</Link></p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                <div className="credits">
                  Designed by <a href="#">Powerks-soft</a>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
