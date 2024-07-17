import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
import axios from 'axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  is2FAPassed: false,
  user: {}
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      const is2FA = window.localStorage.getItem('handle2FA');
      if (is2FA && state.isAuthenticated) {
        state.is2FAPassed = is2FA;
      } else {
        state.is2FAPassed = false;
      }
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // UPDATE
    profileUpdateSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.is2FAPassed = false;
    },

    // 2FA
    handle2FASuccess(state) {
      state.is2FAPassed = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/setup/signin/email`,
      {
        email: email,
        password: password
      }
    );
    const accessToken = response.data.token;
    setSession(accessToken);

    const user = {
      id: response.data.user.id,
      fullName: response.data.user.full_name,
      nick_name: response.data.user.nick_name,
      email: response.data.user.email,
      walletAddress: response.data.user.walletAddress,
      role: response.data.user.role,
      photoURL:
        `${process.env.REACT_APP_API_URL}/` + response.data.user.avartar,
      country: response.data.user.country,
      inneraddress: response.data.user.innerwalletaddress,
      innerprivatekey: response.data.user.innerprivatekey,
      twoFAEmail: response.data.user.twoFAEmail
    };
    dispatch(slice.actions.loginSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function register({ name, email, password }) {
  return async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/setup/signup/email`, {
      name,
      email,
      password,
      role: 3
    });
  };
}

export function resetPassword({ email, newPassword }) {
  return async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/setup/forgotpassword`,
      {
        email: email,
        newPassword: newPassword
      }
    );
    const accessToken = response.data.token;
    setSession(accessToken);

    const user = {
      id: response.data.user.id,
      fullName: response.data.user.full_name,
      nick_name: response.data.user.nick_name,
      email: response.data.user.email,
      walletAddress: response.data.user.walletAddress,
      role: response.data.user.role,
      photoURL:
        `${process.env.REACT_APP_API_URL}/` + response.data.user.avartar,
      country: response.data.user.country,
      inneraddress: response.data.user.innerwalletaddress,
      innerprivatekey: response.data.user.innerprivatekey,
      twoFAEmail: response.data.user.twoFAEmail
    };

    dispatch(slice.actions.loginSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function profileUpdate({
  fullName,
  nickName,
  email,
  walletAddress,
  country,
  photoURL,
  twoFAEmail
}) {
  return async (dispatch) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/setup/updateprofile`,
      {
        fullName,
        nickName,
        email,
        walletAddress,
        country,
        photoURL,
        twoFAEmail
      },
      {
        headers: { Authorization: accessToken }
      }
    );

    const { token, user } = response.data;

    const authUser = {
      id: user.id,
      fullName: user.full_name,
      nickName: user.nick_name,
      email: user.email,
      role: user.role,
      photoURL: `${process.env.REACT_APP_API_URL}/` + user.avartar,
      walletAddress: user.walletAddress,
      country: user.country,
      twoFAEmail: user.twoFAEmail
    };

    setSession(null);
    setSession(token);

    dispatch(slice.actions.profileUpdateSuccess({ user: authUser }));
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
    localStorage.removeItem('handle2FA');
  };
}

// ----------------------------------------------------------------------

export function handle2FA() {
  return async (dispatch) => {
    dispatch(slice.actions.handle2FASuccess());
    localStorage.setItem('handle2FA', true);
  };
}
// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get('/api/account/my-account');
        const decoded = jwtDecode(accessToken);

        const user = {
          id: decoded.sub.id,
          fullName: decoded.sub.full_name,
          nickName: decoded.sub.nick_name,
          email: decoded.sub.email,
          walletAddress: decoded.sub.walletAddress,
          role: decoded.sub.role,
          photoURL: `${process.env.REACT_APP_API_URL}/` + decoded.sub.avartar,
          country: decoded.sub.country,
          inneraddress: decoded.sub.innerwalletaddress,
          innerprivatekey: decoded.sub.innerprivatekey,
          twoFAEmail: decoded.sub.twoFAEmail
        };

        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: user
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
