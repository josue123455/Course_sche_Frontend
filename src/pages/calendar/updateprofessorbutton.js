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

  // Function to handle form submission (update professor logic)
  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., sending data to API)
    // For now, you can simply log the updated professor details
    console.log('Updating Professor - Name:', this.state.professorName);
    console.log('Updating Professor - Rank:', this.state.professorRank);
    // Reset the form and hide it after submission
    this.setState({ showForm: false, professorName: '', professorRank: '' });
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
            <button type="submit">Submit</button>
          </form>
        )}

        {this.state.showForm && (
          <button onClick={this.handleUpdate}>Update Professor</button>
        )}
      </div>
    );
  }
}

export default UpdateProfessorButtonComponent;
