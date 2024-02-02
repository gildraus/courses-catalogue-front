import React, { useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

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
      await axios.delete(
        `http://localhost:3001/api/courses/${courseIdToDelete}`
      );

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/update/${courseId}`);
  };

  return (
    <div className="dashboard">
      <h1>Контролна табла</h1>
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
                <Button onClick={() => handleEdit(course.course_id)}>
                  Измени
                </Button>
                <Button onClick={() => handleOpen(course.course_id)}>
                  Уклони
                </Button>
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
