import "../../styles/Footer.css";

const Footer = ({ t }) => {
  return (
    <div className="main-footer">
      <div className="main-footer-body">
        {" "}
        {/* <p>© 2023 Факултет организационих наука | Каталог курсева</p> */}
        <div>
          <p>© 2024 {t("faculty_footer")} | </p>
        </div>
        <div>
          <p className="footer-paragraph">
            &nbsp;{t("course_catalogue_footer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
