import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/Pages/HomePage";
import SponsorPage from "./Components/Pages/SponsorPage";
import Teams from "./Components/Pages/Teams";
import Login from "./Components/Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpertisePage from "./Components/Pages/ExpertisePage";
import Loader from "./Components/Loader";
import "./App.scss";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import BrandsPage from "./Components/Pages/BrandsPage";

function App() {
  const [isLoggedIn, setLogggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "light",
  };

  const verify = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: BaseUrl + "admin/verify",
      headers: {
        username: localStorage.getItem("Univ-Admin-username"),
        password: localStorage.getItem("Univ-Admin-password"),
      },
    })
      .then((response) => {
        setLogggedIn(true);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  useLayoutEffect(() => {
    verify();
  }, []);

  return (
    <>
      <ToastContainer />
      {loading && <Loader isLoggedIn={isLoggedIn} loading={loading} />}
      {!isLoggedIn ? (
        <>
          <Login toastOptions={toastOptions} toast={toast} verify={verify} />
        </>
      ) : (
        <div className="App">
          <Sidebar
            toastOptions={toastOptions}
            toast={toast}
            verify={verify}
            setLogggedIn={setLogggedIn}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/sponsor"
              element={
                <SponsorPage toastOptions={toastOptions} toast={toast} />
              }
            />
            <Route
              path="/brands"
              element={<BrandsPage toastOptions={toastOptions} toast={toast} />}
            />
            <Route
              path="/team"
              element={<Teams toastOptions={toastOptions} toast={toast} />}
            />
            <Route path="/expertise" element={<ExpertisePage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
