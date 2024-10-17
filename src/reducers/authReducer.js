// reducers/authReducer.js
const initialState = {
  isAdminRoute: false,  // État initial pour la route admin
  isAuthenticated: false, // État initial pour la connexion
  userRole: null, // État initial pour le rôle utilisateur (null ou 'admin')
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ADMIN_ROUTE':
      return {
        ...state,
        isAdminRoute: action.payload,  // Mise à jour de la route admin
      };
      
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true, // L'utilisateur est connecté
        userRole: action.payload.role, // On enregistre le rôle de l'utilisateur (admin ou user)
      };
      
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false, // L'utilisateur est déconnecté
        userRole: null, // Rôle réinitialisé
      };

    default:
      return state;
  }
}

export default authReducer;
