import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NewCourseForm from "../form_page/NewCourseForm";
import server_name from "../../config";
import Spinner from "react-bootstrap/Spinner";
import { Button, Dropdown } from "react-bootstrap";
import "../../styles/Dashboard.css";
import Footer from "../main_page/Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const UpdateCourse = ({
  allLevelsOfStudy,
  allPrograms,
  allModules,
  allDepartments,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [courseID, setCourseID] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [semester, setSemester] = useState(undefined);
  const [levelOfStudy, setLevelOfStudy] = useState(undefined);
  const [program, setProgram] = useState(undefined);
  const [module, setModule] = useState(undefined);
  const [modules, setModules] = useState([]);
  const [yearsOfStudy, setYearsOfStudy] = useState([]);
  const [yearOfStudy, setYearOfStudy] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [espb, setEspb] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [lectureSessionTimes, setLectureSessionTimes] = useState([]);
  const [exerciseSessionTimes, setExerciseSessionTimes] = useState([]);
  const [open, setOpen] = useState(false);

  const [description, setDescription] = useState(undefined);
  const [note, setNote] = useState(undefined);
  const [literatures, setLiteratures] = useState([]);
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState(undefined);
  const [video, setVideo] = useState(undefined);

  const [lecturerInputValue, setLecturerInputValue] = useState("");
  const [lectureSessionTimeInputValue, setLectureSessionTimeInputValue] =
    useState("");
  const [exerciseSessionTimeInputValue, setExerciseSessionTimeInputValue] =
    useState("");
  const [literatureInputValue, setLiteratureInputValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");

  const [formData, setFormData] = useState({
    courseID: "",
    name: "",
    semester: "",
    levelOfStudy: "",
    program: "",
    module: "",
    modules: [],
    yearsOfStudy: [],
    yearOfStudy: "",
    status: "",
    espb: "",
    departments: [],
    lecturers: [],
    lectureSessionTimes: [],
    exerciseSessionTimes: [],
    description: "",
    note: "",
    literatures: [],
    tags: [],
    link: "",
    video: "",
  });

  const addDepartmentToFormData = (newDepartment) => {
    if (!formData.departments.includes(newDepartment)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departments: [...prevFormData.departments, newDepartment],
      }));
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      !formData.lecturers.includes(lecturerInputValue)
    ) {
      setLecturers((prevItems) => [...prevItems, lecturerInputValue]);
      setLecturerInputValue("");

      // Dodavanje novog predavača u formData.lecturers
      setFormData((prevFormData) => ({
        ...prevFormData,
        lecturers: [...prevFormData.lecturers, lecturerInputValue],
      }));
    }
  };

  const removeLecturer = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lecturers: prevFormData.lecturers.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
    setLecturers((prevLecturers) =>
      prevLecturers.filter((_, index) => index !== indexToRemove)
    );
  };

  const addLectureSessionTime = () => {
    if (
      lectureSessionTimeInputValue.trim() !== "" &&
      !formData.lectureSessionTimes.includes(lectureSessionTimeInputValue)
    ) {
      setLectureSessionTimes((prevItems) => [
        ...prevItems,
        lectureSessionTimeInputValue,
      ]);

      // Dodavanje novog termina predavanja u formData.lectureSessionTimes
      setFormData((prevFormData) => ({
        ...prevFormData,
        lectureSessionTimes: [
          ...prevFormData.lectureSessionTimes,
          lectureSessionTimeInputValue,
        ],
      }));

      setLectureSessionTimeInputValue(""); // Resetovanje input polja nakon dodavanja
    }
  };

  const removeLectureSessionTime = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lectureSessionTimes: prevFormData.lectureSessionTimes.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const addExerciseSessionTime = () => {
    if (
      exerciseSessionTimeInputValue.trim() !== "" &&
      !formData.exerciseSessionTimes.includes(exerciseSessionTimeInputValue)
    ) {
      setExerciseSessionTimes((prevItems) => [
        ...prevItems,
        exerciseSessionTimeInputValue,
      ]);

      // Dodavanje novog termina vežbi u formData.exerciseSessionTimes
      setFormData((prevFormData) => ({
        ...prevFormData,
        exerciseSessionTimes: [
          ...prevFormData.exerciseSessionTimes,
          exerciseSessionTimeInputValue,
        ],
      }));

      setExerciseSessionTimeInputValue(""); // Resetovanje input polja nakon dodavanja
    }
  };

  const removeExerciseSessionTime = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      exerciseSessionTimes: prevFormData.exerciseSessionTimes.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const addLiterature = () => {
    if (
      literatureInputValue.trim() !== "" &&
      !formData.literatures.includes(literatureInputValue)
    ) {
      setLiteratures((prevItems) => [...prevItems, literatureInputValue]);

      // Dodavanje nove stavke literature u formData.literatures
      setFormData((prevFormData) => ({
        ...prevFormData,
        literatures: [...prevFormData.literatures, literatureInputValue],
      }));

      setLiteratureInputValue(""); // Resetovanje input polja nakon dodavanja
    }
  };

  const removeLiterature = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      literatures: prevFormData.literatures.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const addTag = () => {
    if (tagInputValue.trim() !== "" && !formData.tags.includes(tagInputValue)) {
      setTags((prevItems) => [...prevItems, tagInputValue]);

      // Dodavanje novog taga u formData.tags
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, tagInputValue],
      }));

      setTagInputValue(""); // Resetovanje input polja nakon dodavanja
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, index) => index !== indexToRemove),
    }));
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

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${server_name}/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (courseData) {
      // Postavljanje vrednosti forme na osnovu courseData
      setFormData({
        ...formData,
        courseID: courseData.course_id || "",
        name: courseData.name || "",
        semester: courseData.semester || "",
        levelOfStudy: courseData.level_of_study || "",
        program: courseData.program || "",
        module: courseData.modules.length > 0 ? courseData.modules[0] : "",
        modules: courseData.modules || [],
        yearsOfStudy: courseData.year_of_study || [],
        yearOfStudy:
          courseData.year_of_study.length > 0
            ? courseData.year_of_study[0]
            : "",
        status: courseData.status || "",
        espb: courseData.espb || "",
        departments: courseData.departments || [],
        lecturers: courseData.lecturers || [],
        lectureSessionTimes: courseData.lecture_session_time || [],
        exerciseSessionTimes: courseData.exercise_session_time || [],
        description: courseData.description || "",
        note: courseData.note || "",
        literatures: courseData.literature || [],
        tags: courseData.tags || [],
        link: courseData.link || "",
        video: courseData.video || "",
      });
    }
  }, [courseData]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${server_name}/api/courses/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("Course successfully updated!");
      navigate("/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {courseData ? (
        <div className="form">
          <div className="header">
            <div className="separator"></div>
            <div className="header-text">KATALOG KURSEVA</div>
          </div>

          <div className="form-container">
            <div className="form-header">
              <h1>Ажурирај курс {formData.name}</h1>
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
                    name="courseID"
                    value={formData.courseID}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-box-row-element">
                  Назив
                  <input
                    type="text"
                    placeholder="Унесите назив курса"
                    className="input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-box-row">
                <div className="form-box-row-element">
                  Семестар
                  <Dropdown className="sort-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {formData.semester
                        ? formData.semester
                        : "Изаберите семестар"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "semester", value: "први" },
                          })
                        }
                      >
                        први
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "semester", value: "други" },
                          })
                        }
                      >
                        други
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "semester", value: "трећи" },
                          })
                        }
                      >
                        трећи
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "semester", value: "четврти" },
                          })
                        }
                      >
                        четврти
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="form-box-row-element">
                  Година студија
                  <Dropdown className="sort-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {formData.yearOfStudy
                        ? formData.yearOfStudy
                        : "Изаберите годину студија"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "yearOfStudy", value: "прва" },
                          })
                        }
                      >
                        прва
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "yearOfStudy", value: "друга" },
                          })
                        }
                      >
                        друга
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "yearOfStudy", value: "трећа" },
                          })
                        }
                      >
                        трећа
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "yearOfStudy", value: "четврта" },
                          })
                        }
                      >
                        четврта
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
                      {formData.status ? formData.status : "Изаберите статус"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "status", value: "обавезан" },
                          })
                        }
                      >
                        обавезан
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "status", value: "изборни" },
                          })
                        }
                      >
                        изборни
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="form-box-row-element">
                  ESPB
                  <Dropdown className="sort-dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {formData.espb ? formData.espb : "Изаберите ESPB"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "espb", value: "3" },
                          })
                        }
                      >
                        3
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "espb", value: "4" },
                          })
                        }
                      >
                        4
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "espb", value: "5" },
                          })
                        }
                      >
                        5
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleChange({
                            target: { name: "espb", value: "6" },
                          })
                        }
                      >
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
                        <Dropdown.Item
                          onClick={() =>
                            addDepartmentToFormData(department.name)
                          }
                          key={index}
                        >
                          {department.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {formData.departments.map((department, index) => (
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
                {formData.lecturers.map((lecturer, index) => (
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
                {formData.lectureSessionTimes.map((time, index) => (
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
                {formData.exerciseSessionTimes.map((time, index) => (
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
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
                {formData.literatures.map((literature, index) => (
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
                {formData.tags.map((tag, index) => (
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
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-box-row-element">
                  Линк ка промо видеу
                  <input
                    type="text"
                    placeholder="Унесите линк ка промо видеу"
                    className="input"
                    name="video"
                    value={formData.video}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-buttons-container">
              <button className="cancel-btn">Откажи</button>
              <button className="save-btn" onClick={handleOpen}>
                <img src="../../../images/submit ico.png" alt="Сачувај" />
                Ажурирај
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="modal-box"
                  sx={{ width: "80%", maxHeight: "80%", overflowY: "auto" }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Измењени подаци о курсу:
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>ИД Курса: {formData.courseID}</p>
                    <p>Назив: {formData.name}</p>
                    <p>Семестар: {formData.semester}</p>
                    <p>Ниво студија: {formData.levelOfStudy}</p>
                    <p>Програм: {formData.program}</p>
                    <p>Модул: {formData.module}</p>
                    <p>Година студија: {formData.yearOfStudy}</p>
                    <p>Статус предмета: {formData.status}</p>
                    <p>ESPB: {formData.espb}</p>
                    <p>Катедра: {formData.departments.join(", ")}</p>
                    <p>Предавачи: {formData.lecturers.join(", ")}</p>
                    <p>
                      Термин предавања:{" "}
                      {formData.lectureSessionTimes.join(", ")}
                    </p>
                    <p>
                      Термин вежби: {formData.exerciseSessionTimes.join(", ")}
                    </p>
                    <p>Опис курса: {formData.description}</p>
                    <p>Напомена: {formData.note}</p>
                    <p>Ставка литературе: {formData.literatures.join(", ")}</p>
                    <p>Тагови: {formData.tags.join(", ")}</p>
                    <p>Линк ка веб сајту: {formData.link}</p>
                    <p>Линк ка промо видеу: {formData.video}</p>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="modal-buttons">
                      <button className="save-btn">Потврди измене</button>
                      <button className="cancel-btn" onClick={handleClose}>
                        Откажи измене
                      </button>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>

          <Footer />
        </div>
      ) : (
        <div className="loading-div">
          {" "}
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            ...учитавање
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateCourse;
