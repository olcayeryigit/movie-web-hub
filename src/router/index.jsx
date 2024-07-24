import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import { Alert } from "react-bootstrap";
import Profile from "../components/pages/profile/profile";
import Movies from "../components/pages/movies/movies";
import SignUpForm from "../components/pages/signUp/signUpForm";
import SignInPage from "../components/pages/signIn/signInPage";
import Home from "../components/pages/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
     
      {
        path: "imdb",
        element: <Movies />,
      },

      { path: "popular", element: <Movies /> },
      { path: "upcoming", element: <Movies /> },
      {
        path: "movies",
        element: <Movies />,
        children: [
          {
            path: "search",
           element: <></>
          },
        ],
      },
      {
        path: "registrationsuccessful",
        element: <Alert variant="success" className="mx-auto mt-3" style={{width:"98%"}}>Registration is successful.</Alert>,
      },
      {
        path: "registrationfailed",
        element: <Alert variant="danger" className="mx-auto mt-3" style={{width:"98%"}}>Registration is failed.</Alert>,
      },
      {
        path: "error",
        element: <Alert variant="danger">Error.</Alert>,
      },
    ],
  },
  { path: "sign-form", element: <SignUpForm /> },
  { path: "sign-in", element: <SignInPage /> },

  {
    path: "profile",
    element: <Profile />,

    children: [
      { path: "myfavorites" ,
        element:<></>
      },

      { path: "watched",
        element:<></>

       },
      { path: "towatch" ,
        element:<></>

      },

     { path: "settings" ,
      element:<></>

       
      },
    ],

  }, 
]);

const AppRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
