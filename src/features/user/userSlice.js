import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    signingUp: false,
    signupError: null,
    loggedIn: false,
    loggingIn: false,
    loggingError: null,
  },
  reducers: {
    signupUserStart(state, action) {
      state.signingUp = true;
      state.loggedIn = false;
    },
    signupUserSuccess(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = null;
    },
    signupUserError(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = action.payload;
    },
    userLoginStart(state, action) {
      state.loggingIn = true;
      state.loggedIn = false;
      state.loggingError = null;
    },
    userLoginSuccess(state, action) {
      state.loggingIn = false;
      state.loggedIn = true;
      state.loggingError = null;
    },
    userLoginError(state, action) {
      state.loggingIn = false;
      state.loggedIn = false;
      state.loggingError = action.payload;
    },
    userLogoutSucces(state, action) {
      state.loggingIn = false;
      state.loggedIn = false;
      state.loggingError = null;
    },
  },
});

export const {
  signupUserError,
  signupUserStart,
  signupUserSuccess,
  userLoginStart,
  userLoginSuccess,
  userLoginError,
  userLogoutSucces,
} = userSlice.actions;

export const signupUser = (user, history) => {
  return async function (dispatch) {
    dispatch(signupUserStart());

    try {
      const response = await api.post("/users", user);

      dispatch(signupUserSuccess());

      // actulizar instancia de axios
      // api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // redireccionar a login
      history.push("/login");
    } catch (error) {
      dispatch(signupUserError(error.response?.data));
    }
  };
};

export const userLogin = ({ username, password }, history) => (dispatch) => {
  dispatch(userLoginStart());

  api.post("/sessions", { username, password }).then(
    (response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(userLoginSuccess());

      // actulizar instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      history.push("/tweets");
    },
    (error) => dispatch(userLoginError(error.response?.data))
  );
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(userLogoutSucces());
};

export default userSlice.reducer;
