// RoomDropdown.js

import React, { useState, useEffect } from 'react';
import { getRoom } from '../../functions/http';

const RoomDropdown = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRoom();
        if (roomData) {
          setRooms(roomData);
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }, []); // Run the effect once when the component mounts

  return (
    <select
      style={{ minHeight: '10px', color: 'black' }}
      onChange={(e) => {
        const selectedRoom = rooms.find((room) => room._id === e.target.value);
        onSelectRoom(selectedRoom);
      }}
    >
      <option value="">Select Room</option>
      {rooms.map((room) => (
        <option key={room._id} value={room._id}>
          {room.number} - {room.building} - {room.lab}
        </option>
      ))}
    </select>
  );
};

export default RoomDropdown;
