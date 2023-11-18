// CalendarComponent.js

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';
import EventEditModal from './EventEditModal';
import RoomDropdown from './roomdropdown';
import ProfessorDropdown from './professordropdown.js';
import CoursenumberDropdown from './coursenumberdropdown.js';
import YearSemesterToolbar from './YearSemesterToolbar';
import { Link } from 'react-router-dom';
import { getSection, getCourse, getFaculty, getRoom } from '../../functions/http';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

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

  const handleYearSelect = (selectedYear) => {
    setSelectedYear(selectedYear);
    // Perform actions based on the selected year, e.g., fetch data
  };

  const handleSemesterSelect = (selectedSemester) => {
    setSelectedSemester(selectedSemester);
    // Perform actions based on the selected semester, e.g., fetch data
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await getSection();
  
        if (sectionData) {
          const formattedEvents = await Promise.all(sectionData.map(async (section) => {
            const { sectionNumber, schedule, course, instructor, room } = section;
  
            if (schedule && schedule.length > 0 && schedule[0].day && schedule[0].startTime && schedule[0].endTime) {
              const courseId = course?.$oid;
              const instructorId = instructor?.$oid;
              const roomId = room?.$oid;
  
              const [fetchedCourse, fetchedInstructor, fetchedRoom] = await Promise.all([
                getCourse(courseId),
                getFaculty(instructorId),
                roomId ? getRoom(roomId) : null,  // Fetch room only if roomId is present
              ]);
  
              const title = `${sectionNumber} - ${fetchedCourse ? fetchedCourse.subject + ' ' + fetchedCourse.courseNumber : ''} - ${fetchedInstructor ? fetchedInstructor.name : ''} - ${fetchedRoom ? fetchedRoom.name : ''}`;
  
              const event = {
                id: section._id,
                title: title,
                start: moment(`${schedule[0].day} ${schedule[0].startTime}`, 'dddd HH:mm').toDate(),
                end: moment(`${schedule[0].day} ${schedule[0].endTime}`, 'dddd HH:mm').toDate(),
              };
              return event;
            }
  
            return null;
          }));
  
          const filteredEvents = formattedEvents.filter(event => event !== null);
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Handle errors
      }
    };
  
    fetchData();
  }, []);

  return (
    <div style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="../InputData">
          <button>Go to InputData</button>
        </Link>
      </div>
      <div className="calendar-container" style={{ marginLeft: '100px', flex: '1' }}>
        <div className="calendar-container" style={{ paddingTop: '50px' }}>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={['week']}
            components={{
              toolbar: () => (
                <>
                  <CustomToolbar
                    onRoomSelect={handleRoomSelect}
                    onSelectProfessor={handleProfessorSelect}
                    onSelectCourse={handleCourseSelect}
                  />
                </>
              ),
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
      <div style={{ marginRight: '10px' }}>
        <YearSemesterToolbar
          onSelectYear={handleYearSelect}
          onSelectSemester={handleSemesterSelect}
        />
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

export default CalendarComponent;
