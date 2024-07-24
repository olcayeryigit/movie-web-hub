import { Outlet } from "react-router-dom"
import Footer from "../components/common/footer"
import Header from "../components/common/header"


const UserLayout = () => {

 return (
    <>
   
  <Header />
       <Outlet/>
  
      <Footer/>
    </>
  )
}

export default UserLayout
