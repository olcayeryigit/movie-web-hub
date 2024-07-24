import { useLocation } from "react-router-dom"

const Footer = () => {

  const {pathname}=useLocation();
  if(pathname!="/registrationSuccessful"&&pathname!="/registrationFailed")
    return (
      <footer className="bg-black text-white p-3">&copy; Copyright</footer>
  )
}

export default Footer
