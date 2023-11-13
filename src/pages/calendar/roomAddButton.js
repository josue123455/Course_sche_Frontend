//button compnent to add a new room to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT



import React from 'react';
const { createRoom } = require('../../functions/http')


//using the state button when the button is not clicked the state does not show the text boxes
class Addroombutton extends React.Component {
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
  handleSubmit = async (event) => {
    event.preventDefault();

    await createRoom({
      number: this.state.number,
      building: this.state.building,
      lab: this.state.lab,

    });
    this.setState({ showForm: false, number: '', building: '', lab: '' });
  }; catch(error) {
    if (error.response && error.response.status === 500) {
      console.error('Duplicate room number. Please choose a different room number.');
      // Handle the error gracefully, e.g., show a message to the user.
    } else {
      console.error('An unexpected error occurred:', error.message);
    }

  };

  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          New Classroom
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label
              htmlFor="number"
              className='form-label'
            >
              number:
            </label>
            <input
              type="text"
              name="number"
              id="number"
              className='form-control'
              value={this.state.number}
              onChange={this.handleInputChange}
            />
            <label htmlFor='building' className='form-label'>building:</label>
            <input
              type="text"
              name="building"
              id='building'
              className='form-control'
              value={this.state.building}
              onChange={this.handleInputChange}
            />
            <label htmlFor='lab' className='form-label'>lab (true/false):</label>
            <input
              type="text"
              name="lab"
              id='lab'
              className='form-control'
              value={this.state.lab}
              onChange={this.handleInputChange}
            />
            {this.state.showForm && (
              <button className='btn btn-primary' onClick={this.handleSubmit}>New Classroom</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default Addroombutton;