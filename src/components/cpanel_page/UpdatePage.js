import "../../styles/Form.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/main_page/Footer";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

const UpdatePage = ({ allCourses, allModules, allDepartments }) => {
  const [course, setCourse] = useState(undefined);

  const [courseID, setCourseID] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [studies, setStudies] = useState([]);
  const [accreditation, setAccreditation] = useState(undefined);
  const [semester, setSemester] = useState(undefined);
  const [levelOfStudy, setLevelOfStudy] = useState(undefined);
  const [modules, setModules] = useState([]);
  const [yearsOfStudy, setYearsOfStudy] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [espb, setEspb] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [typeOfExam, setTypeOfExam] = useState(undefined);
  const [typeOfLecture, setTypeOfLecture] = useState(undefined);
  const [lecturers, setLecturers] = useState([]);
  const [lectureSessionTimes, setLectureSessionTimes] = useState([]);
  const [exerciseSessionTimes, setExerciseSessionTimes] = useState([]);
  const [preconditions, setPreconditions] = useState([]);
  const [periodicity, setPeriodicity] = useState(undefined);
  const [abstract, setAbstract] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [objective, setObjective] = useState(undefined);
  const [note, setNote] = useState(undefined);
  const [literatures, setLiteratures] = useState([]);
  const [tags, setTags] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [link, setLink] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  const { id } = useParams();

  const [studieISIT, setStudieISIT] = useState(false);
  const [studieMEN, setStudieMEN] = useState(false);
  const [lecturerInputValue, setLecturerInputValue] = useState("");
  const [lectureSessionTimeInputValue, setLectureSessionTimeInputValue] =
    useState("");
  const [exerciseSessionTimeInputValue, setExerciseSessionTimeInputValue] =
    useState("");
  const [preconditionInputValue, setPreconditionInputValue] = useState("");
  const [literatureInputValue, setLiteratureInputValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const [restrictionInputValue, setRestrictionInputValue] = useState("");

  useEffect(() => {
    document.title = "Ажурирање курса";
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:3001/api/courses/${id}`
          );
          setCourse(response.data);
          setCourseID(response.data.course_id);
          setName(response.data.name);
          setTypeOfLecture(response.data.type_of_lecture);
          setAbstract(response.data.abstract);
          setContent(response.data.content);
          setObjective(response.data.objective);
          setNote(response.data.note);
          setLink(response.data.link);
          setVideo(response.data.video);
          setModules(response.data.modules);
          setYearsOfStudy(response.data.year_of_study);
          setDepartments(response.data.departments);
          setLecturers(response.data.lecturers);
          setLectureSessionTimes(response.data.lecture_session_time);
          setExerciseSessionTimes(response.data.exercise_session_time);
          setPreconditions(response.data.preconditions);
          setLiteratures(response.data.literature);
          setTags(response.data.tags);
          setRestrictions(response.data.restrictions);
          setAccreditation(response.data.accreditation);
          setSemester(response.data.semester);
          setLevelOfStudy(response.data.level_of_study);
          setStatus(response.data.status);
          setEspb(response.data.espb);
          setTypeOfExam(response.data.type_of_exam);
          setPeriodicity(response.data.periodicity);
          setStudies(response.data.studies);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  const fillTheUpdatePage = () => {
    setCourseID(course.name);
  };

  const addModule = (event) => {
    const selectedItem = event.target.textContent;
    if (!modules.includes(selectedItem)) {
      setModules((prevItems) => [...prevItems, selectedItem]);
    }
  };

  const addDepartment = (event) => {
    const selectedItem = event.target.textContent;
    if (!departments.includes(selectedItem)) {
      setDepartments((prevItems) => [...prevItems, selectedItem]);
    }
  };
  const addYearOfStudy = (event) => {
    const selectedItem = event.target.textContent;
    if (!yearsOfStudy.includes(selectedItem)) {
      setYearsOfStudy((prevItems) => [...prevItems, selectedItem]);
    }
  };
  const addLecturer = () => {
    if (
      lecturerInputValue.trim() !== "" &&
      !lecturers.includes(lecturerInputValue)
    ) {
      setLecturers((prevItems) => [...prevItems, lecturerInputValue]);
      setLecturerInputValue("");
    }
  };

  const removeLecturer = (index) => {
    setLecturers((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const addLectureSessionTime = () => {
    if (
      lectureSessionTimeInputValue.trim() !== "" &&
      !lectureSessionTimes.includes(lectureSessionTimeInputValue)
    ) {
      setLectureSessionTimes((prevItems) => [
        ...prevItems,
        lectureSessionTimeInputValue,
      ]);
      setLectureSessionTimeInputValue("");
    }
  };

  const removeLectureSessionTime = (index) => {
    setLectureSessionTimes((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );
  };
  const addExerciseSessionTime = () => {
    if (
      exerciseSessionTimeInputValue.trim() !== "" &&
      !exerciseSessionTimes.includes(exerciseSessionTimeInputValue)
    ) {
      setExerciseSessionTimes((prevItems) => [
        ...prevItems,
        exerciseSessionTimeInputValue,
      ]);
      setExerciseSessionTimeInputValue("");
    }
  };

  const removeExerciseSessionTime = (index) => {
    setExerciseSessionTimes((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );
  };

  const addPrecondition = () => {
    if (
      preconditionInputValue.trim() !== "" &&
      !preconditions.includes(preconditionInputValue)
    ) {
      setPreconditions((prevItems) => [...prevItems, preconditionInputValue]);
      setPreconditionInputValue("");
    }
  };

  const removePrecondition = (index) => {
    setPreconditions((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const addLiterature = () => {
    if (
      literatureInputValue.trim() !== "" &&
      !literatures.includes(literatureInputValue)
    ) {
      setLiteratures((prevItems) => [...prevItems, literatureInputValue]);
      setLiteratureInputValue("");
    }
  };

  const removeLiterature = (index) => {
    setLiteratures((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInputValue.trim() !== "" && !tags.includes(tagInputValue)) {
      setTags((prevItems) => [...prevItems, tagInputValue]);
      setTagInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const addRestriction = () => {
    if (
      restrictionInputValue.trim() !== "" &&
      !restrictions.includes(restrictionInputValue)
    ) {
      setRestrictions((prevItems) => [...prevItems, restrictionInputValue]);
      setRestrictionInputValue("");
    }
  };

  const removeRestriction = (index) => {
    setRestrictions((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleTypeOfExam = (selectedValue) => {
    setTypeOfExam((prevType) =>
      prevType === selectedValue ? undefined : selectedValue
    );
  };
  const handlePeriodicity = (selectedValue) => {
    setPeriodicity((prevPeriodicity) =>
      prevPeriodicity === selectedValue ? undefined : selectedValue
    );
  };
  const handleAccreditationChange = (selectedValue) => {
    setAccreditation((prevAccreditation) =>
      prevAccreditation === selectedValue ? undefined : selectedValue
    );
  };

  const handleSemesterChange = (selectedValue) => {
    setSemester((prevSemester) =>
      prevSemester === selectedValue ? undefined : selectedValue
    );
  };

  const handleLevelOfStudyChange = (selectedValue) => {
    setLevelOfStudy((prevLevel) =>
      prevLevel === selectedValue ? undefined : selectedValue
    );
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus((prevStatus) =>
      prevStatus === selectedStatus ? undefined : selectedStatus
    );
  };

  const handleEspbChange = (selectedEspb) => {
    setEspb((prevEspb) =>
      prevEspb === selectedEspb ? undefined : selectedEspb
    );
  };
  const handleCheckboxChange = (value) => {
    if (studies.includes(value)) {
      setStudies((prevStudies) =>
        prevStudies.filter((study) => study !== value)
      );
    } else {
      setStudies((prevStudies) => [...prevStudies, value]);
    }
  };

  const handleTestClick = () => {
    alert(
      "id: " +
        courseID +
        " \n name:" +
        name +
        " \n studies" +
        studies +
        " \n accreditation" +
        accreditation +
        " \n semester" +
        semester +
        " \n levelOfStudy" +
        levelOfStudy +
        " \n modules" +
        modules +
        " \n yearsOfStudy" +
        yearsOfStudy +
        " \n status" +
        status +
        " \n espb" +
        espb +
        " \n departments" +
        departments +
        " \n typeOfExam" +
        typeOfExam +
        " \n typeOfLecture" +
        typeOfLecture +
        " \n lecturers" +
        lecturers +
        " \n lectureSessionTimes" +
        lectureSessionTimes +
        " \n exerciseSessionTimes" +
        exerciseSessionTimes +
        " \n preconditions" +
        preconditions +
        " \n periodicity" +
        periodicity +
        " \n abstract" +
        abstract +
        " \n content" +
        content +
        " \n objective" +
        objective +
        " \n note" +
        note +
        " \n literatures" +
        literatures +
        " \n tagovi" +
        tags +
        " \n restrictions" +
        restrictions +
        " \n link" +
        link +
        " \n video" +
        video
    );
  };

  const testiraj = () => {
    alert(course);
  };
  return (
    <div className="form">
      <div className="header">
        <div className="separator"></div>
        <div className="header-text">KATALOG KURSEVA</div>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h1>
            {course ? (
              <>
                Ажурирање курса <p style={{ color: "blue" }}>{course.name}</p>
              </>
            ) : (
              "Loading..."
            )}
          </h1>
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Основни подаци</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              ИД Курса
              <input
                type="text"
                placeholder="Унесите ИД Курса"
                className="input"
                name=""
                value={courseID || ""}
                onChange={(e) => setCourseID(e.target.value)}
                required
              />
            </div>

            <div className="form-box-row-element">
              Назив
              <input
                type="text"
                placeholder="Унесите назив курса"
                className="input"
                name=""
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Смер
              <div className="checkbox-options">
                <div>
                  <input
                    type="checkbox"
                    value="Информациони системи и технологије"
                    name="level_of_study"
                    checked={studies.includes("ИСИТ")}
                    onChange={() => handleCheckboxChange("ИСИТ")}
                  />{" "}
                  Информациони системи и технологије
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Менаџмент и организаија"
                    name="level_of_study"
                    checked={studies.includes("МЕН")}
                    onChange={() => handleCheckboxChange("МЕН")}
                  />{" "}
                  Менаџмент и организација
                </div>
              </div>
            </div>

            <div className="form-box-row-element">
              Акредитација
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {accreditation ? accreditation : "Изаберите акредитацију"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleAccreditationChange("2014")}
                  >
                    2014
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleAccreditationChange("2022")}
                  >
                    2022
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Академске информације</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Семестар
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {semester ? semester : "Изаберите семестар"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSemesterChange("зимски")}>
                    зимски
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSemesterChange("летњи")}>
                    летњи
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="form-box-row-element">
              Ниво студија
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {levelOfStudy ? levelOfStudy : "Изаберите ниво студија"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      handleLevelOfStudyChange("Основне академске студије")
                    }
                  >
                    Основне академске студије
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleLevelOfStudyChange("Мастер академске студије")
                    }
                  >
                    Мастер академске студије
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleLevelOfStudyChange(
                        "Специјалистичке академске студије"
                      )
                    }
                  >
                    Специјалистичке академске студије
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleLevelOfStudyChange("Докторске студије")
                    }
                  >
                    Докторске студије
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Модул
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Изаберите модул
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {allModules.map((modul, index) => (
                    <Dropdown.Item key={index} onClick={addModule}>
                      {modul.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {modules.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <div className="form-box-row-element">
              Година студија
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Изаберите годину студија
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" onClick={addYearOfStudy}>
                    1
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={addYearOfStudy}>
                    2
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="3" onClick={addYearOfStudy}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={addYearOfStudy}>
                    4
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {yearsOfStudy.map((year, index) => (
                <p key={index}>{year}</p>
              ))}
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Статус предмета
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {status ? status : "Изаберите статус"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleStatusChange("обавезан")}>
                    обавезан
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange("изборни")}>
                    изборни
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="form-box-row-element">
              ESPB
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {espb ? espb : "Изаберите ESPB"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEspbChange("3")}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEspbChange("4")}>
                    4
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEspbChange("5")}>
                    5
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEspbChange("6")}>
                    6
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="form-box-row-element">
              Катедра
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Изаберите катедру
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {allDepartments.map((department, index) => (
                    <Dropdown.Item onClick={addDepartment} key={index}>
                      {department.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {departments.map((department, index) => (
                <p key={index}>{department}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Информације о настави</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Тип полагања
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {typeOfExam ? typeOfExam : "Изаберите тип полагања"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleTypeOfExam("писмено")}>
                    писмено
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleTypeOfExam("усмено")}>
                    усмено
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleTypeOfExam("писмено + усмено")}
                  >
                    писмено + усмено
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="form-box-row-element">
              Тип наставе
              <input
                type="text"
                placeholder="Унесите тип наставе"
                className="input"
                name=""
                value={typeOfLecture || ""}
                onChange={(e) => setTypeOfLecture(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Предавач
              <input
                type="text"
                placeholder="Унесите предавача"
                className="input"
                name=""
                value={lecturerInputValue}
                onChange={(e) => setLecturerInputValue(e.target.value)}
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addLecturer}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>
          <div className="added-elements">
            {lecturers.map((lecturer, index) => (
              <div className="element" key={index}>
                {lecturer}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeLecturer(index)}
                />
              </div>
            ))}
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Термин предавања
              <input
                type="text"
                placeholder="Унесите термин предавања"
                className="input"
                name=""
                value={lectureSessionTimeInputValue}
                onChange={(e) =>
                  setLectureSessionTimeInputValue(e.target.value)
                }
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addLectureSessionTime}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>

          <div className="added-elements">
            {lectureSessionTimes.map((time, index) => (
              <div className="element" key={index}>
                {time}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeLectureSessionTime(index)}
                />
              </div>
            ))}
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Термин вежби
              <input
                type="text"
                placeholder="Унесите термин вежби"
                className="input"
                name=""
                value={exerciseSessionTimeInputValue}
                onChange={(e) =>
                  setExerciseSessionTimeInputValue(e.target.value)
                }
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addExerciseSessionTime}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>
          <div className="added-elements">
            {exerciseSessionTimes.map((time, index) => (
              <div className="element" key={index}>
                {time}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeExerciseSessionTime(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Додатни детаљи о курсу</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Предуслов
              <input
                type="text"
                placeholder="Унесите предуслов"
                className="input"
                name=""
                value={preconditionInputValue}
                onChange={(e) => setPreconditionInputValue(e.target.value)}
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addPrecondition}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>

          <div className="added-elements">
            {preconditions.map((precondition, index) => (
              <div className="element" key={index}>
                {precondition}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removePrecondition(index)}
                />
              </div>
            ))}
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Периодичност
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {periodicity ? periodicity : "Изаберите периодичност "}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handlePeriodicity("једносеместрално")}
                  >
                    једносеместрално
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handlePeriodicity("двосеместрално")}
                  >
                    двосеместрално
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-description-element">
              Сажетак курса
              <input
                type="text"
                placeholder="Унесите сажетак курса"
                className="input description"
                name=""
                value={abstract || ""}
                onChange={(e) => setAbstract(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-box-row">
            <div className="form-box-row-description-element">
              Садржај курса
              <input
                type="text"
                placeholder="Унесите садржај курса"
                className="input description"
                name=""
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-description-element">
              Циљ курса
              <input
                type="text"
                placeholder="Унесите циљ курса"
                className="input description"
                name=""
                value={objective || ""}
                onChange={(e) => setObjective(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-box-row">
            <div className="form-box-row-description-element">
              Напомена
              <input
                type="text"
                placeholder="Унесите напомену везану за курс"
                className="input description"
                name=""
                value={note || ""}
                onChange={(e) => setNote(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Ставка литературе
              <input
                type="text"
                placeholder="Додајте ставку литературе"
                className="input"
                name=""
                value={literatureInputValue}
                onChange={(e) => setLiteratureInputValue(e.target.value)}
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addLiterature}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>

          <div className="added-elements">
            {literatures.map((literature, index) => (
              <div className="element" key={index}>
                {literature}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeLiterature(index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Додатни детаљи о курсу</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Таг
              <input
                type="text"
                placeholder="Додајте тагове"
                className="input"
                name=""
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addTag}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>
          <div className="added-elements">
            {tags.map((tag, index) => (
              <div className="element" key={index}>
                {tag}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeTag(index)}
                />
              </div>
            ))}
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Рестрикција
              <input
                type="text"
                placeholder="Додајте рестрикцију"
                className="input"
                name=""
                value={restrictionInputValue}
                onChange={(e) => setRestrictionInputValue(e.target.value)}
                required
              />
            </div>
            <div className="dropdown-plus" onClick={addRestriction}>
              <b>
                <h4>+</h4>
              </b>
            </div>
          </div>
          <div className="added-elements">
            {restrictions.map((restriction, index) => (
              <div className="element" key={index}>
                {restriction}
                <img
                  src="../../../images/delete.png"
                  alt="Delete element"
                  onClick={() => removeRestriction(index)}
                />
              </div>
            ))}
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Линк ка веб сајту
              <input
                type="text"
                placeholder="Унесите линк ка веб сајту"
                className="input"
                name=""
                value={link || ""}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            <div className="form-box-row-element">
              Линк ка промо видеу
              <input
                type="text"
                placeholder="Унесите линк ка промо видеу"
                className="input"
                name=""
                value={video || ""}
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-buttons-container">
          <button className="save-btn">
            <img src="../../../images/submit ico.png" alt="Сачувај" />
            Ажурирај
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePage;
