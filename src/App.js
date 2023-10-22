import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './calendar/Calendar';
import InputData from './calendar/InputData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/InputData" element={<InputData />} />
      </Routes>
    </Router>
  );
}

export default App;
