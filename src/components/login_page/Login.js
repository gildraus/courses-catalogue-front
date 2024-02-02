import "../../styles/Login.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["access_token"]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { uname, pass } = event.target.elements;
    const username = uname.value;
    const password = pass.value;

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const { access_token } = response.data;

      // Store the access token in localStorage
      localStorage.setItem("access_token", access_token);

      setCookie("access_token", access_token);
      // Set the submitted state to true for success message
      setIsSubmitted(true);

      // Reset any error messages
      setErrorMessages({});
    } catch (error) {
      console.error("An error occurred:", error);

      // Set error messages based on response
      if (error.response) {
        const { field, message } = error.response.data;
        setErrorMessages({ name: field, message });
      }
    }
  };

  useEffect(() => {
    document.title = "Пријављивање";
    if (isSubmitted) {
      alert("Успешно логовање, у току је преусмеравање...")
      setTimeout(() => {
        navigate("/form");
      }, 2000);
    }
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="login-form-container col-xl-6 col-lg-12">
          <div className="login-form">
            <div>
              <h1 id="login-title">Пријављивање</h1>
              <h4>Пријавите се како бисте уређивали курсеве.</h4>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="username-input-container">
                <p>Корисничко име</p>
                <input
                  type="text"
                  placeholder="Унесите корисничко име"
                  className="input-username"
                  name="uname"
                  required
                />
              </div>
              <div className="password-input-container">
                <p>Корисничка лозинка</p>
                <input
                  type="password"
                  placeholder="Унесите лозинку"
                  className="input-password"
                  name="pass"
                  required
                />
            
              </div>

              <button className="login-button" type="submit">
                Пријави се
              </button>
            </form>
          </div>
        </div>
        <div className="col-xl-6 d-none d-xl-block">
          <div className="login-background">
            <div className="login-header-div">
              <img src="../../images/login-fon-logo.png" />
            </div>
            <div className="login-info-box">
              <div>
                {" "}
                <button className="login-info-button">
                  <img src="../../images/Storytelling.png" />
                  <p>Каталог курсева</p>
                </button>
              </div>
              <div className="login-info-paragraph">
                {" "}
                Каталог курсева пружа свеобухватан преглед предмета који се
                изучавају на ФОН-у, обухватајући различите области као што су
                менаџмент, организација, информациони системи, финансије и многе
                друге.
              </div>
            </div>
            <div className="login-footer-div"></div>

            <div className="footer">
              <div className="footer-body">
                {" "}
                {/* <p>© 2023 Факултет организационих наука | Каталог курсева</p> */}
                <div>
                  <p>© 2023 Факултет организационих наука | </p>
                </div>
                <div>
                  <p className="green-paragraph">&nbsp;Каталог курсева</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="login">

    //       <div className="login-form-container col-lg-6 col-md-8 col-sm-12">
    //         <div className="login-form">
    //           <div>
    //             <h1 id="login-title">Пријављивање</h1>
    //             <h4>Пријавите се како бисте уређивали курсеве.</h4>
    //           </div>

    //           <form onSubmit={handleSubmit}>
    //             <div className="username-input-container">
    //               <p>Корисничко име</p>
    //               <input
    //                 type="text"
    //                 placeholder="Унесите корисничко име"
    //                 className="input-username"
    //                 name="uname"
    //                 required
    //               />
    //             </div>
    //             <div className="password-input-container">
    //               <p>Корисничка лозинка</p>
    //               <input
    //                 type="password"
    //                 placeholder="Унесите лозинку"
    //                 className="input-password"
    //                 name="pass"
    //                 required
    //               />
    //               <p id="forgot-password-text">Заборавили сте лозинку?</p>
    //             </div>

    //             <button className="login-button" type="submit">
    //               Пријави се
    //             </button>
    //           </form>
    //         </div>
    //       </div>

    //       <div className="col-lg-6 col-md-4 col-sm-0 d-none d-sm-block">
    //         <div className="login-background">
    //           <div className="login-header-div">
    //             <img src="../../images/login-fon-logo.png" />
    //           </div>
    //           <div className="login-info-box">
    //             <div>
    //               {" "}
    //               <button className="login-info-button">
    //                 <img src="../../images/Storytelling.png" />
    //                 <p>Каталог курсева</p>
    //               </button>
    //             </div>
    //             <div className="login-info-paragraph">
    //               {" "}
    //               Каталог курсева пружа свеобухватан преглед предмета који се
    //               изучавају на ФОН-у, обухватајући различите области као што су
    //               менаџмент, организација, информациони системи, финансије и многе
    //               друге.
    //             </div>
    //           </div>
    //           <div className="login-footer-div"></div>

    //           <div className="footer">
    //             <div className="footer-body">
    //               {" "}
    //               {/* <p>© 2023 Факултет организационих наука | Каталог курсева</p> */}
    //               <div>
    //                 <p>© 2023 Факултет организационих наука | </p>
    //               </div>
    //               <div>
    //                 <p className="green-paragraph">&nbsp;Каталог курсева</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
