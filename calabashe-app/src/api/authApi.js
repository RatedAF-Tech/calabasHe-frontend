import axios from 'axios';
import { getCookie } from '../utils/cookies';

const SIGNUP_URL = 'https://api.calabashe.com/api/auth/signup/';
const VERIFY_URL = 'https://api.calabashe.com/api/auth/verify-code/';
const FORGOT_PASSWORD_URL = 'https://api.calabashe.com/api/auth/forget-password/';
const RESET_PASSWORD_URL = 'https://api.calabashe.com/api/auth/reset-password/';
const LOGIN_URL = 'https://api.calabashe.com/api/auth/login/';
const CLAIMS_URL = 'https://api.calabashe.com/api/forms/';
const GOOGLE_LOGIN_URL = 'https://api.calabashe.com/api/auth/google/';
const CHANGE_PASSWORD = 'https://api.calabashe.com/api/auth/change-password/'


export const signUp = async ({ email, username, password, password2 }) => {
  try {
    const response = await axios.post(SIGNUP_URL, {
      email,
      username,
      password,
      password2,
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const logIn = async ({ email, password }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(LOGIN_URL, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.status === 400) {
      throw new Error("Invalid Credentials")
    }
    else if (error.response && error.response.data) {
      throw error.response.data;
    }

    else {
      throw new Error('An unexpected error occurred');
    }
  }

};

export const verifyCode = async ({ email, verification_code }) => {
  try {
    const response = await axios.post(VERIFY_URL, {
      email,
      verification_code,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const authenticateUser = async (accessToken) => {
  try {
    const res = await axios.post(GOOGLE_LOGIN_URL, {
      access_token: accessToken,
    });
    // console.log("User authenticated", res.data);
    return res.data;
  } catch (error) {
    console.error("Authentication failed", error);
    throw error;
  }
};

export const accountClaims = async ({ first_name, last_name, phone, specialty, form_email }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(CLAIMS_URL, {
      first_name,
      last_name,
      specialty,
      phone,
      form_email
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

};


export const forgotPassword = async ({ email }) => {
  try {
    const response = await axios.post(FORGOT_PASSWORD_URL, {
      email
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const resetPassword = async ({ token, code, password }) => {
  try {
    const response = await axios.post(RESET_PASSWORD_URL, {
      token,
      code,
      password
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const changePassword = async (old_password, new_password) => {
  const access = getCookie('accessToken');
  try {
    const response = await axios.post(CHANGE_PASSWORD, {
      new_password: new_password,
      old_password: old_password
    }, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    }
    )
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      if (error.status === 400) {
        throw new Error("Invalid Credentials");
      }
      const firstError = Object.keys(error.response.data)[0];
      throw new Error(error.response.data[firstError]?.[0] || "An error occurred");
    }
    throw new Error("An unexpected error occurred");
  }
}