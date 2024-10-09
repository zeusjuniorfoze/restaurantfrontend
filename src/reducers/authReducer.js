// reducers/authReducer.js
const initialState = {
    isAdminRoute: false,  // État initial, par défaut pas de route admin active
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_ADMIN_ROUTE':
        return {
          ...state,
          isAdminRoute: action.payload,  // On met à jour l'état selon la route active
        };
      default:
        return state;
    }
  }
  
  export default authReducer;
  