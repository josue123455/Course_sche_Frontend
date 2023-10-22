
import React, { useState } from 'react';

const EventEditModal = ({ event, onClose, onSave }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleSave = () => {
    onSave(editedEvent);
  };

  return (
    <div className="event-edit-modal">
      <h2>Edit Event</h2>
      <div>
        <label>Course:</label>
        <input
          type="text"
          value={editedEvent.title}
          onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
        />
      </div>
      <div>
        <label>Professor:</label>
        <input
          type="text"
          value={editedEvent.professor}
          onChange={(e) => setEditedEvent({ ...editedEvent, professor: e.target.value })}
        />
      </div>
      <div>
        <label>:</label>
        <input
          type="text"
          value={editedEvent.professor}
          onChange={(e) => setEditedEvent({ ...editedEvent, professor: e.target.value })}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="datetime-local"
          value={editedEvent.start}
          onChange={(e) => setEditedEvent({ ...editedEvent, start: e.target.value })}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="datetime-local"
          value={editedEvent.end}
          onChange={(e) => setEditedEvent({ ...editedEvent, end: e.target.value })}
        />
      </div>
      {/* Add a new field for description */}
      <div>
        <label>Description:</label>
        <textarea
          value={editedEvent.description}
          onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
        />
      </div>
      {/* Add a new field for Professor */}
 
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EventEditModal;
