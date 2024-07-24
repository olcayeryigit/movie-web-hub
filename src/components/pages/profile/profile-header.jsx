import React, { useContext} from "react";
import {
  Button,
  Container,
  NavLink,

} from "react-bootstrap";
import { FaHome, FaUserEdit } from "react-icons/fa";
import StoreContext from "../../../store";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Logout from "../../common/logout";
import { TfiBackLeft } from "react-icons/tfi";
import "./profile-header.scss"

const ProfileHeader = () => {
  const { currentUser } = useContext(StoreContext);
const {pathname}=useLocation();
  if (currentUser)
    return (
      <Container className="profileHeaderContainer   mt-3  px-3 py-2   ">
        <div className="d-flex justify-content-between align-items-center ">
          <span className="d-flex gap-3 align-items-center text-light" >
            <NavLink className="text-black" as={Link} to="/profile/myfavorites">
              {currentUser.firstName[0].toUpperCase()}
              {currentUser.firstName.slice(1)}{" "}
              {currentUser.lastName[0].toUpperCase()}
              {currentUser.lastName.slice(1)}
            </NavLink>
          </span>

          <span className="d-flex align-items-center">
            <Button
            variant="light"
              className="faHome  rounded-0 me-2 border-0 py-1"
              as={Link}
              to="/"
              style={{height:"2.2rem"}}

            >
              <FaHome className="fs-4" />
            </Button>
         {  pathname!= "/profile/settings" &&
            <Button
              size="sm"
              variant="warning"
              className="text-black me-2 rounded-0 border border-light d-flex justify-content-center align-items-center flex-wrap"
              as={Link}
              to="/profile/settings"
              style={{height:"2.1rem",width:"7rem"}}
            >
              <FaUserEdit className="me-1"/>
              <span>Edit Profile</span> 
            </Button>}


            { pathname== "/profile/settings"&&
            <Button
              size="sm"
              variant="warning"
              className="text-black me-2 rounded-0 border border-light d-flex align-items-center"
              as={Link}
              to="/profile/myfavorites"
              style={{height:"2.2rem"}}
            >
              <TfiBackLeft />
            Back
            </Button>}
            <Logout/>
          </span>
        </div>
      </Container>
    );
};

export default ProfileHeader;
