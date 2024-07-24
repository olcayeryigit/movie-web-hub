import { Button, Container, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import StoreContext from "../../../store";
import { useLocation } from "react-router-dom";
import "./movies.scss";
import imdb from "../../../data/imdb-50.json";
import MiniBar from "./miniBar/miniBar";
import MovieCard from "./movieCard/movieCard";
import popular from "../../../data/popular-movies.json";
import upcoming from "../../../data/upcoming.json";
import { CiSquareChevDown } from "react-icons/ci";
import {
  TbSquareChevronDownFilled,
  TbSquareChevronUpFilled,
} from "react-icons/tb";
const Movies = () => {
  const {
    currentUser,
    movies,
    userFilms,
    setUserFilms,
    update,
    searchShow,
    likeMovies,
    willWatchMovies,
    setWillWatchMovies,
    watchedMovies,
    setWatchedMovies,submittedText
  } = useContext(StoreContext);
  const { pathname } = useLocation();
  const[showScroll,setShowScroll]=useState();
  //

  const upScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const downScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  //

const isScroll=()=>{
  if(likeMovies.length>4 && pathname=="/profile/myfavorites"){
    setShowScroll(true);
  }

  else if(willWatchMovies.length>4 &&pathname=="/profile/towatch"){
    setShowScroll(true);
  }
 else if(watchedMovies.length>4 &&pathname=="/profile/watched"){
    setShowScroll(true);
  }
  else if(pathname=="/movies"||pathname=="/popular"||pathname=="/upcoming"||pathname=="/imdb"){
    setShowScroll(true);
  }
  else if(searchShow.length>4&&pathname=="/movies/search"){
    setShowScroll(true);

  }else{
    setShowScroll(false);
  }

}


useEffect(()=>{
isScroll();
},[pathname,searchShow])

  //
  useEffect(() => {
    if (pathname) {
   //   console.log(pathname);
    }
  }, [pathname]);
  //begenilerim
  useEffect(() => {
    if (currentUser && movies && currentUser.favoriteFilms) {
      let updatedMovies = movies.map((movie) => ({
        ...movie,
        className: currentUser.favoriteFilms.includes(movie.id)
          ? "text-danger"
          : "text-light",
      }));
      setUserFilms(updatedMovies);
    }
  }, [currentUser, movies, update, setUserFilms]);
  //izleyeceklerim
  useEffect(() => {
    if (currentUser) {
      let will_Watch_M = movies.filter((movie) =>
        currentUser.watchList.includes(movie.id)
      );
      setWillWatchMovies(will_Watch_M);
    }
   // console.log(willWatchMovies);
  }, [currentUser, movies]);

  //izlediklerim
  useEffect(() => {
    if (currentUser) {
      let watched_M = movies.filter((movie) =>
        currentUser.watchedList.includes(movie.id)
      );

      setWatchedMovies(watched_M);
    }
  //  console.log(watchedMovies);
  }, [currentUser, movies]);




  //console.log(imdb);
  //console.log(popular);
  //console.log(upcoming);
 return (
    <Container className="mb-3">
      {(pathname == "/movies" ||
        pathname == "/imdb" ||
        pathname == "/popular" ||
        pathname == "/upcoming") && <MiniBar />}


      {pathname == "/movies/search" && searchShow.length != 0 ? (
        <div className="text-light py-2 px-4 bg-success mt-3">
           {searchShow.length}  results found for &quot;{submittedText}&quot;
        </div>
      ) : null}
      {pathname == "/movies/search" &&searchShow.length == 0 ? (
        <div className="text-light py-2 px-4 bg-danger mt-3">
        Results not found for  &quot;{submittedText}&quot;
        </div>
      ) : null} 
 


{showScroll&& <div className="scrollTop  bg-none  ">
        <Button variant="dark" className="p-0 m-0" onClick={downScroll}>
          <TbSquareChevronDownFilled className="text-light fs-1" />
        </Button>
      </div>}

      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="cardRow m-0 p-0   
      "
      >



        {userFilms &&
          pathname == "/movies" &&
          userFilms.map((item, index) => <MovieCard key={index} {...item} />)}

        {!userFilms &&
          movies &&
          pathname == "/movies" &&
          movies.map((item, index) => <MovieCard key={index} {...item} />)}

        {pathname == "/profile/myfavorites" &&
          likeMovies &&
          likeMovies.map((item, index) => <MovieCard key={index} {...item} />)}
        {pathname == "/profile/towatch" &&
          willWatchMovies &&
          willWatchMovies.map((item, index) => (
            <MovieCard key={index} {...item} />
          ))}

        {pathname == "/profile/watched" &&
          watchedMovies &&
          watchedMovies.map((item, index) => (
            <MovieCard key={index} {...item} />
          ))}

        {pathname == "/popular" &&
          popular &&
          popular.map((item, index) => <MovieCard key={index} {...item} />)}

        {pathname == "/imdb" &&
          imdb &&
          imdb.map((item, index) => <MovieCard key={index} {...item} />)}

        {pathname == "/upcoming" &&
          upcoming &&
          upcoming.map((item, index) => <MovieCard key={index} {...item} />)}

        {pathname == "/movies/search" &&
          searchShow &&
          searchShow.map((item, index) => <MovieCard key={index} {...item} />)}
      </Row>

    {showScroll&&   <div className="scrollBottom  bg-none">
        <Button variant="dark" className="p-0 m-0" onClick={upScroll}>
          <TbSquareChevronUpFilled className="text-light fs-1" />
        </Button>
      </div>}
    </Container>
  );
};

export default Movies;


