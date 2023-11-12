//button compnent to add a new course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';
import CoursenumberDropdown from './coursenumberdropdown'; // Replace 'path/to' with the correct path to your CoursenumberDropdown component
import { updateCourse } from '../../functions/http'; // Import the updateCourse method


class UpdateCourseButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      courseNumber: '',
      title: '',
      subject: '',
      description: '',
      id: null,
    };
  }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Function to handle selected course
  onSelectCourse = (course) => {
    this.setState({
      courseNumber: course.courseNumber,
      title: course.title,
      subject: course.title,
      description: course.description,
      id: course._id,
    });
  };

  // Function to handle course update
  handleUpdate = async (event) => {
    event.preventDefault();

    if (this.state.courseNumber && this.state.title) {
      await updateCourse(this.state.id, {
        courseNumber: this.state.courseNumber,
        title: this.state.title,
        subject: this.state.subject,
        description: this.state.description,
        _id: this.state.id,
      });
      this.setState({
        showForm: false,
        courseNumber: '',
        subject: '',
        title: '',
        description: '',
      });
    }
  };

  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Update Course
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Select Course:
              {/* Replace the input field with the CoursenumberDropdown component */}
              <CoursenumberDropdown onSelectCourse={this.onSelectCourse} />
            </label>
            <label>
              Update Course Number:
              <input
                type="text"
                name="courseNumber"
                value={this.state.courseNumber}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Update Course Title:
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Update Course Subject:
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Update Course Description:
              <input
                type="text"
                name="subject"
                value={this.state.subject}
                onChange={this.handleInputChange}
              />
            </label>

            {this.state.showForm && <button className='btn btn-primary' onClick={this.handleUpdate}>Update Course</button>}
          </form>
        )}
      </div>
    );
  }
}

export default UpdateCourseButtonComponent;
