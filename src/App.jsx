import { createHashRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./Layout/AppLayout";
import ErrorPage from "./Layout/ErrorPage";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
