import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import "./miniBar.scss"
const MiniBar = () => {

  const {pathname} = useLocation();
  return (
    <>
      
      <Nav fill variant="tab" className="tabMenu mt-2 d-flex flex-column flex-md-row">
       
      <Nav.Item>
          <Nav.Link           className={`navlink text-black ${pathname === '/movies' ? 'active' : ''}`}
 as={Link} to="/movies">
            All Movies
          </Nav.Link>
        </Nav.Item>
    
       
      
    

        <Nav.Item>
          <Nav.Link  className={`navlink text-black ${pathname === '/popular' ? 'active' : ''}`} as={Link} to="/popular">
            Most Popular Movies
          </Nav.Link>
        </Nav.Item>
      

        <Nav.Item>
          <Nav.Link  className={`navlink text-black ${pathname === '/upcoming' ? 'active' : ''}`} as={Link} to="/upcoming">
           Upcoming Movies
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link  className={`navlink text-black ${pathname === '/imdb' ? 'active' : ''}`}  as={Link} to="/imdb">
            IMDB Top 50
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </>
  )
}

export default MiniBar
