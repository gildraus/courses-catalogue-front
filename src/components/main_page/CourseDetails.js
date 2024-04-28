import { Dropdown, DropdownItem } from "react-bootstrap";
import "../../styles/CourseDetails.css";
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

  return (
    <div className="course-details-background">
      <div className="close-button-container">
        {" "}
        <CloseButton className="close-button" onClick={() => navigate(-1)} />
      </div>
      <div className="course-details">
        <div className="course-details-header">
          <h2 id="course-name-header-text">{course && course.name}</h2>
          <div id="course-department-header-text">{course && course.departments}</div>
        </div>
        <div className="module-selector">
          <p> Изабери модул:</p>
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
              {course && <BasicInfoCard
                course={course}
              />}
            </div>
            <div className="course-details-basic-info-box">
              <div className="lecture_session_time-div">
                <h3>Термини предавања</h3>
                <table className="session_time_table" border="1">
                  {/* Table content */}
                </table>
              </div>
              <div className="exercise_session_time-div">
                <h3>Термини вежби</h3>
                <table className="session_time_table">
                  {/* Table content */}
                </table>
              </div>
            </div>
            <div className="course-details-literature">
              <h2>Опис и литература</h2>
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
          </div>
          <div className="course-details-sidebar">
            <div className="course-details-sidecard">
              {/* mobile view */}
              {course && <BasicInfoCard
                course={course}
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
