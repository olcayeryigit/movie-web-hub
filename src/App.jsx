import AppRouter from "./router";
import StoreContext from "./store";
import { useEffect, useMemo, useState } from "react";
import { getAllUSer } from "./helper/api";
import data from "./data/omdb-movies-brief.json";
import { allMovies } from "./helper/data";
import SignUpForm from "./components/pages/signUp/signUpForm";

function App() {
  //console.log(data);

  const [registeredUser, setRegisteredUser] = useState(null);
  const [signUpUserName, setSignUpUserName] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [isWentRegistrationPage, setIsWentRegistrationPage] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [usersWereRetrieved, setUsersWereRetrieved] = useState(false);
  const [isFaultyOperation, setIsFaultyOperation] = useState(false);
  const [isWentLoginPage, setIsWentLoginPage] = useState(false);
  const [isNeedInHeader, setIsNeedInHeader] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState(null);
  const [userFilms, setUserFilms] = useState(null);
  const [update, setUpdate] = useState(false);
  const [likeMovies, setLikeMovies] = useState([]);
  //
  const [likes, setLikes] = useState([]);

  //
  const [submittedText, setSubmittedText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchShow, setSearchShow] = useState([""]);

  //
  const [willWatchMovies, setWillWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  //
  const [update2, setUpdate2] = useState(false);
  //
  const [isTimeout, setIsTimeOut] = useState(false);
  const [registeredUserLogin, setRegisteredUserLogin] = useState(null);

  let sessionData = JSON.parse(localStorage.getItem("sessionData"));
//useMemo ile hafızaya alma
  const dataMovies = useMemo(() => allMovies(data), [data]);
  //console.log(dataMovies);
  useEffect(() => {
    setMovies(dataMovies);
  }, []);

  //

  //
  useEffect(() => {
    const fetchingUsersOperation = async () => {
      try {
        const users = await getAllUSer();
        // console.log(users);
        setCurrentUsers(users);
      } catch (error) {
        // "kullanicilar getirilemedi"
        // console.log("Users could not be retrieved.");
        setIsFaultyOperation(true);
      }

      if (!isFaultyOperation) {
        setUsersWereRetrieved(true);
      }
    };

    fetchingUsersOperation();
  }, [isWentRegistrationPage,
    isWentLoginPage,
    isNeedInHeader,
    update,
    update2,
    signUpUserName,]);

  useEffect(() => {
    if (signUpUserName && currentUsers) {
      console.log(signUpUserName);
      console.log(currentUsers);
      const registeredCurrentUser = currentUsers.filter(
        (item) => item.userName == signUpUserName
      );
      setRegisteredUserLogin(registeredCurrentUser);
    }
  }, [currentUsers, signUpUserName]);

  // console.log(sessionData);

  useEffect(() => {
    if (registeredUserLogin && registeredUserLogin.length > 0) {
      const user = registeredUserLogin[0];
      const sessionDt = {
        userN: user.userName,
        password: user.password,
        id: user.id,
        loginTime: Date.now(), // Oturum başlangıç zamanını saklayın
      };

      localStorage.setItem("sessionData", JSON.stringify(sessionDt));
      console.log(sessionDt);
    }
  }, [registeredUserLogin]);

  useEffect(() => {
    sessionData = JSON.parse(localStorage.getItem("sessionData"));

    if (sessionData != null) {
      currentUsers.map((item) => {
        if (item.id == sessionData.id) {
          //  console.log(item);
          setCurrentUser(item);
        }
      });
    }
    //   console.log(currentUser);
  }, [currentUsers, signUpUserName, registeredUserLogin]);

  useEffect(() => {
    let userMov = movies;
    if (userMov) {
      userMov.map((movie) => {
        movie["className"] = "text-light";
      });
    }
    //console.log(userMov);
    if (currentUser && userMov && currentUser.favoriteFilms) {
      //   console.log(userMov);
      userMov.map((mov) => {
        currentUser.favoriteFilms.map((lf) => {
          if (mov.id == lf) {
            //     console.log(lf);
            mov["className"] = "text-danger";
          }
        });
      });
      //  console.log(userMov);
      setUserFilms(userMov);
    }
  }, [currentUser,registeredUserLogin]);

  //begendigim filmler

  //
  useEffect(() => {
    if (currentUser && currentUser.favoriteFilms) {
      let favMov = movies.filter((movie) =>
        currentUser.favoriteFilms.includes(movie.id)
      );
      setLikeMovies(favMov);
    }
  }, [currentUser, movies]);
  //

  return (
    <StoreContext.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        isWentRegistrationPage,
        setIsWentRegistrationPage,
        currentUsers,
        setCurrentUsers,
        usersWereRetrieved,
        setUsersWereRetrieved,
        isWentLoginPage,
        setIsWentLoginPage,
        loggedInUser,
        setLoggedInUser,
        isNeedInHeader,
        setIsNeedInHeader,
        currentUser,
        setCurrentUser,
        movies,
        setMovies,
        userFilms,
        setUserFilms,
        update,
        setUpdate,
        likeMovies,
        setLikeMovies,
        likes,
        setLikes,
        submittedText,
        setSubmittedText,
        searchText,
        setSearchText,
        searchShow,
        setSearchShow,
        willWatchMovies,
        setWillWatchMovies,
        watchedMovies,
        setWatchedMovies,
        update2,
        setUpdate2,
        isTimeout,
        setIsTimeOut,
        signUpUserName,
        setSignUpUserName,
      }}
    >
      <AppRouter />
    </StoreContext.Provider>
  );
}

export default App;
