//button compnent to delte professor to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT


import React from 'react';
  import ProfessorDropdown from './professordropdown';
const {deleteFaculty } = require('../../functions/http')

class DeleteprofessorbuttonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      professorName: '',
      professorRank: '', 
      id : null
    };
  }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSelectProfessor = (professor) => {
    this.setState({ professorName: professor.name , professorRank: professor.rank, id: professor._id});
  };
  // Function to handle professor deletion
  handleDelete = async (event) => {
    event.preventDefault();

     if (this.state.professorName) {
      await deleteFaculty(
        this.state.id,
        {
        name: this.state.professorName,
        rank: this.state.professorRank,
        _id: this.state.id
      });
    this.setState({ showForm: false, professorName: '', professorRank: '' });
  }};

  render() {
    return (
      <div className="button-container card-body">
        <button className='btn btn-danger' onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Delete Professor
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Select Professor:
              {/* Replace the input field with the ProfessorDropdown component */}
              <ProfessorDropdown onSelectProfessor={this.onSelectProfessor} />

            </label>
            <label>
              Delete Professor Name:
              <input
                type="text"
                name="professorName"
                value={this.state.professorName}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Delete Professor Rank:
              <input
                type="text"
                name="professorRank"
                value={this.state.professorRank}
                onChange={this.handleInputChange}
              />
            </label>
            
            {this.state.showForm && (
              <button className='btn btn-danger' onClick={this.handleDelete}>Delete Professor</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default DeleteprofessorbuttonComponent;
