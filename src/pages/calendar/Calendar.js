// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';
import EventEditModal from './EventEditModal';
import RoomDropdown from './roomdropdown'; // Import the room dropdown
import ProfessorDropdown from './professordropdown.js';
import CoursenumberDropdown from './coursenumberdropdown.js';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { getCourse } from '../../functions/http'; // Import the getCourse method

// Set up localization
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CustomToolbar = ({ onRoomSelect, onSelectProfessor, onSelectCourse }) => {
  return (
    <div className="custom-toolbar">
      <div className="rbc-btn-group">
        <div className="tab">
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

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Fetch initial events or populate as needed
    // ...

    // Fetch course data
    const fetchData = async () => {
      try {
        const courseData = await getCourse();
        if (courseData) {
          // You may want to set the initial course or handle it according to your logic
          // For example, setSelectedCourse(courseData[0]);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  const handleEventResize = (event, start, end) => {
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleEventEdit = (updatedEvent) => {
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === updatedEvent.id
        ? updatedEvent
        : existingEvent
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const handleRoomSelect = (selectedRoom) => {
    setSelectedRoom(selectedRoom);
    const filteredEvents = selectedRoom
      ? events.filter((event) => event.room && event.room._id === selectedRoom._id)
      : events;
    setEvents(filteredEvents);
  };

  const handleProfessorSelect = (selectedProfessor) => {
    setSelectedProfessor(selectedProfessor);
    const filteredEventsByProfessor = selectedProfessor
      ? events.filter((event) => event.professor && event.professor._id === selectedProfessor._id)
      : events;
    setEvents(filteredEventsByProfessor);

    setSelectedCourse(selectedProfessor);
    const filteredEventsByCourse = selectedCourse
      ? events.filter((event) => event.course && event.course._id === selectedCourse._id)
      : events;
    setEvents(filteredEventsByCourse);
  };

  const handleCourseSelect = (selectedCourse) => {
    setSelectedCourse(selectedCourse);
    const filteredEventsByCourse = selectedCourse
      ? events.filter((event) => event.course && event.course._id === selectedCourse._id)
      : events;
    setEvents(filteredEventsByCourse);
  };

  return (
   

  
    
    <div style={{ marginLeft: '10px' }}>
      <Link to="../InputData">
        <button>Go to InputData</button>
      </Link>
      <div className="calendar-container" style={{ marginLeft: '100px' }}>
        <div className="calendar-container" style={{ paddingTop: '50px' }}>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={['week']}
            components={{
              toolbar: () => <CustomToolbar onRoomSelect={handleRoomSelect} onSelectProfessor={handleProfessorSelect} onSelectCourse={handleCourseSelect} />
            }}
            formats={{
              dayFormat: 'dddd',
              timeGutterFormat: 'h:mm A',
              eventTimeRangeFormat: ({ start, end }) =>
                `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`,
            }}
            onEventResize={handleEventResize}
            onEventDrop={handleEventDrop}
            onSelectEvent={handleEventSelect}
            selectable
            resizable
            timeslots={2}
            min={moment().set({ hour: 8, minute: 0 })}
            max={moment().set({ hour: 23, minute: 0 })}
          />
        </div>
      </div>

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

export default CalendarComponent;
