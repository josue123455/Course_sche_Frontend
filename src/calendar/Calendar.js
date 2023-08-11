import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import './CalendarStyles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: "Event 1",
      start: new Date(2023, 7, 7, 10, 30),
      end: new Date(2023, 7, 7, 13, 0)
    },
    // ... other events
  ]);

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

  return (
    <div style={{ height: 500 }}>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        formats={{ dayFormat: 'dddd' }}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        selectable
        resizable
      />
    </div>
  );
}

export default CalendarComponent;
