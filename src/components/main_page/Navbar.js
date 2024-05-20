import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToHomepage = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo-container">
        <img
          className="navbar-logo-img"
          src="./images/fon-logo-cyr.png"
          alt="Logo"
          onClick={redirectToHomepage}
        />
      </div>
      <div className="separator"></div>
    </div>
  );
};

export default Navbar;
