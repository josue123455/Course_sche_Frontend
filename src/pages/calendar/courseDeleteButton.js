//button compnent to add a new course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';
import CoursenumberDropdown from './coursenumberdropdown'; // Replace 'path/to' with the correct path to your CoursenumberDropdown component
import { deleteCourse } from '../../functions/http'; // Import the updateCourse method


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
  handleDelete = async (event) => {
    event.preventDefault();

    if (this.state.courseNumber && this.state.title) {
      await deleteCourse(this.state.id, {
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
        <button className='btn btn-dark' onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Delete Course
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='courseNumberSelect' className='form-label'>Select Course:</label>
            <CoursenumberDropdown onSelectCourse={this.onSelectCourse} />
            
            <label htmlFor='subject' className='form-label'>Course Subject:</label>
            <input
              type="text"
              name="description"
              id="description"
              className='form-control'
              value={this.state.subject}
              onChange={this.handleInputChange}
            />

            <label htmlFor='courseNumber' className='form-label'>Course Number:</label>
            <input
              type="text"
              name="courseNumber"
              id="courseNumber"
              className='form-control'
              value={this.state.courseNumber}
              onChange={this.handleInputChange}
            />
            <label htmlFor='title' className='form-label'>Course Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              className='form-control'
              value={this.state.title}
              onChange={this.handleInputChange}
            />

            <label htmlFor='description' className='form-label'>Course Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              className='form-control'
              value={this.state.description}
              onChange={this.handleInputChange}
            />

            {this.state.showForm &&
              <button className='btn btn-danger' onClick={this.handleDelete}>Delete Course</button>}
          </form>
        )}
      </div>
    );
  }
}

export default UpdateCourseButtonComponent;

