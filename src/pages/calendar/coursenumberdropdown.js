// CourseDropdown.js

import React, { Component } from 'react';
import { getCourse } from '../../functions/http'; // Import the getCourse method

class CoursenumberDropdown extends Component {
  constructor(props) {
    super(props);
    this.selectedCourse = props.selectedCourse;
    console.log("selectedCourse: ", this.selectedCourse);
    this.courses = props.courses;
    this.state = {
      courses: this.courses ? this.courses : [],
      selectedCourse: this.selectedCourse,
    };
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.courses !== this.props.courses) {
      this.setState({ courses: this.props.courses });
    }
    if (prevProps.selectedCourse !== this.props.selectedCourse) {
      this.setState({ selectedCourse: this.props.selectedCourse });
    }
  }

  async componentDidMount() {
    try {
      if (!this.state.courses || this.state.courses.length === 0) {
        const courses = await getCourse();
        if (courses) {
          this.setState({ courses: courses });
        }
      }
      // else
      //   console.log("courses already exists");
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
          this.setState({ selectedCourse: e.target.value });
          const selectedCourse = courses.find((course) => course._id === e.target.value);
          onSelectCourse(selectedCourse);
        }}
        value={this.state.selectedCourse ? this.state.selectedCourse._id : ''}
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

