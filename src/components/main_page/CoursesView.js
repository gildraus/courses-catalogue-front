import "../../styles/CoursesView.css";
import Dropdown from "react-bootstrap/Dropdown";
import CloseButton from "react-bootstrap/CloseButton";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SkeletonCourseCard from "../skeletons/SkeletonCourseCard";
import SkeletonSidebarCard from "../skeletons/SkeletonSidebarCard";
import { useNavigate } from "react-router-dom";

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
  isLoadingLevelsOfStudy,
  tagsToSearch,
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
  setIsLoadingLevelsOfStudy,
  fetchFilteredCourses,
  isLoadingCourses,
  setTagsToSearch,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState([false]);
  const navigate = useNavigate();

  const addTagToSearchCriterias = (tag) => {
    if (!tagsToSearch.includes(tag)) {
      setTagsToSearch((prevTags) => [...prevTags, tag]);
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tagsToSearch.filter((tag) => tag !== tagToRemove);
    setTagsToSearch(updatedTags);
  };

  const handleCourseOpen = (courseId) => {
    navigate(`/${courseId}`);
  };

  function toggle(groupName) {
    var element = document.getElementById(groupName);
    var arrow = document.getElementById(groupName + "-arrow");
    var isVisible = element.classList.toggle("show");

    arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
    element.style.maxHeight = isVisible ? "500px" : "0";
    element.style.opacity = isVisible ? "1" : "0";
  }

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
    tagsToSearch,
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
    const selectedLevel = event ? event.target.value : undefined;
    setSelectedLevelOfStudy(selectedLevel);
    setSelectedProgram(null);
    setSelectedModule(null);
  };

  const handleLevelOfStudyUncheck = () => {
    const radioButtons = document.getElementsByName("level_of_study");
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
    setSelectedLevelOfStudy(undefined);
    setSelectedProgram(null);
    setSelectedModule(null);
  };

  const handleProgramChange = (programName) => {
    setSelectedProgram(programName);
    setSelectedModule(null);
  };

  const handleProgramUncheck = () => {
    const radioButtons = document.getElementsByName("program");
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
    setSelectedProgram(null);
    setSelectedModule(null);
  };
  const handleModuleChange = (moduleName) => {
    setSelectedModule(moduleName);
  };

  const handleModuleUncheck = () => {
    const radioButtons = document.getElementsByName("module");
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
    setSelectedModule([]);
  };

  const handleSemesterUncheck = () => {
    const buttons = document.getElementsByName("semester");
    buttons.forEach((button) => {
      button.checked = false;
    });
    setSelectedSemester([]);
  };

  const handleYearOfStudyUncheck = () => {
    const buttons = document.getElementsByName("year_of_study");
    buttons.forEach((button) => {
      button.checked = false;
    });
    setSelectedYearOfStudy([]);
  };

  const TagList = ({ tags }) => {
    if (!tags || tags.length === 0) {
      return <p>Предмет још увек нема тагова</p>;
    }

    const firstThreeTags = tags.slice(0, 3);

    return (
      <div>
        {firstThreeTags.map((tag, index) => (
          <div
            className="tag-card"
            key={index}
            onClick={(event) => {
              event.stopPropagation(); //this will prevent trigger for opening CourseDetails
              addTagToSearchCriterias(tag);
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="courses-view">
      <div className="courses-view-header">
        <button className="filter-button" onClick={toggleSidebar}>
          <img src="./images/filter-icon.png" alt="" />
          Филтери
        </button>

        <p
          className="reset-filter-text"
          onClick={() => {
            setEmptyResponse(false);
            window.location.reload();
          }}
        >
          Ресетуј филтере
        </p>

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
      <div className="courses-view-filters-row">
        {" "}
        {/* Level of study applied filter */}
        {selectedLevelOfStudy && (
          <button className="active-filter">
            <span>{selectedLevelOfStudy}</span>
            <CloseButton
              className="active-filter-close-btn"
              onClick={handleLevelOfStudyUncheck}
            />
          </button>
        )}
        {/* Program applied filter */}
        {selectedProgram && (
          <button className="active-filter">
            {" "}
            <span>{selectedProgram}</span>
            <CloseButton
              className="active-filter-close-btn"
              onClick={handleProgramUncheck}
            />
          </button>
        )}
        {/* Module applied filter */}
        {selectedModule != null && selectedModule.length > 0 && (
          <button className="active-filter">
            <span>{selectedModule}</span>
            <CloseButton onClick={handleModuleUncheck} />
          </button>
        )}
        {selectedSemester != null && selectedSemester.length > 0 && (
          <button className="active-filter">
            <span>{selectedSemester}</span>
            <CloseButton onClick={handleSemesterUncheck} />
          </button>
        )}
        {selectedYearOfStudy != null && selectedYearOfStudy.length > 0 && (
          <button className="active-filter">
            <span>{selectedYearOfStudy}</span>
            <CloseButton onClick={handleYearOfStudyUncheck} />
          </button>
        )}
        {tagsToSearch != null &&
          tagsToSearch.length > 0 &&
          tagsToSearch.map((tag, index) => (
            <button className="active-filter">
              <span>{tag}</span>
              <CloseButton onClick={() => handleRemoveTag(tag)} />
            </button>
          ))}
      </div>

      <div className="course-view-body">
        {isSidebarVisible ? (
          isLoadingLevelsOfStudy ? (
            <div className="courses-view-sidebar col-lg-12 col-xs-12">
              <SkeletonSidebarCard />
              <hr className="filter-box-separator"></hr>
              <SkeletonSidebarCard />
              <hr className="filter-box-separator"></hr>
              <SkeletonSidebarCard />
            </div>
          ) : (
            <div className="courses-view-sidebar col-lg-12 col-xs-12">
              <div className="filter-box">
                <h4
                  className="filter-box-header"
                  onClick={() => toggle("level-of-study-group")}
                >
                  <b>Ниво студија</b>{" "}
                  <img
                    id="level-of-study-group-arrow"
                    src="./images/feArrowDown0.png"
                    alt=""
                  />
                </h4>
                <div
                  id="level-of-study-group"
                  className="filter-box-content show"
                >
                  {allLevelsOfStudy.map((levelofstudy, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        value={levelofstudy.levelOfStudyName}
                        name="level_of_study"
                        onChange={handleLevelOfStudyChange}
                      />{" "}
                      {levelofstudy.levelOfStudyName}
                    </div>
                  ))}
                </div>
                <hr className="filter-box-separator"></hr>
              </div>

              {/* СТУДИЈСКИ ПРОГРАМ*/}
              {selectedLevelOfStudy && (
                <div className="filter-box">
                  <h4
                    className="filter-box-header"
                    onClick={() => toggle("programs-group")}
                  >
                    <b>Студијски програми</b>{" "}
                    <img
                      id="programs-group-arrow"
                      src="./images/feArrowDown0.png"
                      alt=""
                    />
                  </h4>
                  <div id="programs-group" className="filter-box-content show">
                    {allLevelsOfStudy
                      .find(
                        (level) =>
                          level.levelOfStudyName === selectedLevelOfStudy
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
                          />{" "}
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
                    <h4
                      className="filter-box-header"
                      onClick={() => toggle("module-group")}
                    >
                      <b>Модули</b>{" "}
                      <img
                        id="module-group-arrow"
                        src="./images/feArrowDown0.png"
                        alt=""
                      />
                    </h4>
                    <div id="module-group" className="filter-box-content show">
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
                            />{" "}
                            {module.module}
                          </div>
                        ))}
                    </div>
                    <hr className="filter-box-separator"></hr>
                  </div>
                )}

              {/* Семестар*/}
              <div className="filter-box">
                <h4
                  className="filter-box-header"
                  onClick={() => toggle("semester-group")}
                >
                  <b>Семестар</b>{" "}
                  <img
                    id="semester-group-arrow"
                    src="./images/feArrowDown0.png"
                    alt=""
                  />
                </h4>
                <div id="semester-group" className="filter-box-content show">
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
              <div>
                {(!selectedLevelOfStudy ||
                  selectedLevelOfStudy !== "Мастер академске студије") && (
                  <div className="filter-box">
                    <h4
                      className="filter-box-header"
                      onClick={() => toggle("year-of-study-group")}
                    >
                      <b>Година студија</b>
                      <img
                        id="year-of-study-group-arrow"
                        src="./images/feArrowDown0.png"
                        alt=""
                      />
                    </h4>
                    <div
                      id="year-of-study-group"
                      className="filter-box-content show"
                    >
                      <div>
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
                )}
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}

        {!isSidebarVisible || !isSmallScreen ? (
          isLoadingCourses ? (
            <div className="courses-view-cards">
              <SkeletonCourseCard />
              <SkeletonCourseCard />
              <SkeletonCourseCard />
            </div>
          ) : (
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
                      onClick={() => handleCourseOpen(course._id)}
                    >
                      <div className="courses-view-card-left">
                        {/* if picture does exist then render it else render default picture */}
                        {course &&
                        course.thumbnail_url &&
                        course.thumbnail_url !== "" ? (
                          <img
                            src={course.thumbnail_url}
                            onError={(e) =>
                              (e.target.src = "./images/Imagery.png")
                            }
                            alt="Course Thumbnail"
                          />
                        ) : (
                          <img
                            src="./images/Imagery.png"
                            alt="Default Thumbnail"
                          />
                        )}
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
                                src="./images/ects-icon.png"
                                className="courses-view-card-icon"
                                alt="ЕСПБ"
                              />
                            </div>
                            <p>{course.espb} ЕСПБ</p>
                          </div>

                          <div className="program-card-item">
                            <TagList tags={course.tags} />
                          </div>
                        </div>
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
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CoursesView;
