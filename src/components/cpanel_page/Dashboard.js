import React, { useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import server_name from "../../config";
import { Dropdown, DropdownButton } from "react-bootstrap";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const Dashboard = ({ allCourses }) => {
  const [open, setOpen] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);
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
      await axios.delete(`${server_name}/api/courses/${courseIdToDelete}`);

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/update/${courseId}`);
  };

  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Сви нивои студија", value: "1" },
    { name: "Основне академске студије", value: "2" },
    { name: "Мастер академске студије", value: "3" },
    
  ];
  return (
    <div className="dashboard">
      <h1>Контролна табла</h1>

      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-success" : "outline-danger"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Button onClick={() => alert(radioValue)}>klik</Button>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>ИД</th>
            <th>Назив</th>
            <th>Измењено</th>
            <th>Акредитација</th>
            <th>Акције</th>
          </tr>
        </thead>
        <tbody>
          {allCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.course_id}</td>
              <td>{course.name}</td>
              <td>{course.dateUpdated}</td>
              <td>{course.accreditation}</td>
              <td>
                <Button onClick={()=>handleEdit(course._id)}>Измени</Button>
                <Button onClick={() => handleOpen(course._id)}>Уклони</Button>
           
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
