// CourseDropdown.js

import React, { Component } from 'react';
import { getCourse } from '../../functions/http'; // Import the getCourse method

class CoursenumberDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  async componentDidMount() {
    try {
      const courseData = await getCourse();
      if (courseData) {
        this.setState({ courses: courseData });
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
      // Handle errors, e.g., show an error message to the user
    }
  }

  render() {
    const { onSelectCourse } = this.props;
    const { courses } = this.state;

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
        <option value="">Select Course</option>

        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.subject + ' - ' + course.courseNumber + ' - ' + course.title}
          </option>
        ))}
      </select>
    );
  }
}

export default CoursenumberDropdown;

