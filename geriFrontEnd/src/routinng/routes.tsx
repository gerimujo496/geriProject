import { createBrowserRouter } from "react-router-dom";
import { Route } from "./paths";
import SignIn from "../pages/SignIn/SignIn";
import { Dashaboard } from "../pages/Dashaboard/Dashaboard";
import PrivateRoutes from "../pages/PrivateRoutes";
import { SignUp } from "../pages/SignUp/SignUp";

const router = createBrowserRouter([
  { path: Route.SIGNIN, element: <SignIn /> },
  { path: Route.SIGNUP, element: <SignUp /> },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: Route.DASHABOARD,
        element: <Dashaboard />,
      },
    ],
  },
]);

export default router;
