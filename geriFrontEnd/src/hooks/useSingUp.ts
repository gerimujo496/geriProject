import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/userAuthentication";

import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth";

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (newUser, variables) => {
      navigate("/signin");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useSignUp;
