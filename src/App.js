import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/main_page/Navbar";
import Footer from "./components/main_page/Footer";
import Searchbar from "./components/main_page/Searchbar";
import CoursesView from "./components/main_page/CoursesView";
import CourseDetails from "./components/main_page/CourseDetails";
import Login from "./components/login_page/Login";
import Form from "./components/form_page/Form";
import NewCourseForm from "./components/form_page/NewCourseForm";
import Dashboard from "./components/cpanel_page/Dashboard";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import server_name from "./config";
import axios from "axios";
import { Button } from "@mui/material";
import UpdatePage from "./components/cpanel_page/UpdatePage";

function App() {
  const [allCourses, setAllCourses] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allModules, setAllModules] = useState([]);
  const [allLevelsOfStudy, setAllLevelsOfStudy] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [coursesToShow, setCoursesToShow] = useState([]);
  const [selectedLevelOfStudy, setSelectedLevelOfStudy] = useState(undefined);
  const [selectedProgram, setSelectedProgram] = useState(undefined);
  const [selectedModule, setSelectedModule] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState([]);
  const [selectedYearOfStudy, setSelectedYearOfStudy] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [coursesOfTheSameName, setCoursesOfTheSameName] = useState([]);

  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingLevelsOfStudy, setIsLoadingLevelsOfStudy] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [emptyResponse, setEmptyResponse] = useState(false);
  const cookies = useCookies(["access_token"])[0];
  const [testData, setTestData] = useState(null);

  const fetchTestData = async () => {
    try {
      const response = await axios.get(`${server_name}/test`);
      setTestData(response.data);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(server_name + "/courses");
      setAllCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(server_name + "/departments");
      setAllDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get(server_name + "/modules");
      setAllModules(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLevelsOfStudy = async () => {
    try {
      const response = await axios.get(server_name + "/levelsofstudy");
      console.log("balbla");

      setAllLevelsOfStudy(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLevelsOfStudy(false);
    }
  };

  const fetchProgram = async () => {
    try {
      const response = await axios.get(server_name + "/programs");
      setAllPrograms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredCourses = async () => {
    try {
      const response = await axios.get(server_name + "/filteredCourses", {
        params: {
          selectedLevelOfStudy,
          selectedProgram,
          selectedModule,
          selectedSemester,
          selectedYearOfStudy,
          selectedDepartments,
        },
      });
      if (response.data.length === 0) {
        setEmptyResponse(true);
      } else {
        setEmptyResponse(false);
        setCoursesToShow(response.data);
      }
    } catch (error) {}
  };

  const isTokenExpired = () => {
    if (cookies.access_token) {
      try {
        const decodedToken = jwtDecode(cookies.access_token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        return decodedToken.exp < currentTime; // Compare with token's expiration time
      } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If token decoding fails, consider it expired
      }
    }
    return true; // No token, consider it expired
  };

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    fetchModules();
    fetchLevelsOfStudy();
  }, []);

  useEffect(() => {
    if (selectedCourse && selectedCourse.name) {
      const filteredCourses = allCourses.filter(
        (item) => item.name === selectedCourse.name
      );
      setCoursesOfTheSameName(filteredCourses);
    }
  }, [selectedCourse, allCourses]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container-fluid">
              <div className="row navbar-row">
                <div className="navbar-container col-sm-12">
                  <Navbar />
                </div>
              </div>

              <div className="App">
                <div className="row">
                  {selectedCourse === undefined ? (
                    <div className="body-container">
                      <Searchbar
                        allCourses={allCourses}
                        coursesToShow={coursesToShow}
                        setCoursesToShow={setCoursesToShow}
                        setSelectedCourse={setSelectedCourse}
                      />
                      <CoursesView
                        allCourses={allCourses}
                        allDepartments={allDepartments}
                        allModules={allModules}
                        allLevelsOfStudy={allLevelsOfStudy}
                        coursesToShow={coursesToShow}
                        selectedLevelOfStudy={selectedLevelOfStudy}
                        selectedProgram={selectedProgram}
                        selectedModule={selectedModule}
                        selectedSemester={selectedSemester}
                        selectedYearOfStudy={selectedYearOfStudy}
                        selectedDepartments={selectedDepartments}
                        selectedCourse={selectedCourse}
                        emptyResponse={emptyResponse}
                        isSidebarVisible={isSidebarVisible}
                        isLoadingCourses={isLoadingCourses}
                        isLoadingLevelsOfStudy={isLoadingLevelsOfStudy}
                        setAllCourses={setAllCourses}
                        setCoursesToShow={setCoursesToShow}
                        setSelectedLevelOfStudy={setSelectedLevelOfStudy}
                        setSelectedProgram={setSelectedProgram}
                        setSelectedModule={setSelectedModule}
                        setSelectedSemester={setSelectedSemester}
                        setSelectedYearOfStudy={setSelectedYearOfStudy}
                        setSelectedDepartments={setSelectedDepartments}
                        setSelectedCourse={setSelectedCourse}
                        setEmptyResponse={setEmptyResponse}
                        setIsSidebarVisible={setIsSidebarVisible}
                        setIsLoadingLevelsOfStudy={setIsLoadingLevelsOfStudy}
                        setIsLoadingCourses={setIsLoadingCourses}
                        fetchFilteredCourses={fetchFilteredCourses}
                      />
                    </div>
                  ) : (
                    <CourseDetails
                      coursesOfTheSameName={coursesOfTheSameName}
                      selectedCourse={selectedCourse}
                      setSelectedCourse={setSelectedCourse}
                    />
                  )}
                </div>

                <div className="row">
                  <Footer />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/form"
          element={
            cookies.access_token && !isTokenExpired() ? (
              <NewCourseForm
                allPrograms={allPrograms}
                allModules={allModules}
                allDepartments={allDepartments}
              />
            ) : (
              // <Form allModules={allModules} allDepartments={allDepartments} />
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            cookies.access_token && !isTokenExpired() ? (
              <Dashboard allCourses={allCourses} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update/:id"
          element={
            cookies.access_token && !isTokenExpired() ? (
              <UpdatePage
                allLevelsOfStudy={allLevelsOfStudy}
                allCourses={allCourses}
                allModules={allModules}
                allDepartments={allDepartments}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
