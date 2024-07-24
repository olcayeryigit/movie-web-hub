import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./menu.scss"
const Menu = () => {
const{pathname}=useLocation();
  return (
    <div>
      <Nav  className="navMenu px-4 py-2 d-flex flex-column flex-md-row" style={{fontSize:"14px"  }}>
        <Nav.Item >
          <Nav.Link as={Link} to="/profile/myfavorites" 
          className={`menuLink text-black ${pathname==`/profile/myfavorites`&& `active`}`}>

           My Likes
          </Nav.Link>
        </Nav.Item>
    
        <Nav.Item>
          <Nav.Link as={Link} to="/profile/towatch" className={`menuLink text-black ${pathname=="/profile/towatch"&&"active"}`}>Watchlist</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to="/profile/watched" className={`menuLink text-black ${pathname=="/profile/watched"&&"active"}`}>Watched Movies</Nav.Link>
        </Nav.Item>

      </Nav>
    </div>
  );
};

export default Menu;
