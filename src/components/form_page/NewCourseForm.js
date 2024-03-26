import "../../styles/Form.css";
import Footer from "../../components/main_page/Footer";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import server_name from "../../config";
const Form = ({
  allLevelsOfStudy,
  allPrograms,
  allModules,
  allDepartments,
}) => {
  const [courseID, setCourseID] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [semester, setSemester] = useState(undefined);
  const [levelOfStudy, setLevelOfStudy] = useState(undefined);
  const [program, setProgram] = useState(undefined);
  const [module, setModule] = useState(undefined);
  const [modules, setModules] = useState([]);
  const [yearsOfStudy, setYearsOfStudy] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [espb, setEspb] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [lectureSessionTimes, setLectureSessionTimes] = useState([]);
  const [exerciseSessionTimes, setExerciseSessionTimes] = useState([]);
  const [periodicity, setPeriodicity] = useState(undefined);
  const [abstract, setAbstract] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [objective, setObjective] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [note, setNote] = useState(undefined);
  const [literatures, setLiteratures] = useState([]);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  const [studieISIT, setStudieISIT] = useState(false);
  const [studieMEN, setStudieMEN] = useState(false);
  const [lecturerInputValue, setLecturerInputValue] = useState("");
  const [lectureSessionTimeInputValue, setLectureSessionTimeInputValue] =
    useState("");
  const [exerciseSessionTimeInputValue, setExerciseSessionTimeInputValue] =
    useState("");
  const [literatureInputValue, setLiteratureInputValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");

  useEffect(() => {
    document.title = "Унос курса";
  }, []);

  const test = () => {
    alert("proba");
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

  const handlePeriodicity = (selectedValue) => {
    setPeriodicity((prevPeriodicity) =>
      prevPeriodicity === selectedValue ? undefined : selectedValue
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

  const handleProgramChange = (selectedValue) => {
    setProgram((prevProgram) =>
      prevProgram === selectedValue ? undefined : selectedValue
    );
  };

  const handleModuleChange = (selectedValue) => {
    setModule((prevModule) =>
      prevModule === selectedValue ? undefined : selectedValue
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

  const submitForm = async () => {
    try {
      const response = await axios.post(
        `${server_name}/api/courses`,
        {
          courseID: courseID,
          semester: semester,
          name: name,
          levelOfStudy: levelOfStudy,
          moduleItems: modules,
          departmentItems: departments,
          yearOfStudyItems: yearsOfStudy,
          status: status,
          espb: espb,
          lecturerItems: lecturers,
          lectureSessionTimeItems: lectureSessionTimes,
          exerciseSessionTimeItems: exerciseSessionTimes,
          periodicity: periodicity,
          abstract: abstract,
          content: content,
          objective: objective,
          description: description,
          note: note,
          literatureItems: literatures,
          tagItems: tags,
          link: link,
          video: video,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <div className="header">
        <div className="separator"></div>
        <div className="header-text">KATALOG KURSEVA</div>
      </div>

      <div className="form-container">
        <div className="form-header">
          <h1>Унос новог курса</h1>
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
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
        </div>

        <div className="form-box">
          <div className="form-box-header">
            <h4>Академске информације</h4>
          </div>

          <div className="form-box-row">
            <div className="form-box-row-element">
              Ниво студија
              <Dropdown className="sort-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {levelOfStudy
                    ? levelOfStudy.levelOfStudyName
                    : "Изаберите ниво студија"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {allLevelsOfStudy.map((level, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleLevelOfStudyChange(level)}
                    >
                      {level.levelOfStudyName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="form-box-row">
            {levelOfStudy && (
              <div className="form-box-row-element">
                Програм
                <Dropdown className="sort-dropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {program ? program.programName : "Изаберите програм"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {levelOfStudy.programs.map((program, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleProgramChange(program)}
                      >
                        {program.programName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}

            {program && (
              <div className="form-box-row-element">
                Модул
                <Dropdown className="sort-dropdown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {module ? module.module : "Изаберите модул"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {program.modules.map((module, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleModuleChange(module)}
                      >
                        {module.module}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {yearsOfStudy.map((year, index) => (
                  <p key={index}>{year}</p>
                ))}
              </div>
            )}
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
            <div className="form-box-row-description-element">
              Опис курса
              <input
                type="text"
                placeholder="Унесите опис курса"
                className="input description"
                name=""
                onChange={(e) => setDescription(e.target.value)}
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
              Линк ка веб сајту
              <input
                type="text"
                placeholder="Унесите линк ка веб сајту"
                className="input"
                name=""
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
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-buttons-container">
          <button className="cancel-btn">Откажи</button>
          <button className="save-btn" onClick={submitForm}>
            <img src="../../../images/submit ico.png" alt="Сачувај" />
            Сачувај
          </button>
          <button onClick={test}>test</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Form;
