import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './pages/calendar/Calendar';
import InputData from './pages/inputData/InputData';

function App() {
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
