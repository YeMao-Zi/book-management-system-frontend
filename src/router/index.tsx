import { createBrowserRouter } from "react-router-dom";
import Book from "../views/book";
import Login from "../views/login";
import Register from "../views/register";

const routes = [
  {
    path: "/",
    element: <Book />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

export default router;
