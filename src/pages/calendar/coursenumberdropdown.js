// CourseDropdown.js

import React, { useState, useEffect } from 'react';
import { getCourse } from '../../functions/http'; // Import the getCourse method

const CoursenumberDropdown = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourse();
        if (courseData) {
          setCourses(courseData);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }, []); // Run the effect once when the component mounts

  return (
    <select
      id='courseNumberSelect'
      className='form-control'
      onChange={(e) => {
        const selectedCourse = courses.find((course) => course._id === e.target.value);
        onSelectCourse(selectedCourse);
      }}
      required
    >
      <option disabled value="">Select Course</option>

      {courses.map((course) => (
        <option key={course._id} value={course._id}>
          {course.subject + ' - ' + course.courseNumber + ' - ' + course.title}
        </option>
      ))}
    </select>
  );
};

export default CoursenumberDropdown;

