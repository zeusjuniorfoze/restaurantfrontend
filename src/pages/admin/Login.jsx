import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import UsersService from '../../services/usersService';

function Login() {
  const [emailUser, setEmail] = useState('');
  const [passwordUser, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Utilisation de useNavigate pour la redirection

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await UsersService.verifyToken();
        if (response.valid) { 
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Erreur de vérification du token", error);
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      emailUser: emailUser.trim(),
      passwordUser: passwordUser.trim()
    };

    try {
      const response = await UsersService.login(formData);  
      if (response.data.success === true && response.data.role === 'admin') {  
        setMessage('Connexion réussie, redirection vers le dashboard...');

        // Enregistre le token dans le localStorage
        localStorage.setItem('token', response.data.token);
        const userRole = response.data.role;

        // Dispatch l'authentification réussie
        dispatch({ type: 'LOGIN_SUCCESS', payload: { role: userRole } });

        // Redirige vers le dashboard
        navigate('/dashboard');
      } else {
        setMessage('Erreur de connexion : Vérifiez vos informations.');
      }
    } catch (error) {
      setMessage('Erreur lors de la connexion');
    }

    // Réinitialise le formulaire après 3 secondes
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
    <main>
      <div className="">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="">
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
                      <h5 className="card-title text-center pb-0 fs-4">Login</h5>
                      <p className="text-center small">Entrez votre email & mot de passe pour vous connecter</p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation" novalidate>
                      <div className="col-12">
                        <label for="yourUsername" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <input type="text" name="emailUser" className="form-control" id="emailUser" 
                            required onChange={event => setEmail(event.target.value)} />
                          <div className="invalid-feedback">{message}.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="yourPassword" className="form-label">Password</label>
                        <input type="password" name="passwordUser" className="form-control" id="passwordUser" 
                          required onChange={event => setPassword(event.target.value)} />
                        <div className="invalid-feedback">{message}!</div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100">Login</button>
                      </div>
                      <div className="sent-message"><p>{message}</p></div>
                      <div className="col-12">
                        <p className="small mb-0">Connecter vous pour ou <Link to="/">Rentrez à l'accueil</Link></p>
                      </div>
                    </form>

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
