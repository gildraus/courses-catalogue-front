import { Dropdown, DropdownItem } from "react-bootstrap";
import "../../styles/CourseDetails.css";
import { useEffect } from "react";

const CourseDetails = ({
  coursesOfTheSameName,
  selectedCourse,
  setSelectedCourse,
}) => {
  const course = selectedCourse;
  const splitLiterature = course.literature[0].split(/\d+\./).filter(Boolean);

  return (
    <div className="course-details-background">
      <div className="course-details">
        <div className="course-details-header">
          <h1>{course.name}</h1>

          <div>{course.departments}</div>

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
              <h2>Садржај и литература</h2>
              <br />
              <h3 className="green-paragraph">Садржај</h3>
              {course.content}
              <hr />
              <h3 className="green-paragraph">Литература</h3>
              {splitLiterature.map((book, index) => (
                <p key={index}>
                  {index + 1}. {book.trim()}
                </p>
              ))}
            </div>
          </div>

          <div className="course-details-sidebar">
            <div className="course-details-sidecard">
              <h2>Картон предмета</h2>
              <p>
                Веб сајт: <a href={course.link}>{course.link}</a>
              </p>
              <p>Број ЕСПБ поена: {course.espb}</p>

              <p>Семестар: {course.semester}</p>
              <p>Статус: {course.status}</p>
              <p>ИД курса: {course.course_id}</p>
              <p>Модул: {course.modules[0]}</p>
              <h2>Напомена</h2>
              <p>
                <img src="./images/danger.png" />
                {course.note}
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
