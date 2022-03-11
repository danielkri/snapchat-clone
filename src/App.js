import { Switch } from "@material-ui/core";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Routes>
          <Route exact path="/" element={<WebcamCapture />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
