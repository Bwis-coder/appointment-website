import { Home, Appointment, MainAuth } from "./component/index.js";
import { Routes, Route } from "react-router-dom";

import "./App.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< MainAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default App;
