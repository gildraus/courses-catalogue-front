import { useNavigate } from "react-router-dom";
import "../../styles/Navbar2.css";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToHomepage = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-content">
        {" "}
        <div className="navbar-logo-container">
          <img
            className="navbar-logo-img"
            src="./images/fon-logo-cyr.png"
            alt="Logo"
            onClick={redirectToHomepage}
          />
        </div>
        <div className="vertical-separator"></div>
        <div className="navbar-text-container">
          <div className="title">УНИВЕРЗИТЕТ У БЕОГРАД</div>
          <div className="subtitle">ФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА</div>
        </div>
      </div>

      {/* <div className="horizontal-separator"></div> */}
    </div>
  );
};

export default Navbar;
