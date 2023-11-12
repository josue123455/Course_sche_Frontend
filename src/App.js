import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './pages/calendar/Calendar';
import InputData from './pages/inputData/InputData';
const http = require('./functions/http');

function App() {
  http.createCourse({
    subject: "CS",
    courseNumber: "101",
    title: "Intro to CS",
    description: "Intro to CS. Available for all students."
});
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/InputData" element={<InputData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
