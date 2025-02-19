import { jwtDecode } from 'jwt-decode';
import { getCookie } from './cookies';

const decodeJwt = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id; 
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return undefined;
  }
};

// Function to fetch the refresh token and get user ID
export const getUserId = () => {
  try {
    const token = getCookie('accessToken');
    if (token) {
      const userId = decodeJwt(token);
      return userId;
    } else {
      // console.log('No refresh token found');
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return undefined;
  }
};

// console.log(getUserId());
