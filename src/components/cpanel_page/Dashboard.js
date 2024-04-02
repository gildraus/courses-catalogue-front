import server_name from "../../config";

import React, { useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Dashboard = ({ allCourses }) => {
  const [open, setOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();

  const handleOpen = (courseId) => {
    setCourseIdToDelete(courseId);
    setOpen(true);
  };

  const handleClose = () => {
    setCourseIdToDelete(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (selectedCourses.length === 0) {
        await axios.delete(`${server_name}/api/courses/${courseIdToDelete}`);
      } else {
        await axios.post(`${server_name}/api/courses/delete`, { courseIds: selectedCourses });
      }
  
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting courses:", error);
    }
  };
  
  

  const handleEdit = (courseId) => {
    navigate(`/update/${courseId}`);
  };

  const [radioValue, setRadioValue] = useState("1");

  const handleRadioChange = (e) => {
    setRadioValue(e.currentTarget.value);
  };

  const handleCheckboxChange = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const filteredCourses = allCourses.filter((course) => {
    if (radioValue === "1") {
      return true; // Prikaži sve kurseve
    } else if (radioValue === "2") {
      return course.level_of_study === "Основне академске студије"; // Prikaži samo kurseve osnovnih akademskih studija
    } else if (radioValue === "3") {
      return course.level_of_study === "Мастер академске студије"; // Prikaži samo kurseve master akademskih studija
    }
  });

  return (
    <div className="dashboard">
      <h1>Контролна табла</h1>

      <ButtonGroup>
        {[
          { name: "Сви нивои студија", value: "1" },
          { name: "Основне академске студије", value: "2" },
          { name: "Мастер академске студије", value: "3" },
        ].map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={handleRadioChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th></th>
            <th>ИД</th>
            <th>Назив</th>

            <th>Акције</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course._id)}
                  onChange={() => handleCheckboxChange(course._id)}
                />
              </td>
              <td>{course.course_id}</td>
              <td>{course.name}</td>

              <td>
                <Button onClick={() => handleEdit(course._id)}>Измени</Button>
                {/* <Button onClick={() => handleOpen(course._id)}>Уклони</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="delete-selected">
        <Button onClick={handleDelete}>Обриши одабране курсеве</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Да ли сте сигурни да желите да избришете одабрани курс?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-buttons">
              <Button onClick={handleDelete}>Да</Button>
              <Button onClick={handleClose}>Не</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
