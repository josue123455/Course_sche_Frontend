//button compnent to add a delete course to the system 
//checklist 
//1. create component- done 
//2. create feilds - done
//3. add it to the inputdata.js - 
//4. add logic to for PUT


import React from 'react';

//using the state button when the button is not clicked the state does not show the text boxes
class Deletecoursebutton extends React.Component {
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
  // Function to handle professor update
  handleDelete = () => {
    // Handle professor deletion logic (e.g., send delete request to API)  Handle the API logic here FR
    console.log('Deleting Professor:', this.state.professorName);
    // Reset the form and hide it after deletionubmission
      this.setState({ showForm: false, subject: '', courseNumber: '', title: '', description: '' });
    };
  
    render() {
      return (
        <div className="button-container">
          <button className="big-button" onClick={() => this.setState({ showForm: true })}>
            Delete Course
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
          <button onClick={this.handleDelete}>Delete Course</button>
          )}
            </form>
          )}
        </div>
      );
    }
  }
  
  export default Deletecoursebutton;