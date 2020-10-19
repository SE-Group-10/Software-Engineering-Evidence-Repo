export const signin = (user_information) => {
    return {
      type: "SIGN_IN",
      user_information,
    };
  };
  
  export const signout = () => {
    return {
      type: "SIGN_OUT",
    };
  };