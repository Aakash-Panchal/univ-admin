import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/Pages/HomePage";
import SponsorPage from "./Components/Pages/SponsorPage";
import Teams from "./Components/Pages/Teams";
import "./App.scss";

function App() {
  return (
    <>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="/team" element={<Teams />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
