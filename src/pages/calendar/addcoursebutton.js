//button compnent to add a new course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';
const {createCourse } = require('../../functions/http')

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
        <div className="button-container">
          <button className="btn btn-primary" onClick={() => this.setState({ showForm: !this.state.showForm })}>
            New Course
          </button>
  
          {this.state.showForm && (
            <form onSubmit={this.handleSubmit}>
              <label>
              courseNumber:
                <input
                  type="text"
                  name="courseNumber"
                  value={this.state.courseNumber}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
              title:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
              subject:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                description:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </label>
              {this.state.showForm && (
          <button onClick={this.handleSubmit}>New Course</button>
          )}
            </form>
          )}
        </div>
      );
    }
  }
  
  export default Addcoursebutton;