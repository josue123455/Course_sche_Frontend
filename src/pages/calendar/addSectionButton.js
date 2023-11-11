//button compnent to add a new section to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js done
//4. add logic to for PUT



import React from 'react';
const {createFaculty } = require('../../functions/http')


//using the state button when the button is not clicked the state does not show the text boxes
class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      sectionNumber: '',
      sectionRank: ''
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
   
    await createFaculty({
      name: this.state.sectionNumber,
      rank: this.state.sectionRank
    })
    // Reset the form and hide it after submission
    this.setState({ showForm: false, sectionNumber: '', sectionRank: '' });
  };

  render() {
    return (
      <div className="button-container">
        <button className="big-button" onClick={() => this.setState({ showForm: true })}>
          New section
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>
              section Number:
              <input
                type="text"
                name="sectionNumber"
                value={this.state.sectionNumber}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Course:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Class Mode (online, in person, hybrid):
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
            instructor:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Semester:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              schedule:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              start date:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              end date:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Room:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="sectionRank"
                value={this.state.sectionRank}
                onChange={this.handleInputChange}
              />
            </label>
            {this.state.showForm && (
          <button onClick={this.handleSubmit}>New section</button>
          )}
          </form>
        )}
      </div>
    );
  }
}

export default ButtonComponent;
