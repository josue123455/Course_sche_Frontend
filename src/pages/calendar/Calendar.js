// Import necessary dependencies and components
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';
import EventEditModal from './EventEditModal';
import RoomDropdown from './roomdropdown'; // Import the room dropdown
import ProfessorDropdown from './professordropdown.js';
import CoursenumberDropdown from './coursenumberdropdown.js';
// Set up localization
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CustomToolbar = ({ onRoomSelect, onSelectProfessor, onSelectCourse }) => {
  return (
    <div className="custom-toolbar">
      <div className="rbc-btn-group">
        <div class="tab">
          <label>
            <RoomDropdown onSelectRoom={onRoomSelect} />
            <ProfessorDropdown onSelectProfessor={onSelectProfessor} />
            <CoursenumberDropdown onSelectCourse={onSelectCourse} />
          </label>
        </div>
      </div>
      <div className="rbc-toolbar-label">Entire Calendar View </div>
    </div>
  );
};

// CalendarComponent component
const CalendarComponent = () => {
  // State to manage calendar events
  const [events, setEvents] = React.useState([
    // Your existing events
  ]);

  // State to manage selected event
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  // State to manage selected room
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  // State to manage selected professor
  const [selectedProfessor, setSelectedProfessor] = React.useState(null);

  // State to manage selected course
  const [selectedCourse, setSelectedCourse] = React.useState(null);

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

  // Function to handle professor selection
  const handleProfessorSelect = (selectedProfessor) => {
    setSelectedProfessor(selectedProfessor);

    // Filter events based on the selected professor
    const filteredEventsByProfessor = selectedProfessor
      ? events.filter((event) => event.professor && event.professor._id === selectedProfessor._id)
      : events;

    // Update the events array with filtered events
    setEvents(filteredEventsByProfessor);

    // Function to handle course selection
    setSelectedCourse(selectedProfessor);

    // Filter events based on the selected course
    const filteredEventsByCourse = selectedCourse
      ? events.filter((event) => event.course && event.course._id === selectedCourse._id)
      : events;

    // Update the events array with filtered events
    setEvents(filteredEventsByCourse);
  };

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
              toolbar: () => <CustomToolbar onRoomSelect={handleRoomSelect} onSelectProfessor={handleProfessorSelect} />
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
