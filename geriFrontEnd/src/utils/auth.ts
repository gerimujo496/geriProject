import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwtPayload extends JwtPayload {
  email: string;
}

export const getTokenFromLocalStorage = (): ExtendedJwtPayload | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const decoded: ExtendedJwtPayload = jwtDecode(token);

  return decoded;
};

export const isUserAuthenticated = () => {
  const tokenData = getTokenFromLocalStorage();
  if (!tokenData || !tokenData.exp) {
    return false; 
  }
  const { exp: dateInSeconds } = tokenData;
  const currentSeconds = Math.floor(Date.now() / 1000); 

  if (dateInSeconds > currentSeconds) {
    return true; 
  }

  return false; 
};

