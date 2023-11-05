//button compnent to add a new course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';

//using the state button when the button is not clicked the state does not show the text boxes
class Addcoursebutton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showForm: false, // State to control form visibility
        subject: '',
        courseNumber: '',
        title: '',
        description: ''
      };
    }
  
    // Function to handle form input changes
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
  
    // Function to handle form submission
    handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic (e.g., sending data to API)
      // For now, you can simply log the professor details
      console.log('subject:', this.state.subject);
      console.log('courseNumber:', this.state.courseNumber);
      console.log('title:', this.state.title);
      console.log('description:', this.state.description);
      // Reset the form and hide it after submission
      this.setState({ showForm: false, subject: '', courseNumber: '', title: '', description: '' });
    };
  
    render() {
      return (
        <div className="button-container">
          <button className="big-button" onClick={() => this.setState({ showForm: true })}>
            New Course
          </button>
  
          {this.state.showForm && (
            <form onSubmit={this.handleSubmit}>
              <label>
                subject:
                <input
                  type="text"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                courseNumber:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
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
                description:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="professorRank"
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