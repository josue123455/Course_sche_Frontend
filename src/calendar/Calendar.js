
// this is for the calander everything to have to do within the calander
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';
import EventEditModal from './EventEditModal';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);






//currently toolbar uptop buttons to work the different views
// Custom toolbar component
const CustomToolbar = () => {
  return (
    <div className="custom-toolbar">
      <div className="rbc-btn-group">
        {<div class="tab">
  <button class="tablinks" onclick="openClanendar(event, 'By Professor')">By Professor</button> 
  
  <button class="tablinks" onclick="openClanendar(event, 'By Course')">By Course</button>

  <button class="tablinks" onclick="openClanendar(event, 'By Classroom')">By Classroom</button>

</div>}
      </div>
      <div className="rbc-toolbar-label">Entire Calendar View </div>
    </div>
  );
};

// ... (previous code)

const CalendarComponent = () => {
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: "class",
      start: new Date(2023, 10, 2, 10, 30),
      end: new Date(2023, 7, 30, 13, 0)
    },
    // ... other events
  ]);

  const [selectedEvent, setSelectedEvent] = React.useState(null);

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

  return (
    <div style={{ height: 650 }}>
      <div className="calendar-container" style={{ marginLeft: '300px' }}>
        <div className="calendar-container" style={{ paddingTop: '50px' }}>

          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            defaultView="week"
            views={['week']}
            components={{
              toolbar: CustomToolbar
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
}

export default CalendarComponent;
