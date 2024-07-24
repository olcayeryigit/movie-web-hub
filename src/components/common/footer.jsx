import { useLocation } from "react-router-dom"

const Footer = () => {

  const {pathname}=useLocation();
  if(pathname!="/registrationSuccessful"&&pathname!="/registrationFailed")
    return (
      <footer className="bg-black text-white mt-3 mt-sm-0 py-4 py-sm-3 ps-3" >&copy; Copyright</footer>
  )
}

export default Footer
