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
        <button className="btn btn-danger" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          Delete Classroom
        </button>

        {this.state.showForm && (
          <form onSubmit={this.handleDelete}>
            <label>
              Select Room:
              <RoomDropdown onSelectRoom={this.onSelectRoom} />
            </label>
            <label>
              Room Number:
              <input
                type="text"
                name="number"
                value={this.state.number}
                onChange={this.handleInputChange}
                readOnly
              />
            </label>
            <label>
              Building:
              <input
                type="text"
                name="building"
                value={this.state.building}
                onChange={this.handleInputChange}
                readOnly
              />
            </label>
            <label>
              Lab:
              <input
                type="text"
                name="lab"
                value={this.state.lab}
                onChange={this.handleInputChange}
                readOnly
              />
            </label>
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
