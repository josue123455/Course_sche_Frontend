//button compnent to add a update professor to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js done
//4. add logic to for PUT


import React from 'react';

class UpdateProfessorButtonComponent extends React.Component {
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



  // Function to handle professor update
  handleUpdate = () => {
    // Handle professor update logic (e.g., send update request to API)
    console.log('Updating Professor:', this.state.professorName);
    // Reset the form and hide it after updating
    this.setState({ showForm: false, professorName: '', professorRank: '' });
  };

  render() {
    return (
      <div className="button-container">
        <button className="big-button" onClick={() => this.setState({ showForm: true })}>
          Update Professor
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
                type="text"
                name="professorRank"
                value={this.state.professorRank}
                onChange={this.handleInputChange}
              />
            </label>
            {this.state.showForm && (
          <button onClick={this.handleUpdate}>Update Professor</button>
        )}
          </form>
        )}


      </div>
    );
  }
}

export default UpdateProfessorButtonComponent;
