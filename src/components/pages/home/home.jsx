import { useContext, useEffect } from "react";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
import StoreContext from "../../../store";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const { movies, currentUser } = useContext(StoreContext);
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));

  useEffect(() => {
    //console.log(movies);
  }, [movies]);

  if (movies)
    return (
      <div className="homeContainer ">
        <div className="carouselContainer ">
          <Carousel slide={false} className="carouselSlide text-center m-0 p-0">
            <Carousel.Item className="">
              <Image
                src={movies[0].Poster}
                text="First slide"
                className="carouselImg  "
              />
            </Carousel.Item>
            <Carousel.Item className="">
              <Image
                src={movies[59].Poster}
                text="Second slide"
                className="carouselImg"
              />
            </Carousel.Item>

            <Carousel.Item className="">
              <Image
                src={movies[37].Poster}
                text="Second slide"
                className="carouselImg "
              />
            </Carousel.Item>
          </Carousel>

          {!sessionData && (
            <div className="homeText  text-light d-none d-md-flex ms-md-5 ps-md-5 flex-column gap-3 position-absolute ">
              Discover your favorite movies, add them to your watchlist, and
              share your likes!
              <Button
                variant="outline-light"
                className="rounded-pill"
                as={Link}
                to="sign-form"
              >
                Let's Start
              </Button>
            </div>
          )}
        </div>
      </div>
    );
};

export default Home;
