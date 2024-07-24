import { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import StoreContext from "../../../../store";
import { FaHeart } from "react-icons/fa";
import "./movieCard.scss";
import { updateUser } from "../../../../helper/api";
import { useLocation, useNavigate } from "react-router-dom";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { FcOk } from "react-icons/fc";
import { MdOutlineAccessTime } from "react-icons/md";

const MovieCard = ({ id, Title, Year, Poster, RunTime, UpcomingTime }) => {
  const { currentUser, setUpdate } = useContext(StoreContext);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const [likes, setLikes] = useState([]);
  const [isLikeSet, setIsLikeSet] = useState(false);
  //
  const [willWatchId, setWillWatchId] = useState([]);
  const [isWillWatchSet, setIsWillWatchSet] = useState(false);
  //
  const [watchedId, setWatchedId] = useState([]);
  const [isWatchedSet, setIsWatchedSet] = useState(false);
  //
const navigate=useNavigate();
//
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));


//

 const handleClickGoToSignUp = () => { 
  navigate("/sign-form");
 } 
 
 
 
  //Beğenilerim
  useEffect(() => {
    if (currentUser) {
      setLikes(currentUser.favoriteFilms || []);
    }
  }, [currentUser]);
  //
  const handleHeartClick = () => {
    setLikes((prevLikes) => {
      if (prevLikes.includes(id)) {
        return prevLikes.filter((likeId) => likeId !== id);
      } else {
        return [...prevLikes, id];
      }
    });
    setIsLikeSet(true);
  };
  //

  useEffect(() => {
    if (isLikeSet && currentUser) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          favoriteFilms: likes,
        });
        setUpdate((prev) => !prev);
      };

      UpdateUserById();
      setIsLikeSet(false);
    }
  }, [currentUser, likes, setUpdate]);

  //izleyeceklerim

  useEffect(() => {
    if (currentUser) {
      setWillWatchId(currentUser.watchList || []);
    }
  }, [currentUser]);
  //

  const handleCircleClick = () => {
    setWillWatchId((prevIz) => {
      if (prevIz.includes(id)) {
        return prevIz.filter((lzId) => lzId !== id);
      } else {
        return [...prevIz, id];
      }
    });
    setIsWillWatchSet(true);
  };

  useEffect(() => {
    if (isWillWatchSet && currentUser) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          watchList: willWatchId,
        });
        setUpdate((prev) => !prev);
      };

      UpdateUserById();
      setIsWillWatchSet(false);
    }
  }, [currentUser, willWatchId]);

  //izlediklerim

  useEffect(() => {
    if (currentUser) {
      setWatchedId(currentUser.watchedList || []);
    }
  }, [currentUser]);
  //

  const handleTickClick = () => {
    setWatchedId((prevIzl) => {
      if (prevIzl.includes(id)) {
        return prevIzl.filter((lzlId) => lzlId !== id);
      } else {
        return [...prevIzl, id];
      }
    });
    setIsWatchedSet(true);
  };

  useEffect(() => {
    if (isWatchedSet && currentUser) {
      const UpdateUserById = async () => {
        await updateUser(currentUser.id, {
          ...currentUser,
          watchedList: watchedId,
        });
        setUpdate((prev) => !prev);
      };

      UpdateUserById();
      setIsWatchedSet(false);
    }
  }, [currentUser, watchedId]);

  return (
    <Col className="mt-1 mb-3">
      <Card className="movieCard text-center text-black m-2 mx-auto rounded-0">
        <Card.Header className="movieCardHeader d-flex justify-content-center align-items-center rounded-0 p-0 m-0 ">
          {Title}
        </Card.Header>

        <div className="movieCardBody bg-dark text-light py-1">
          <span className="text-light fs-6  p-1 ">
            <MdOutlineAccessTime /> {RunTime}
          </span>
        </div>
        <Card.Img
          src={Poster}
          variant="top"
          className="movieCardImg object-fit-contain border-top border-bottom border-secondary border-1 bg-black rounded-0  "
        ></Card.Img>
{pathname=="/imdb" && <div className="imdbOrder text-black bg-warning position-absolute  pt-1 border border-dark border-3">
  {id}.
</div>}

        <div className="bg-dark d-flex justify-content-around align-items-center ">
          {sessionData && pathname != "/upcoming" && (
            <Button
              style={{ background: "none" }}
              className="border-0 p-0 text-dark "
              onClick={handleTickClick}
            >
              {watchedId.includes(id) ? (
                <FcOk className=" fs-4 mb-1" />
              ) : (
                <IoMdCloseCircleOutline className="text-danger  fs-4 mb-1 " />
              )}
            </Button>
          )}

          {/** */}

          {!sessionData && pathname != "/upcoming" && (
            <Button
              style={{ background: "none" }}
              className="border-0 p-0 text-dark "
              onClick={handleClickGoToSignUp}
            >
              <IoMdCloseCircleOutline className="text-danger  fs-4 mb-1 " />
            </Button>
          )}

          {pathname != "/upcoming" && (
            <span className="bg-black text-light px-3 py-1 border my-2 border-secondary">
              {Year}
            </span>
          )}
          {pathname == "/upcoming" && (
            <span className="bg-black text-light px-3 py-1 border my-2 border-secondary">
              {UpcomingTime}
            </span>
          )}

          {sessionData && pathname != "/upcoming" && (
            <Button
              style={{ background: "none", bottom: "4.5rem" }}
              className="border-0 p-0 mb-2 "
              onClick={handleHeartClick}
              ref={ref}
            >
              <FaHeart
                className={
                  likes.includes(id) ? "text-danger  fs-5" : "text-light  fs-5"
                }
              />
            </Button>
          )}

          {/** */}

          {!sessionData && pathname != "/upcoming" && (
            <Button
              style={{ background: "none", bottom: "4.5rem" }}
              className="border-0 p-0 mb-2 "
              onClick={handleClickGoToSignUp}
            >
              <FaHeart className="text-light  fs-5" />
            </Button>
          )}
        </div>

     {pathname!="/upcoming"&& <Card.Footer className="movieCardFooter text-light rounded-0 d-flex justify-content-center align-items-center border-top border-secondary ">
          {
          
          
          sessionData && pathname != "/upcoming" && (
            <div className="m-0 p-0" onClick={handleCircleClick}>
              {willWatchId.includes(id) && (
                <Button
                  style={{ width: "12rem", fontSize: "1rem" }}
                  className=" mt-1"
                >
                  Remove to Watchlist
                </Button>
             )}{!willWatchId.includes(id) &&(
                <Button
                  className="fs-6 px-4 mt-1"
                  variant="warning"
                  style={{ width: "12rem", fontSize: "1rem" }}
                >
                  Add to Watchlist
                </Button>
              )}
            </div>
          )
          
          
          }

          {/** */}

          {!currentUser&&pathname != "/upcoming" && (
            <div className="m-0 p-0">
              <Button
                className="fs-6 px-4 mt-1"
                variant="warning"
                style={{ width: "12rem", fontSize: "1rem" }}
                onClick={handleClickGoToSignUp}
              >
                Add to Watchlist
              </Button>
            </div>
          )}


        </Card.Footer>}
      </Card>
    </Col>
  );
};

export default MovieCard;
