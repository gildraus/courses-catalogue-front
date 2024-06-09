import { Dropdown, DropdownItem, DropdownToggle } from "react-bootstrap";
import "../../styles/CourseDetails.css";
import Navbar from "../main_page/Navbar";
import Footer from "../main_page/Footer";
import { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import BasicInfoCard from "./BasicInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server_name from "../../config";
import BackToTopButton from "./BackToTopButton";

const CourseDetails = ({
  coursesOfTheSameName,
  selectedCourse,
  setSelectedCourse,
  lngs,
  i18n,
  t,
}) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(undefined);
  const [selectedModule, setSelectedModule] = useState(undefined);
  const [sessions, setSessions] = useState(undefined);
  const [backgroundString, setBackgroundString] = useState(
    "../../public/images/OAS-background.png"
  );

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${server_name}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (course && course.level_of_study) {
      if (course.level_of_study === "Основне академске студије") {
        setBackgroundString("../../public/images/OAS-background.png");
      } else if (course.level_of_study === "Мастер академске студије") {
        setBackgroundString("../../public/images/MAS-background.png");
      }
    }
  }, [course]);

  useEffect(() => {
    if (course && course.programs && course.programs.length > 0) {
      setSelectedProgram(course.programs[0]);
    }
    if (course && course.modules && course.modules.length > 0) {
      setSelectedModule(course.modules[0]);
    }
  }, [course]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${server_name}/api/sessions`, {
          params: {
            selectedProgram,
            selectedModule,
            level_of_study: course.level_of_study,
            name: course && course.name,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [selectedProgram, selectedModule, course]);

  return (
    <div
      className="course-details-background"
      style={{
        backgroundImage: `linear-gradient(to bottom, #b2f1e3 0, #b2f1e3 250px, transparent 250px), url(${backgroundString})`,
      }}
    >
      <div className="row navbar-row">
        <div className="navbar-container col-sm-12">
          <Navbar lngs={lngs} i18n={i18n} t={t} />
        </div>
      </div>

      <div className="course-details">
        <div className="course-details-header">
          <div className="header-title">
            <h2 id="course-name-header-text">{course && course.name}</h2>
            <div id="course-department-header-text">
              {course && course.departments}
            </div>
          </div>
          <div className="header-module-selector">
            {course && course.programs.length > 1 && (
              <div className="program-column">
                {" "}
                <h4>{t("choose_program")}</h4>{" "}
                <Dropdown className="selector-dropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedProgram ? selectedProgram : t("choose_program")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {course.programs.map((program, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedProgram(program)}
                      >
                        {program}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {course && course.modules.length > 1 && (
              <div className="module-column">
                <h4>{t("choose_module")}</h4>{" "}
                <Dropdown className="selector-dropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedModule ? selectedModule : t("choose_module")}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {course.modules.map((module, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedModule(module)}
                      >
                        {module}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>

        <div className="course-details-body">
          <div className="course-details-main-body">
            <div className="course-details-video-box">
              {course && course.video && (
                <div
                  className="iframe-div"
                  style={{
                    position: "relative",
                    paddingBottom: "56.25%",
                    height: 0,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    src={`https://www.youtube.com/embed/${course.video}`}
                    title="Faculty of Organizational Sciences - promo video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="course-details-info">
              {/* desktop view */}
              {course && <BasicInfoCard course={course} t={t} />}
            </div>
            <div className="course-details-basic-info-box">
              <h2 className="details-card-title">{t("basic_info_title")}</h2>

              {course && course.lecturers.length > 0 && (
                <div className="lecturers-div">
                  <h3 className="details-card-subtitle">{t("lecturers")}</h3>
                  <ul>
                    {course.lecturers.map((lecturer, index) => (
                      <li className="details-card-text" key={index}>
                        {lecturer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="lecture_session_time-div">
                <h3 className="details-card-subtitle">
                  {t("lecture_session_times")}
                </h3>
                {sessions && sessions.length > 0 ? (
                  <table className="session_time_table">
                    <thead>
                      <tr>
                        <th>Рб.</th>
                        <th>датум-место-време</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions
                        .filter((session) => session.lecture_session_time)
                        .map((session, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{session.lecture_session_time}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p>{t("lecture_session_times_availability")}</p>
                )}
              </div>
              <div className="exercise_session_time-div">
                <h3 className="details-card-subtitle">
                  {t("exercise_session_times")}
                </h3>
                {sessions && sessions.length > 0 ? (
                  <table className="session_time_table">
                    <thead>
                      <tr>
                        <th>{t("num_table")}.</th>
                        <th>{t("date_place_time")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions
                        .filter((session) => session.exercise_session_time)
                        .map((session, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{session.exercise_session_time}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p>{t("exercise_session_times_availability")}</p>
                )}
              </div>
            </div>
            {course && (
              <div className="course-details-categorization">
                <div className="categorization-header">
                  <h2 className="details-card-title">{t("categorization")}</h2>
                </div>
                <div className="categorization-body">
                  <div className="program-category">
                    {" "}
                    <h4 className="details-card-subtitle">{t("programs")}:</h4>
                    <ul>
                      {course.programs.map((item, index) => (
                        <li className="details-card-text" key={index}>
                          {" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="module-category">
                    <h4 className="details-card-subtitle">{t("modules")}:</h4>
                    <ul>
                      {course.modules.map((item, index) => (
                        <li className="details-card-text" key={index}>
                          {" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <div className="course-details-literature">
              <h2 className="details-card-title">{t("more_info")}</h2>
              <br />
              <h3 className="details-card-subtitle">{t("description")}</h3>
              {course && (
                <p className="details-card-text">{course.description}</p>
              )}
              <hr />
              <h3 className="details-card-subtitle">{t("literature")}</h3>
              {course && course.literature && (
                <ul>
                  {course.literature.map((item, index) => (
                    <li className="details-card-text" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="course-details-sidebar">
            <div className="course-details-sidecard">
              {/* mobile view */}
              {course && <BasicInfoCard course={course} t={t} />}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer t={t} />
      </div>
      <div className="row">
        <BackToTopButton />
      </div>
    </div>
  );
};

export default CourseDetails;
