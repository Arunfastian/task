
export const login = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "Login",
      payload: payload,
    });
  };
};
