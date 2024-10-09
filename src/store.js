import { createStore, combineReducers } from 'redux';

// Import des réducteurs
import authReducer from './reducers/authReducer';

// Combinaison des réducteurs (s'il y en a plusieurs)
const rootReducer = combineReducers({
  auth: authReducer,
  // Ajoute d'autres réducteurs ici si nécessaire
});

// Création du store Redux avec le rootReducer
const store = createStore(rootReducer);

export default store;
