import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

const UserLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Outlet />
      {pathname != "/movies/search" && <Footer />}
    </>
  );
};

export default UserLayout;
