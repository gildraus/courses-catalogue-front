import { Dropdown, DropdownItem } from "react-bootstrap";
import "../../styles/CourseDetails.css";
import { useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import BasicInfoCard from "./BasicInfoCard";

const CourseDetails = ({
  coursesOfTheSameName,
  selectedCourse,
  setSelectedCourse,
}) => {
  const course = selectedCourse;
  
  let literatureItems;
  if (Array.isArray(course.literature)) {
    literatureItems = course.literature.map((item, index) => (
      <p key={index}>
        {index + 1}. {item}
      </p>
    ));
  } else {
    literatureItems = <p>{course.literature}</p>;
  }
  const closeCourseDetails = () => {
    setSelectedCourse(undefined);
  };

  return (
    <div className="course-details-background">
      <div className="close-button-container">
        {" "}
        <CloseButton className="close-button" onClick={closeCourseDetails} />
      </div>

      <div className="course-details">
        <div className="course-details-header">
          <h2 id="course-name-header-text">{course.name}</h2>
          <div id="course-department-header-text">{course.departments}</div>
        </div>
        <div className="module-selector">
          <p> Изабери модул:</p>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedCourse.modules[0]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {coursesOfTheSameName.map((item) => (
                <Dropdown.Item
                  onClick={() => setSelectedCourse(item)}
                  key={item.course_id}
                >
                  {item.modules[0]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="course-details-body">
          <div className="course-details-main-body">
            <div className="course-details-video-box">
              {course.video ? (
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
              ) : (
                <p>[катедра нема промотивни видео]</p>
              )}
            </div>

            <div className="course-details-info">
              {/* desktop view */}
              <BasicInfoCard selectedCourse={selectedCourse} coursesOfTheSameName={coursesOfTheSameName} />
            </div>

            <div className="course-details-basic-info-box">
              <h3>Предавачи:</h3>
              {course.lecturers.map((lecturer, index) => (
                <p key={index}>{lecturer}</p>
              ))}

              <h3>Термини предавања:</h3>
              {course.lecture_session_time.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
              <p>ПОН-015-08:15</p>

              <h3>Термини вежби:</h3>
              {course.exercise_session_time.map((time, index) => (
                <p key={index}>{time}</p>
              ))}
              <p>ПОН-015-08:15</p>
              <a style={{ color: "red" }}>
                {" "}
                placeholder(nije preuzeto sa oasa)
              </a>
            </div>

            <div className="course-details-literature">
              <h2>Опис и литература</h2>
              <br />
              <h3 className="green-paragraph">Опис</h3>
              {course.description}
              <hr />
              <h3 className="green-paragraph">Литература</h3>
              {literatureItems}
            </div>
          </div>

          <div className="course-details-sidebar">
            <div className="course-details-sidecard">
              {/* mobile view */}
              <BasicInfoCard selectedCourse={selectedCourse}  coursesOfTheSameName={coursesOfTheSameName}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
