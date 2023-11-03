import React from 'react';

//using the state button when the button is not clicked the state does not show the text boxes
class ButtonComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showForm: false, // State to control form visibility
        professorName: '',
        professorRank: ''
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
      console.log('Professor Name:', this.state.professorName);
      console.log('Professor Rank:', this.state.professorRank);
      // Reset the form and hide it after submission
      this.setState({ showForm: false, professorName: '', professorRank: '' });
    };
  
    render() {
      return (
        <div className="button-container">
          <button className="big-button" onClick={() => this.setState({ showForm: true })}>
            New Course:
          </button>
  
          {this.state.showForm && (
            <form onSubmit={this.handleSubmit}>
              <label>
                subject:
                <input
                  type="text"
                  name="subject"
                  value={this.state.professorName}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                courseNumber:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="courseNumber"
                  value={this.state.professorRank}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                title:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="title"
                  value={this.state.professorRank}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                courseNumber:
                <input
                  type="text" // remeber to make these required as rommel so they are imported with no issues
                  name="professorRank"
                  value={this.state.professorRank}
                  onChange={this.handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      );
    }
  }
  
  export default ButtonComponent;