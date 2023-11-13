import React from 'react';
import RoomDropdown from './roomdropdown';
import { deleteRoom } from '../../functions/http';

class DeleteClassroomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      number: '',
      building: '',
      lab: '',
      _id: null,
    };
  }

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

  handleDelete = async (event) => {
    event.preventDefault();

    if (this.state._id) {
      await deleteRoom(this.state._id);
      this.setState({
        showForm: false,
        number: '',
        building: '',
        lab: '',
        _id: null,
      });
    }
  };

  render() {
    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Delete Classroom
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleDelete}>

            <label htmlFor='selectedRoom' className='form-label'>Select Room:</label>
            <RoomDropdown onSelectRoom={this.onSelectRoom} />

            <label htmlFor='number' className='form-label'>Room Number:</label>
            <input
              type="text"
              name="number"
              id="number"
              className='form-control'
              value={this.state.number}
              onChange={this.handleInputChange}
              readOnly
            />

            <label htmlFor='building' className='form-label'>Building:</label>
            <input
              type="text"
              name="building"
              id="building"
              className='form-control'
              value={this.state.building}
              onChange={this.handleInputChange}
              readOnly
            />

            <label htmlFor='lab' className='form-label'>Lab (true/false):</label>
            <input
              type="text"
              name="lab"
              id="lab"
              className='form-control'
              value={this.state.lab}
              onChange={this.handleInputChange}
              readOnly
            />
            {this.state.showForm && (
              <button className='btn btn-danger' onClick={this.handleDelete}>Confirm Delete</button>
            )}
          </form>
        )}
      </div>
    );
  }
}

export default DeleteClassroomButton;
