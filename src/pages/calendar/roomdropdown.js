import React, { Component } from 'react';
import { getRoom } from '../../functions/http';


class RoomDropdown extends Component {
  constructor(props) {
    super(props);
    this.selectedRoom = props.selectedRoom;
    console.log("selectedRoom: ", this.selectedRoom);
    this.rooms = props.rooms;
    this.state = {
      rooms: this.rooms ? this.rooms : [],
      selectedRoom: this.selectedRoom
    };
  }

  componentDidUpdate(prevProps) {
    // console.log("prevProps: ", prevProps);
    if (prevProps.rooms !== this.props.rooms) {
      this.setState({ rooms: this.props.rooms });
    }
    if (prevProps.selectedRoom !== this.props.selectedRoom) {
      this.setState({ selectedRoom: this.props.selectedRoom });
    }
  }

  async componentDidMount() {
    try {
      // console.log("rooms: ", this.state.rooms);
      if (!this.state.rooms || this.state.rooms.length === 0) {
        const rooms = await getRoom();
        if (rooms) {
          this.setState({ rooms: rooms });
        }
      }
      // else {
      //   console.log("rooms already exists");
      // }

    } catch (error) {
      console.error('Error fetching room data:', error);
      // Handle errors, e.g., show an error message to the user
    }
  }

  handleRoomChange = (e) => {
    const { rooms } = this.state;
    this.setState({ selectedRoom: e.target.value });
    const selectedRoom = rooms.find((room) => room._id === e.target.value);
    this.props.onSelectRoom(selectedRoom);
  }

  render() {
    const { rooms } = this.state;

    return (
      <select
        id='selectedRoom'
        className='form-control'
        onChange={this.handleRoomChange}
        value={this.state.selectedRoom ? this.state.selectedRoom._id : ''}
      >
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room._id} value={room._id}>
            {room.building} - {room.number}
          </option>
        ))}
      </select>
    );
  }
}

export default RoomDropdown;