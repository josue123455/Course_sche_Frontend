//button compnent to add a new course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';
const { createCourse } = require('../../functions/http')

//using the state button when the button is not clicked the state does not show the text boxes
class Addcoursebutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      courseNumber: '',
      title: '',
      subject: '',
      description: ''
    };
  }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Function to handle form submission


  handleSubmit = async (event) => {
    event.preventDefault();

    await createCourse({
      courseNumber: this.state.courseNumber,
      title: this.state.title,
      subject: this.state.subject,
      description: this.state.description

    })
    this.setState({ showForm: false, subject: '', courseNumber: '', title: '', description: '' });
  };

  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark"onClick={() => this.setState({ showForm: !this.state.showForm })}>
          New Course
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="courseNumber" className="form-label">courseNumber:</label>

              <input
                type="text"
                name="courseNumber"
                id='courseNumber'
                className='form-control'
                value={this.state.courseNumber}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='title' className='form-label'>title:</label>
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="title"
                id='title'
                className='form-control'
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='subject' className='form-label' >subject:</label>
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="subject"
                id='subject'
                className='form-control'
                value={this.state.subject}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor='description' className='form-label'>description:</label>
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="description"
                id='description'
                className='form-control'
                value={this.state.description}
                onChange={this.handleInputChange}
                required
              />
            </div>
            {this.state.showForm && (
              <button className='btn btn-primary' onClick={this.handleSubmit}>New Course</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default Addcoursebutton;