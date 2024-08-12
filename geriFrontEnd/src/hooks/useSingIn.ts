import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/userAuthentication";
import { useNavigate } from "react-router-dom";


import { signIn } from "../services/auth";
import { Route } from "../routinng/paths";
import { SuccesfulSingIn } from "../types/succesfulSingIn";

const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation<SuccesfulSingIn, Error, UserAuthentication>({
    mutationFn: signIn,
    onSuccess: (newUser, variables) => {
      localStorage.setItem("token", newUser.token);

      navigate(Route.DASHABOARD);

      return newUser;
    },
  });
};

export default useSignIn;
