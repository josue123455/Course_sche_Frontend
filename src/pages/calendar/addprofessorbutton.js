//button compnent to add a new professor to the system 
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
  handleSubmit = async (event) => {
    event.preventDefault();
   
    await createFaculty({
      name: this.state.professorName,
      rank: this.state.professorRank
    })
    // Reset the form and hide it after submission
    this.setState({ showForm: false, professorName: '', professorRank: '' });
  };

  render() {
    return (
      <div className="button-container">
        <button className="big-button" onClick={() => this.setState({ showForm: true })}>
          New Professor
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Professor Name:
              <input
                type="text"
                name="professorName"
                value={this.state.professorName}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Professor Rank:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="professorRank"
                value={this.state.professorRank}
                onChange={this.handleInputChange}
              />
            </label>
            {this.state.showForm && (
          <button onClick={this.handleSubmit}>New Professor</button>
          )}
          </form>
        )}
      </div>
    );
  }
}

export default ButtonComponent;
