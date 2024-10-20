// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gacha from "./page/Gacha";
import Result from "./page/Result";
import "./css/styles.scss";

function App() {
  return (
    <Router>
      <div className="body">
        <Routes>
          <Route path="/" element={<Gacha />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
