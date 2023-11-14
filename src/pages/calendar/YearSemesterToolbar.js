// YearSemesterToolbar.js

import React from 'react';
import YearDropdown from './selectYeardropdown'; // Import the YearDropdown component
import SemesterDropdown from './selectsemesterdropdown'; // Import the SemesterDropdown component

const YearSemesterToolbar = ({ onSelectYear, onSelectSemester }) => {
  return (
    <div className="custom-toolbar">
      <div className="rbc-btn-group">
        <div className="tab">
          <label>
            <YearDropdown onSelectYear={onSelectYear} />
            <SemesterDropdown onSelectSemester={onSelectSemester} />
          </label>
        </div>
      </div>
      <div className="rbc-toolbar-label">Year and Semester View</div>
    </div>
  );
};

export default YearSemesterToolbar;
