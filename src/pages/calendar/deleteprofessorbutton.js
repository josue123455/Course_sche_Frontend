import React from 'react';

class DeleteprofessorbuttonComponent extends React.Component {
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


  // Function to handle professor deletion
  handleDelete = () => {
    // Handle professor deletion logic (e.g., send delete request to API)  Handle the API logic here FR
    console.log('Deleting Professor:', this.state.professorName);
    // Reset the form and hide it after deletion
    this.setState({ showForm: false, professorName: '', professorRank: '' });
  };

  render() {
    return (
      <div className="button-container">
        <button className="big-button" onClick={() => this.setState({ showForm: true })}>
          Delete Professor
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
          <button onClick={this.handleDelete}>Delete Professor</button>
        )}
          </form>
        )}
      </div>
    );
  }
}

export default DeleteprofessorbuttonComponent;
