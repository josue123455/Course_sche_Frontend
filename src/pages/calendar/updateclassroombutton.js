//button compnent to add a new room to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js - done
//4. add logic to for PUT



import React from 'react';
import RoomDropdown from './roomdropdown'; // importing the room dropdown
import {updateRoom } from '../../functions/http'; // Import the Createroom method


//using the state button when the button is not clicked the state does not show the text boxes
class AddroombUpdateroom extends React.Component {
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
  onSelectRoom = (selectedRoom) => {
    this.setState({
      number: selectedRoom.number,
      building: selectedRoom.building,
      lab: selectedRoom.lab,
      _id: selectedRoom._id,    
    });
  };
  // Function to handle form submission
  handleUpdate = async (event) => {
    event.preventDefault();

    if (this.state.number && this.state.building && this.state.lab) {
    await updateRoom(this.state._id, {
      number: this.state.number,
      building: this.state.building,
      lab: this.state.lab,
      _id: this.state._id,
    });
    this.setState({ showForm: false, number: '', building: '', lab: '' });

    }
  };


  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Update Classroom
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
          <label>
              Select Room:
              {/* Replace the input field with the CoursenumberDropdown component */}
              <RoomDropdown onSelectRoom={this.onSelectRoom} />
            </label>
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
          <button onClick={this.handleUpdate}>Update Classroom</button>
          )}
          </form>
        )}
      </div>
    );
  }
}

export default AddroombUpdateroom;