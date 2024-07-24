import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StoreContext from "../../store";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { filteredMovies } from "../../helper/data";
import Logout from "./logout";
import Logout2 from "./logout2";
import "./header.scss"

const Header = () => {
  const {
    currentUsers,
    setIsNeedInHeader,
    isFaultyOperation,
    currentUser,
    setCurrentUser,
    submittedText,
    setSubmittedText,
    searchText,
    setSearchText,
    setSearchShow,
    isTimeout,
    setIsTimeOut,
  } = useContext(StoreContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const sessionData = JSON.parse(localStorage.getItem("sessionData"));

  const [disabled, setDisabled] = useState("none");
  const [isGoSearchPage, setIsGoSearchPage] = useState(false);

  //



  useEffect(() => {
    if (isTimeout) {
      setCurrentUser(null);
    }
  }, [isTimeout]);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sessionData"));
    if (sessionData !== null) {
      const sessionDuration = 3600000; // Oturum süresi (örneğin, 1 saat = 3600000 ms)
      const currentTime = Date.now();
      //console.log(sessionData);
      if (!(currentTime - sessionData.loginTime < sessionDuration)) {
        setCurrentUser(null);
        localStorage.removeItem("sessionData");
        navigate("/sign-in");
        setIsTimeOut(true);
      }
    }
  }, [pathname]);

  //
  useEffect(() => {
    if (sessionData != null) {
      setIsNeedInHeader(true);

      currentUsers.map((item) => {
        if (item.id == sessionData.id) {
          //  console.log(item);
          setCurrentUser(item);
        }
      });
    }
    if (isFaultyOperation) {
      navigate("/error");
    }
  }, [currentUsers]);

  /*
useEffect(()=>{
console.log(currentUser)
},[currentUser])
*/

  //Search

  //bir linke tıkladığımızda input valuesi "" olsun

  const handleClick = () => {
    if (inputRef.current) {
      //console.log("merhaba");
      // console.log(inputRef.current);

      inputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    console.log(e.target);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // console.log(searchText);
    //state asenkron olduğu için, useEffect içinde güncel searchText değerini bu şekilde consoleda görebiliriz
    if (!searchText == "") {
      setDisabled("");
    } else if (searchText == "") {
      setDisabled("none");
    }
  }, [searchText]);

  const handleSubmit = (e) => {
    setDisabled("none");
    e.target.reset();
    e.preventDefault(); // Form submit işlemi sırasında varsayılan davranışı engelleyelim
    setSubmittedText(searchText);
    setIsGoSearchPage(true);
  };
  useEffect(() => {
    //console.log("submittedText");
    //console.log(submittedText);
    const filteredFilms = filteredMovies(submittedText);
    setSearchShow(filteredFilms);
    //console.log(searchShow);
    if (isGoSearchPage == true) {
      navigate("/movies/search");
    }
  }, [submittedText]);

  if (currentUser != null || sessionData == null)
    return (
      <Navbar expand="md" className=" bg-light border border-dark border-1">
        <Container
          fluid
          className="d-flex flex-row flex-nowrap justify-content-between align-items-center  gap-2  px-4"
          style={{ backgroundColor: "lightgray" }}
        >
          <Navbar.Brand className="text-dark">Movies</Navbar.Brand>
          <Container className="d-flex flex-row">
            <Nav
              className="d-flex flex-row flex-grow-1 gap-3 "
              style={{ backgroundColor: "lightgray" }}
            >
              <Nav.Link
                as={Link}
                className="text-black"
                to="/"
                onClick={handleClick}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-black"
                to="/movies"
                onClick={handleClick}
              >
                Movies
              </Nav.Link>
            </Nav>

            <Form
              onSubmit={(e) => handleSubmit(e)}
              className="ms-5 d-none d-md-flex flex-row mt-1"
              style={{ width: "12rem", height: "2rem" }}
            >
              <Form.Control
                ref={inputRef}
                type="search"
                placeholder="Search Movie"
                size="sm"
                className="me-1"
                aria-label="Search"
                onChange={(e) => handleChange(e)}
              />
              <Button
                type="submit"
                variant="warning rounded"
                className="text-nowrap "
                size="sm"
                disabled={disabled ? "none" : ""}
              >
                Search
              </Button>
            </Form>

            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-sm"
              className="bg-light"
            />
          </Container>

          <Container className="d-none d-md-flex flex-row justify-content-end align-items-center flex-nowrap">
            {!sessionData ? (
              <>
                <span>
                  <Button
                    as={Link}
                    to="sign-form"
                    variant="dark rounded"
                    className="text-nowrap border-3 ms-5 me-1"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                  <Button
                    as={Link}
                    to="sign-in"
                    variant="dark rounded"
                    className="text-nowrap border-3"
                    size="sm"
                  >
                    Sign In
                  </Button>
                </span>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/profile/myfavorites"
                  style={{ height: "2.1rem", width: "9rem" }}
                  className="d-flex justify-content-center align-items-center gap-1 border border-secondary ms-4 "
                  variant="dark rounded-0"
                >
                  <BiUserCircle className="text-white fs-5 bg-dark rounded-5" />
                  <div className="">
                    {currentUser.firstName[0].toUpperCase()}
                    {currentUser.firstName.slice(1)}
                    {currentUser.lastName[0].toUpperCase()}.
                  </div>
                </Button>

                <Logout />
              </>
            )}
          </Container>
        </Container>

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md  "
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
          className="expandNavBar p-0 m-0 "
        >
          <Offcanvas.Header
            closeButton
            className="ms-3 me-3 mt-2 fs-3 mb-0 p-0"
          >
            {" "}
            Movies{" "}
          </Offcanvas.Header>
          <Offcanvas.Header className="mt-3 ms-1 p-0 mb-2 ">
            {!sessionData ? (
              <>
                <span className="d-flex gap-2 ms-2">
                  <Button
                    as={Link}
                    to="sign-form"
                    variant="light "
                    className="text-nowrap fs-6  mb-2"
                    size="md"
                  >
                    Sign Up
                  </Button>
                  <Button
                    as={Link}
                    to="sign-in"
                    variant="light "
                    className="text-nowrap fs-6  mb-2"
                    size="md"
                  >
                    Sign In
                  </Button>
                </span>
              </>
            ) : (
              <>
                <div className="d-flex ">
                  <Button
                    as={Link}
                    to="/profile/myfavorites"
                    className="d-flex justify-content-center align-items-center gap-1  ms-2 border-0"
                    variant="light"
                    size="md"
                  >
                    <BiUser className="text-dark fs-5 bg-light rounded-5" />
                    <div className="">
                      {currentUser.firstName[0].toUpperCase()}
                      {currentUser.firstName.slice(1)}{" "}
                      {currentUser.lastName[0].toUpperCase()}.
                    </div>
                  </Button>
                  <Logout2 />
                </div>
              </>
            )}
          </Offcanvas.Header>
          <Offcanvas.Header className="ms-0 mt-0 pt-0 ">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className=" d-flex flex-row gap-2 ms-0"
            >
              <Form.Control
                ref={inputRef}
                type="search"
                placeholder="Search Movie"
                size="md"
                className="me-0  border border-black "
                aria-label="Search"
                onChange={(e) => handleChange(e)}
              />
              <Button
                type="submit"
                variant="outline-dark"
                className="text-nowrap border border-black"
                size="md"
                disabled={disabled ? "none" : ""}
              >
                Search
              </Button>
            </Form>
          </Offcanvas.Header>
        </Navbar.Offcanvas>
      </Navbar>
    );
};

export default Header;
