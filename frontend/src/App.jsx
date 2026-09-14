import { Home, Appointment, MainAuth } from "./Component/renderComponent.js";
import { Routes, Route } from "react-router-dom";

import "./App.css";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default App;
