// Import necessary dependencies and components
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';
import EventEditModal from './EventEditModal';
import RoomDropdown from './roomdropdown'; // Import the room dropdown

// Set up localization
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

// ... (previous imports)

// Custom toolbar component
const CustomToolbar = ({ onRoomSelect }) => {
  return (
    <div className="custom-toolbar">
      <div className="rbc-btn-group">
        <div class="tab">
        <label>
              Select room:
              {/* Replace the input field with the CoursenumberDropdown component */}
              <RoomDropdown onSelectRoom={onRoomSelect} />
            </label>
        </div>
      </div>
      <div className="rbc-toolbar-label">Entire Calendar View </div>
    </div>
  );
};



//main code to worry about
/// CalendarComponent component
const CalendarComponent = () => {
  // State to manage calendar events
  const [events, setEvents] = React.useState([
    // Your existing events
  ]);

  // State to manage selected event
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  // State to manage selected room
  const [selectedRoom, setSelectedRoom] = React.useState(null);  // Add this line

  // Function to handle event resizing
  const handleEventResize = (event, start, end) => {
    // Update events with resized event
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  // Function to handle event dragging
  const handleEventDrop = ({ event, start, end }) => {
    // Update events with dragged event
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  // Function to handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  // Function to handle event editing
  const handleEventEdit = (updatedEvent) => {
    // Update the event in the events array (state)
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === updatedEvent.id
        ? updatedEvent
        : existingEvent
    );
    setEvents(updatedEvents);

    // Close the edit modal
    setSelectedEvent(null);
  };

  // Function to handle room selection
  const handleRoomSelect = (selectedRoom) => {
    // Update the selected room
    setSelectedRoom(selectedRoom);
    
    // Filter events based on the selected room
    const filteredEvents = selectedRoom
      ? events.filter((event) => event.room && event.room._id === selectedRoom._id)
      : events;

    // Update the events array with filtered events
    setEvents(filteredEvents);
  };

  // ... (rest of the code)


  return (
    <div style={{ height: 650 }}>
      {/* Calendar container with styling */}
      <div className="calendar-container" style={{ marginLeft: '300px' }}>
        <div className="calendar-container" style={{ paddingTop: '50px' }}>
          {/* Drag and Drop Calendar component */}
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={['week']}
            components={{
              toolbar: () => <CustomToolbar onRoomSelect={handleRoomSelect} />, // Custom toolbar
            }}
            formats={{
              dayFormat: 'dddd',
              timeGutterFormat: 'h:mm A',
              eventTimeRangeFormat: ({ start, end }) =>
                `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`,
            }}
            onEventResize={handleEventResize}
            onEventDrop={handleEventDrop}
            onSelectEvent={handleEventSelect} // Added event select handler
            selectable
            resizable
            timeslots={2}
            min={moment().set({ hour: 8, minute: 0 })}
            max={moment().set({ hour: 23, minute: 0 })}
          />
        </div>
      </div>

      {/* Event Edit Modal */}
      {selectedEvent && (
        <EventEditModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onSave={handleEventEdit}
        />
      )}
    </div>
  );
};

// Export the CalendarComponent
export default CalendarComponent;
