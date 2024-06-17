import "../../styles/Footer.css";

const Footer = ({ t }) => {
  return (
    <div className="main-footer">
      <div className="main-footer-body">
        {" "}
        <div>
          <p>© 2024 {t("faculty_footer")}</p>
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
