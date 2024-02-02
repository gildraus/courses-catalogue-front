import "../../styles/CoursesView.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";

const CoursesView = ({
  allCourses,
  allDepartments,
  allModules,
  allLevelsOfStudy,
  coursesToShow,
  selectedLevelOfStudy,
  selectedProgram,
  selectedModule,
  selectedSemester,
  selectedYearOfStudy,
  selectedDepartments,
  selectedCourse,
  emptyResponse,
  isSidebarVisible,
  setAllCourses,
  setCoursesToShow,
  setSelectedLevelOfStudy,
  setSelectedProgram,
  setSelectedModule,
  setSelectedSemester,
  setSelectedYearOfStudy,
  setSelectedDepartments,
  setSelectedCourse,
  setEmptyResponse,
  setIsSidebarVisible,
  fetchFilteredCourses,
}) => {
  function toggle(groupName) {
    var displayType = document.getElementById(groupName).style.display;
    document.getElementById(groupName).style.display =
      displayType === "none" ? "inline" : "none";
    document.getElementById(groupName + "-arrow").style.rotate =
      displayType === "none" ? "180deg" : "0deg";
  }

  const [isSmallScreen, setIsSmallScreen] = useState([false]);

  const createCheckboxChangeHandler = (state, setState) => (event) => {
    const { value, checked } = event.target;
    const updatedState = checked
      ? [...state, value]
      : state.filter((item) => item !== value);
    setState(updatedState);
  };
  useEffect(() => {
    fetchFilteredCourses();
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 992);
    }

    setIsSmallScreen(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
  }, [
    selectedLevelOfStudy,
    selectedModule,
    selectedProgram,
    selectedSemester,
    selectedYearOfStudy,
    selectedDepartments,
  ]);

  const coursesToDisplay =
    coursesToShow.length > 0 ? coursesToShow : allCourses;

  const [currentPage, setcurrentPage] = useState(0);
  var numberOfPages = Math.ceil(coursesToDisplay.length / 10);

  const sortDataAtoZ = () => {
    const sortedData = [...coursesToDisplay];
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
    setCoursesToShow(sortedData);
    setAllCourses(sortedData);
  };

  const sortDataZtoA = () => {
    //coursesToDisplay ili coursesToShow???
    const sortedData = [...coursesToDisplay];
    sortedData.sort((a, b) => -a.name.localeCompare(b.name));
    setCoursesToShow(sortedData);
    setAllCourses(sortedData);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const testiraj = () => {
    alert(selectedLevelOfStudy);
  };
  const handleLevelOfStudyChange = (event) => {
    const selectedLevel = event.target.value;
    setSelectedLevelOfStudy(selectedLevel);
    setSelectedProgram(null);
    setSelectedModule(null);
  };

  const handleProgramChange = (programName) => {
    setSelectedProgram(programName);
    setSelectedModule(null);
  };
  const handleModuleChange = (moduleName) => {
    setSelectedModule(moduleName);
  };
  return (
    <div className="courses-view">
      <div className="courses-view-header">
        <button className="filter-button" onClick={toggleSidebar}>
          <img src="./images/filter-icon.png" alt="" />
          Филтери
        </button>
        {/* <button onClick={testiraj}>testiraj</button> */}
        <p
          className="reset-filter-text"
          onClick={() => {
            setEmptyResponse(false);
            window.location.reload();
          }}
        >
          Ресетуј филтере
        </p>
        {/* ovde bi trebalo da stoji dropdown ali iz nekog razloga bootstrap ne radi*/}
        <Dropdown className="sort-dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Сортирај приказ
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={sortDataZtoA}>
              Сортирај по називу опадајуће
            </Dropdown.Item>
            <Dropdown.Item onClick={sortDataAtoZ}>
              Сортирај по називу растуће
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="course-view-body">
        {isSidebarVisible ? (
          <div className="courses-view-sidebar col-lg-12 col-xs-12">
            {/* НИВО СТУДИЈА*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Ниво студија</b>{" "}
                <img
                  id="level-of-study-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("level-of-study-group")}
                  alt=""
                />
              </h4>
              <div id="level-of-study-group">
                {allLevelsOfStudy.map((levelofstudy, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      value={levelofstudy.levelOfStudyName}
                      name="level_of_study"
                      onChange={handleLevelOfStudyChange}
                    />
                    {levelofstudy.levelOfStudyName}
                  </div>
                ))}
              </div>

              <hr className="filter-box-separator"></hr>
            </div>

            {/* СТУДИЈСКИ ПРОГРАМ*/}
            {selectedLevelOfStudy && (
              <div className="filter-box">
                <h4 className="filter-box-header">
                  <b>Студијски програми</b>
                </h4>
                <div id="programs-group">
                  {allLevelsOfStudy
                    .find(
                      (level) => level.levelOfStudyName === selectedLevelOfStudy
                    )
                    ?.programs.map((program, programIndex) => (
                      <div key={programIndex}>
                        <input
                          type="radio"
                          value={program.programName}
                          name="program"
                          checked={selectedProgram === program.programName}
                          onChange={() =>
                            handleProgramChange(program.programName)
                          }
                        />
                        {program.programName}
                      </div>
                    ))}
                </div>
                <hr className="filter-box-separator"></hr>
              </div>
            )}
            {/* МОДУЛ*/}
            {selectedProgram &&
              allLevelsOfStudy
                .find(
                  (level) => level.levelOfStudyName === selectedLevelOfStudy
                )
                ?.programs.find(
                  (program) => program.programName === selectedProgram
                )?.modules?.length > 0 && ( // Check if modules array is not empty
                <div className="filter-box">
                  <h4 className="filter-box-header">
                    <b>Модули</b>{" "}
                    <img
                      id="module-group-arrow"
                      src="./images/feArrowDown0.png"
                      onClick={() => toggle("module-group")}
                      className="clickable-pointer"
                      alt=""
                    />
                  </h4>
                  <div id="module-group">
                    {allLevelsOfStudy
                      .find(
                        (level) =>
                          level.levelOfStudyName === selectedLevelOfStudy
                      )
                      ?.programs.find(
                        (program) => program.programName === selectedProgram
                      )
                      ?.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex}>
                          <input
                            type="radio"
                            value={module.module}
                            name="module"
                            checked={selectedModule === module.module}
                            onChange={() => handleModuleChange(module.module)}
                          />
                          {module.module}
                        </div>
                      ))}
                  </div>
                  <hr className="filter-box-separator"></hr>
                </div>
              )}

            {/* Семестар*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Семестар</b>{" "}
                <img
                  id="semester-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("semester-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="semester-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="летњи"
                    name="semester"
                    onChange={createCheckboxChangeHandler(
                      selectedSemester,
                      setSelectedSemester
                    )}
                  />{" "}
                  Летњи семестар
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="зимски"
                    name="semester"
                    onChange={createCheckboxChangeHandler(
                      selectedSemester,
                      setSelectedSemester
                    )}
                  />{" "}
                  Зимски семестар
                </div>
              </div>

              <hr className="filter-box-separator"></hr>
            </div>

            {/* Година студија*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Година студија</b>{" "}
                <img
                  id="year-of-study-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("year-of-study-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="year-of-study-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="прва"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Прва
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="друга"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Друга
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="трећа"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Трећа
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="четврта"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Четврта
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {!isSidebarVisible || !isSmallScreen ? (
          <div className="courses-view-cards">
            {emptyResponse ? (
              <div className="cards-not-found">
                <img src="./images/EmptyState.png" alt="" />
                <h2>Није пронађен ниједан курс!</h2>
                <h4>Пробајте да претражите по другим параметрима.</h4>
              </div>
            ) : (
              coursesToDisplay
                .slice(
                  currentPage * 10,
                  currentPage * 10 + 10 < coursesToDisplay.length
                    ? currentPage * 10 + 10
                    : coursesToDisplay.length
                )
                .map((course, index) => (
                  <div
                    key={index}
                    className="courses-view-card clickable"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="courses-view-card-left">
                      <img src="./images/Imagery.png" alt="" />
                    </div>
                    <div className="courses-view-card-right">
                      <h4>
                        <b>{course.name}</b>
                      </h4>
                      <p className="department-card-item">
                        {course.departments.join(", ")}
                      </p>

                      <div className="espb-and-lecturers-card-items">
                        <div className="espb-card-item">
                          <div>
                            <img
                              src="./images/ic_round-star.png"
                              className="courses-view-card-icon"
                              alt=""
                            />
                          </div>
                          <p>{course.espb} ЕСПБ</p>
                        </div>
                        {/* <div className="lecturers-card-item">
                          <div>
                            <img
                              src="./images/clarity_group-solid.png"
                              className="courses-view-card-icon"
                              alt=""
                            />
                          </div>
                          <p>{course.lecturers.join(", ")}</p>
                        </div> */}
                        <div className="program-card-item">
                          <div>
                            <img
                              src="./images/clarity_group-solid.png"
                              className="courses-view-card-icon"
                              alt=""
                            />
                          </div>
                          <p>{course.program}</p>
                        </div>
                      </div>

                      {/* <div className="card-options-group">
                        {course?.status === "обавезан" && (
                          <div className="card-option-mandatory">
                            Обавезан предмет
                          </div>
                        )}
                        {course?.status === "изборни" && (
                          <div className="card-option-optional">
                            Изборни предмет
                          </div>
                        )}

                        {course?.note && (
                          <div className="card-option-condition">
                            <img src="./images/danger.png" alt="" />
                            {course.note}
                          </div>
                        )}

                        <div className="card-option-warning">
                          <img src="./images/warning.png" alt="" />
                          Упозорење везано за курс
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))
            )}

            {!emptyResponse && (
              <div className="pagination">
                <div className="empty-div"></div>
                <div className="arrow-circle-container">
                  <div
                    className="arrow-circle"
                    onClick={() => {
                      if (currentPage > 0) setcurrentPage(currentPage - 1);
                    }}
                  >
                    ←
                  </div>
                  <div
                    className="arrow-circle"
                    onClick={() => {
                      if (currentPage < numberOfPages - 1)
                        setcurrentPage(currentPage + 1);
                    }}
                  >
                    →
                  </div>
                </div>
                <div className="page-counter-container">
                  Страна &nbsp;
                  <div className="page-counter">
                    &nbsp;{currentPage + 1}&nbsp;&nbsp;
                    <div className="triangle-container">
                      <div>▲</div>
                      <div>▼</div>
                    </div>
                    &nbsp;
                  </div>
                  &nbsp; од {numberOfPages}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CoursesView;
