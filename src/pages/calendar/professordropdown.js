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
    <select
      id='professorSelect'
      className='form-control'
      onChange={(e) => {
        const selectedProfessor = professors.find((professor) => professor._id === e.target.value);
        onSelectProfessor(selectedProfessor);
      }}
      required
    >

      <option disabled selected value="">Select Professor</option>

      {professors.map((professor) => (
        <option key={professor._id} value={professor._id}>
          {professor.name}
        </option>
      ))}
    </select>
  );
};

export default ProfessorDropdown;
