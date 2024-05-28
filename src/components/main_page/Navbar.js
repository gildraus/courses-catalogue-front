import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { Dropdown } from "react-bootstrap";

const Navbar = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const redirectToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-title-column">
          <div className="navbar-logo-container">
            <img
              className="navbar-logo-img"
              src="./images/fon-logo-cyr.png"
              alt="Logo"
              onClick={redirectToHomepage}
            />
          </div>
          <div className="navbar-separator"></div>
          <div className="navbar-text-container">
            <span className="navbar-title">УНИВЕРЗИТЕТ У БЕОГРАДУ</span>
            <span className="navbar-subtitle">
              ФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА
            </span>
          </div>
        </div>
        <div className="language-selector">
          <Dropdown className="language-dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {language ? language : "Ћирилица"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLanguage("Ћирилица")}>
                Ћирилица
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage("Latinica")}>
                Latinica
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setLanguage("English")}>
                English
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
