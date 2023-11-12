//button compnent to add a new professor to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js done
//4. add logic to for PUT



import React from 'react';
const { createFaculty } = require('../../functions/http')


//using the state button when the button is not clicked the state does not show the text boxes
class AddProfessorButton extends React.Component {
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
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>New Professor</button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="professorName" className="form-label">Professor Name:</label>
              <input
                type="text"
                name="professorName"
                id='professorName'
                className='form-control'
                value={this.state.professorName}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor='professorRank' className='form-label' >Professor Rank:</label>
              <input
                type="text"
                name="professorRank"
                id='professorRank'
                className='form-control'
                value={this.state.professorRank}
                onChange={this.handleInputChange}
                required
              />
            </div>
            {this.state.showForm && (
              <button className='btn btn-primary' onClick={this.handleSubmit}>Save Professor</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default AddProfessorButton;
