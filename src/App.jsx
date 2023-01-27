import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/Pages/HomePage";
import SponsorPage from "./Components/Pages/SponsorPage";
import Teams from "./Components/Pages/Teams";
import Login from "./Components/Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Components/Loader";
import "./App.scss";

function App() {
  const [isLoggedIn, setLogggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "light",
  };

  return (
    <>
      <ToastContainer />
      {!isLoggedIn ? (
        <>
          <Login />
        </>
      ) : (
        <div className="App">
          <Sidebar />
          {/* <Loader loading={loading} /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/sponsor"
              element={
                <SponsorPage toastOptions={toastOptions} toast={toast} />
              }
            />
            <Route path="/team" element={<Teams />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
