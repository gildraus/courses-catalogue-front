import { useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import DropdownNavbar from "./DropdownNavbar";
import i18n from "i18next";

const Navbar = ({ language, setLanguage, lngs, i18n }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
              {lngs[i18n.language] ? lngs[i18n.language].nativeName : "Ћирилица"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(lngs).map((lng) => (
                <Dropdown.Item
                  key={lng}
                  onClick={() => i18n.changeLanguage(lng)}
                  disabled={i18n.resolvedLanguage === lng}
                >
                  {lngs[lng].nativeName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
