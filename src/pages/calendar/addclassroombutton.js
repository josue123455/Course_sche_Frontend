//button compnent to add a new room to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT



import React from 'react';
const {createRoom } = require('../../functions/http')


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
  }; catch (error) {
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
                type="text"
                name="building"
                value={this.state.building}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              lab:
              <input
                type="text"
                name="lab"
                value={this.state.lab}
                onChange={this.handleInputChange}
              />
            </label>
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