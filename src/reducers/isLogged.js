const userReducer = (
    state = {
      user_information: {},
      isLoggedIn: false,
    },
    action
  ) => {
    let newState = {};
    switch (action.type) {
      // When a user does an action "SIGN_IN", save all the related User States
      case "SIGN_IN":
        newState = {
          ...state,
          user_information: action.user_information,
          isLoggedIn: true,
        };
        return newState;
  
      // When a user does an action "SIGN_OUT", delete all the related User States
      case "SIGN_OUT":
        newState = {
          ...state,
          user_information: {},
          isLoggedIn: false,
        };
        return newState;
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  