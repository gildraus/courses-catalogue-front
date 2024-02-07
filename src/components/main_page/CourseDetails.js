import "../../styles/CourseDetails.css";

const CourseDetails = ({ allCourses, selectedCourse, setSelectedCourse }) => {
  const course = selectedCourse;
  const splitLiterature = course.literature[0].split(/\d+\./).filter(Boolean);

  var coursesOfTheSameName = [];
  allCourses.forEach((item) => {
    if (item.name === selectedCourse.name) {
      coursesOfTheSameName.push(item);
    }
  });
  return (
    <div className="course-details-background">
      <div className="course-details">
        <div className="course-details-header">
          <h1>{course.name}</h1>

          <div>{course.departments}</div>
          <div>{course.program}</div>
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
              {/* <h3>Настава:</h3>
              <p>{course.type_of_lecture}</p>

              <h3>Начин полагања испита:</h3>
              <p>{course.type_of_exam}</p> */}

              {/* <h3>Предуслов:</h3>
                {course.preconditions.map((precondition, index) => (
                  <p key={index}>{precondition}</p>
                ))} */}

              {/* <h3>Периодичност:</h3>
              <p>{course.periodicity}</p> */}

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

            {/* <div className="course-details-detailed-info-box">
              <h2>Опширније информације</h2>
              <br />
              <h3 className="green-paragraph">Сажетак</h3>
              {course.abstract}
              <hr />
              <h3 className="green-paragraph">Циљ</h3>
              {course.objective}
            </div> */}

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
              {/* <p>
                  Смер:{" "}
                  {course.studies.map((studie, index) => (
                    <p key={index}>{studie}</p>
                  ))}
                </p> */}
              <p>Семестар: {course.semester}</p>
              <p>Статус: {course.status}</p>
              <h2>Напомена</h2>
              <p>
                <img src="./images/danger.png" />
                {course.note}
              </p>
              <p>
                {/* {course.restrictions.map((restriction, index) => (
                    <p key={index}><img src="./images/warning.png"/>{restriction}</p>
                  ))} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="course-details">
    //   <div className="course-details-header">
    //     {course.name}
    //     {course.departments}
    //   </div>

    //   <div className="course-details-body">
    //     <div className="course-details-video-box">
    //       {course.video ? (
    //         <div
    //           className="iframe-div"
    //           style={{
    //             position: "relative",
    //             paddingBottom: "56.25%",
    //             height: 0,
    //             overflow: "hidden",
    //           }}
    //         >
    //           <iframe
    //             style={{
    //               position: "absolute",
    //               top: 0,
    //               left: 0,
    //               width: "100%",
    //               height: "100%",
    //             }}
    //             src={`https://www.youtube.com/embed/${course.video}`}
    //             title="Faculty of Organizational Sciences - promo video"
    //             frameBorder="0"
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //             allowFullScreen
    //           ></iframe>
    //         </div>
    //       ) : (
    //         <p>[катедра нема промотивни видео]</p>
    //       )}
    //     </div>

    //     <div className="course-details-basic-info-box">
    //       <h3>Предавачи:</h3>
    //       {course.lecturers.map((lecturer, index) => (
    //         <p key={index}>{lecturer}</p>
    //       ))}
    //       <h3>Настава:</h3>
    //       <p>{course.type_of_lecture}</p>

    //       <h3>Начин полагања испита:</h3>
    //       <p>{course.type_of_exam}</p>

    //       <h3>Предуслов:</h3>
    //       {course.preconditions.map((precondition, index) => (
    //         <p key={index}>{precondition}</p>
    //       ))}

    //       <h3>Периодичност:</h3>
    //       <p>{course.periodicity}</p>

    //       <h3>Термини предавања:</h3>
    //       {course.lecture_session_time.map((time, index) => (
    //         <p key={index}>{time}</p>
    //       ))}

    //       <h3>Термини вежби:</h3>
    //       {course.exercise_session_time.map((time, index) => (
    //         <p key={index}>{time}</p>
    //       ))}
    //     </div>
    //     <div className="course-details-detailed-info-box">
    //       <h2>Опширније информације</h2>
    //       <h3>Сажетак</h3>
    //       {course.abstract}
    //       <h3>Циљ</h3>
    //       {course.objective}
    //     </div>
    //     <div className="course-details-literature">
    //       <h2>Садржај и литература</h2>
    //       <h3>Садржај</h3>
    //       {course.content}
    //       <h3>Литература</h3>
    //       {course.literature.map((item, index) => (
    //         <p key={index}>
    //           {index + 1}. {item}
    //         </p>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="course-details-sidebar">
    //     <div className="course-details-sidecard">
    //       <h2>Картон предмета</h2>
    //       <p>
    //         Веб сајт: <a href={course.link}>{course.link}</a>
    //       </p>
    //       <p>Број ЕСПБ поена: {course.espb}</p>
    //       <p>
    //         Смер:{" "}
    //         {course.studies.map((studie, index) => (
    //           <p key={index}>{studie}</p>
    //         ))}
    //       </p>
    //       <p>Семестар: {course.semester}</p>
    //       <p>Статус: {course.status}</p>
    //       <h2>Ограничења</h2>
    //       <p>{course.note}</p>
    //       <p>
    //         {course.restrictions.map((restriction, index) => (
    //           <p key={index}>{restriction}</p>
    //         ))}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CourseDetails;
