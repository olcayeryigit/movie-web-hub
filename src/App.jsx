import AppRouter from "./router";
import StoreContext from "./store";
import { useEffect, useState } from "react";
import { getAllUSer} from "./helper/api";
import data from "./data/omdb-movies-brief.json";
import { allMovies } from "./helper/data";

function App() {
  //console.log(data);

  const [registeredUser, setRegisteredUser] = useState(null);
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
  const [IsTimeout, setIsTimeOut] = useState(false);

  const sessionData = JSON.parse(localStorage.getItem("sessionData"));

  const dataMovies = allMovies(data);
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
  }, [
    isWentRegistrationPage,
    isWentLoginPage,
    isNeedInHeader,
    update,
    update2,
  ]);

  // console.log(sessionData);

  useEffect(() => {
    if (sessionData != null) {
      currentUsers.map((item) => {
        if (item.id == sessionData.id) {
          //  console.log(item);
          setCurrentUser(item);
        }
      });
    }
    //   console.log(currentUsers);
  }, [currentUsers]);

  useEffect(() => {
    
    let userMov = movies;
    if (userMov) {
      userMov.map((movie) => {
        movie["className"] = "text-light";
      });
    }
    //console.log(userMov);
    if (currentUser && userMov&&currentUser.favoriteFilms) {
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
  }, [currentUser]);

  //begendigim filmler

  //
  useEffect(() => {
    if (currentUser&&currentUser.favoriteFilms) {
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
        IsTimeout,
        setIsTimeOut,
      }}
    >
      <AppRouter />
    </StoreContext.Provider>
  );
}

export default App;
