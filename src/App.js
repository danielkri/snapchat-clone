import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Routes>
          <Route exact path="/" element={<WebcamCapture />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
