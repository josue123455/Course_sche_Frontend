// ProfessorDropdown.js

import React, { useState, useEffect } from 'react';
const { getFaculty } = require('../../functions/http')

const ProfessorDropdown = ({ onSelectProfessor }) => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyData = await getFaculty();
        if (facultyData) {
          setProfessors(facultyData); // Set the professors state with the fetched data
        }
      } catch (error) {
        console.error('Error fetching faculty data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }, []); // Run the effect once when the component mounts

  return (
    <select onChange={(e) => onSelectProfessor(e.target.value)}>
      <option value="">Select Professor</option>
      {professors.map((professor) => (
        <option key={professor.id} value={professor.name}>
          {professor.name}
        </option>
      ))}
    </select>
  );
};

export default ProfessorDropdown;