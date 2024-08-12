import axios from "axios";
import { UserAuthentication } from "../types/userAuthentication";
import { UserSignUp } from "../types/userSignUp";
import { SuccesfulSingIn } from "../types/SuccesfulSingIn";


export const signIn = async (form: UserAuthentication) => {
  try {
    const response = await axios.post<SuccesfulSingIn>(
      "http://localhost:4000/api/auth/login",
      form
    );
    return response.data;
  } catch (Error) {
    throw (Error as Error).message;
  }
};

export const signUp = async (form: UserSignUp) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/createUser",
      form
    );
    return response.data;
  } catch (Error) {
    throw (Error as Error).message;
  }
};
