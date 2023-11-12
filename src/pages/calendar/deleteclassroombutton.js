//button compnent to add a new room to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT



import React from 'react';


//using the state button when the button is not clicked the state does not show the text boxes
class Deleteroombutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false, // State to control form visibility
      number: '',
      building: '',
      lab: '',
    };
  }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Function to handle form submission
  handleDelete = () => {
    // Handle professor deletion logic (e.g., send delete request to API)  Handle the API logic here FR
    console.log('Deleting clasroom', this.state.professorName);
    // Reset the form and hide it after deletion
    this.setState({ showForm: false, number: '', building: '', lab: '' });
  };

  render() {
    return (
      <div className="button-container">
        <button className="btn btn-primary" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Delete Classroom
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>
            number:
              <input
                type="text"
                name="number"
                value={this.state.number}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              building:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="building"
                value={this.state.building}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
                lab:
              <input
                type="text" // remeber to make these required as rommel so they are imported with no issues
                name="lab"
                value={this.state.lab}
                onChange={this.handleInputChange}
              />
            </label>
            {this.state.showForm && (
          <button onClick={this.handleDelete}>Delete Classroom</button>
          )}
          </form>
        )}
      </div>
    );
  }
}

export default Deleteroombutton;