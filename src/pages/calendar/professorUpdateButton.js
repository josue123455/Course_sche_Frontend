//button compnent to add a update professor to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js done
//4. add logic to for PUT - 


import React from 'react';
import ProfessorDropdown from './professordropdown.js'; // Replace 'path/to' with the correct path to your ProfessorDropdown component
const { updateFaculty } = require('../../functions/http.js')

class UpdateProfessorButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      professorName: '',
      professorRank: '',
      id: null
    };
  }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  //function to handle the selcted professor
  onSelectProfessor = (professor) => {
    this.setState({ professorName: professor.name, professorRank: professor.rank, id: professor._id });
  };
  // Function to handle professor update
  handleUpdate = async (event) => {
    event.preventDefault();

    if (
      await updateFaculty(
        this.state.id,
        {
          name: this.state.professorName,
          rank: this.state.professorRank,
          _id: this.state.id
        })) {
      this.setState({ showForm: false, professorName: '', professorRank: '' });

    }
  };

  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Update Professor
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="professorSelect" className="form-label">Select Professor:</label>
            <ProfessorDropdown onSelectProfessor={this.onSelectProfessor} />

            <label htmlFor="professorName" className="form-label">Update Professor Name:</label>
            <input
              type="text"
              name="professorName"
              id="professorName"
              className="form-control"
              value={this.state.professorName}
              onChange={this.handleInputChange}
            />
            <label htmlFor="professorRank" className="form-label">Update Professor Rank:</label>
            <input
              type="text"
              name="professorRank"
              id="professorRank"
              className="form-control"
              value={this.state.professorRank}
              onChange={this.handleInputChange}
            />

            {this.state.showForm && (
              <button className='btn btn-primary' onClick={this.handleUpdate}>Update Professor</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default UpdateProfessorButtonComponent;

