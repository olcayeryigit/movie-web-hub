import { Container } from "react-bootstrap";
import ProfileHeader from "./profile-header";
import { useContext, useEffect } from "react";
import StoreContext from "../../../store";
import Menu from "./menu/menu";
import Movies from "../movies/movies";
import { useLocation, useNavigate } from "react-router-dom";
import Settings from "./settings/settings";

const Profile = () => {
  const { isTimeOut,setIsTimeOut,setCurrentUser} = useContext(StoreContext);

  const { pathname } = useLocation();
  const navigate=useNavigate();



//

useEffect(() => {
  if (isTimeOut) {
    setCurrentUser(null);
  }
}, [isTimeOut]);

useEffect(() => {
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  if (sessionData !== null) {
    const sessionDuration = 100000000; // Oturum süresi (örneğin, 1 saat = 3600000 ms)
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


    return (
      <Container className="p-0 bg-black mt-0 mb-3">
        <ProfileHeader />
      {pathname!="/profile/settings" && <Menu />}
      {pathname!="/profile/settings"&&   <Movies/>}
    {pathname=="/profile/settings"&&<Settings/>}
      </Container>
    );
};

export default Profile;
