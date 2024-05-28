import { useNavigate } from "react-router-dom";
import "../../styles/Navbar2.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
const Navbar = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const redirectToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <img
          className="navbar-logo-img"
          src="./images/fon-logo-cyr.png"
          alt="Logo"
          onClick={redirectToHomepage}
        />
        <div className="navbar-separator"></div>
        <div className="navbar-text-container">
          <span className="navbar-title">УНИВЕРЗИТЕТ У БЕОГРАДУ</span>
          <span className="navbar-subtitle">ФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА</span>
        </div>
      </div>
      <div className="navbar-selector">
        <div className="navbar-language-selector">
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
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="navbar-mobile-selector"><button>klik</button></div>
      </div>
    </div>
  );
};

export default Navbar;
