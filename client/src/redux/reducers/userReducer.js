const userData = {
  name: "",
  userName: "",
  age: "",
  isSuper: true,
  enabled: true,
  isLogin: false,
  authToken: ""
};

const userLogin = (payload) => {
  const newState = {
    name: payload.name,
    userName: payload.userName,
    age: payload.age,
    isSuper: payload.isSuper,
    enable: payload.enabled,
    isLogin: true,
    authToken: payload.authToken
  };
  return newState;
};

export const userReducer = (state = userData, action) => {
  switch (action.type) {
    case "Login":
      state = userLogin(action.payload);
      return state;
    default:
      return state;
  }
};
