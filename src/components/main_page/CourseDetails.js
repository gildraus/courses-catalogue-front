import { Dropdown, DropdownItem } from "react-bootstrap";
import "../../styles/CourseDetails.css";
import Navbar from "../main_page/Navbar";
import Footer from "../main_page/Footer";
import { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import BasicInfoCard from "./BasicInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server_name from "../../config";

const CourseDetails = ({
  coursesOfTheSameName,
  selectedCourse,
  setSelectedCourse,
}) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(undefined);
  const [selectedModule, setSelectedModule] = useState(undefined);
  const [sessions, setSessions] = useState(undefined);

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
    <div className="course-details-background">
      <div className="row navbar-row">
        <div className="navbar-container col-sm-12">
          <Navbar />
        </div>
      </div>
      <div className="close-button-container">
        {" "}
        <CloseButton className="close-button" onClick={() => navigate(-1)} />
      </div>
      <div className="course-details">
        <div className="course-details-header">
          <h2 id="course-name-header-text">{course && course.name}</h2>
          <div id="course-department-header-text">
            {course && course.departments}
          </div>
        </div>
        <div className="module-selector">
          <p> Изабери програм:</p>
          {course && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedProgram ? selectedProgram : "Изабери програм"}
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
          )}
          <p> Изабери модул:</p>
          {course && (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedModule ? selectedModule : "Изабери модул"}
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
          )}
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
              {course && <BasicInfoCard course={course} />}
            </div>
            <div className="course-details-basic-info-box">
              <h2>Основне информације</h2>

              {course && course.lecturers.length > 0 && (
                <div className="lecturers-div">
                  <h3>Предавачи</h3>
                  <ul>
                    {course.lecturers.map((lecturer, index) => (
                      <li key={index}>{lecturer}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="lecture_session_time-div">
                <h3>Термини предавања</h3>
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
                  <p>Подаци о предавањима нису доступни</p>
                )}
              </div>
              <div className="exercise_session_time-div">
                <h3>Термини вежби</h3>
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
                  <p>Подаци о вежбама нису доступни</p>
                )}
              </div>
            </div>
            <div className="course-details-literature">
              <h2>Опширније информације</h2>
              <br />
              <h3 className="green-paragraph">Опис</h3>
              {course && course.description}
              <hr />
              <h3 className="green-paragraph">Литература</h3>
              {course && course.literature && (
                <ul>
                  {course.literature.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          <div className="course-details-categorization">
            <h2>Категоризација
              
            </h2>
          </div>
          </div>
          <div className="course-details-sidebar">
            <div className="course-details-sidecard">
              {/* mobile view */}
              {course && <BasicInfoCard course={course} />}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default CourseDetails;
