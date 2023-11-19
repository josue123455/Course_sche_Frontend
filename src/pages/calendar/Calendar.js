import React, { Component } from 'react';
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

class CalendarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventBase: [],
      events: [],
      sections: [],
      courses: [],
      professors: [],
      rooms: [],
      selectedEvent: null,
      selectedRoom: null,
      selectedProfessor: null,
      selectedCourse: null,
      selectedYear: '',
      selectedSemester: '',
    };
  }

  handleEventResize = (event, start, end) => {
    const updatedEvents = this.state.events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    this.setState({ events: updatedEvents });
  };

  handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = this.state.events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    this.setState({ events: updatedEvents });
  };

  handleEventSelect = (event) => {
    this.setState({ selectedEvent: event });
  };

  handleEventEdit = (updatedEvent) => {
    const updatedEvents = this.state.events.map(existingEvent =>
      existingEvent.id === updatedEvent.id
        ? updatedEvent
        : existingEvent
    );
    this.setState({ events: updatedEvents, selectedEvent: null });
  };

  handleRoomSelect = (selectedRoom) => {
    this.setState({ selectedRoom: selectedRoom });
    const filteredEvents = selectedRoom
      ? this.state.events.filter((event) => event.room && event.room._id === selectedRoom._id)
      : this.state.events;
    this.setState({ events: filteredEvents });
  };

  handleProfessorSelect = (selectedProfessor) => {
    this.setState({ selectedProfessor: selectedProfessor });
    const filteredEventsByProfessor = selectedProfessor
      ? this.state.events.filter((event) => event.professor && event.professor._id === selectedProfessor._id)
      : this.state.events;
    this.setState({ events: filteredEventsByProfessor });

    // Note: The following lines seemed incorrect in the original code
    // You might need to adjust the logic based on your requirements
    this.setState({ selectedCourse: selectedProfessor });
    const filteredEventsByCourse = selectedProfessor
      ? this.state.events.filter((event) => event.course && event.course._id === selectedProfessor._id)
      : this.state.events;
    this.setState({ events: filteredEventsByCourse });
  };

  handleCourseSelect = (selectedCourse) => {
    this.setState({ selectedCourse: selectedCourse });
    const filteredEventsByCourse = selectedCourse
      ? this.state.events.filter((event) => event.course && event.course._id === selectedCourse._id)
      : this.state.events;
    this.setState({ events: filteredEventsByCourse });
  };

  handleYearSelect = (selectedYear) => {
    this.setState({ selectedYear: selectedYear });
    // Perform actions based on the selected year, e.g., fetch data
  };

  handleSemesterSelect = (selectedSemester) => {
    this.setState({ selectedSemester: selectedSemester });
    // Perform actions based on the selected semester, e.g., fetch data
  };

  async componentDidMount() {
    try {
      let sectionData = await getSection();
      const courseData = await getCourse();
      const facultyData = await getFaculty();
      const roomData = await getRoom();

      this.setState({ sections: sectionData });
      this.setState({ courses: courseData });
      this.setState({ professors: facultyData });
      this.setState({ rooms: roomData });

      sectionData = sectionData.map((section) => {
        section.instructor = facultyData.find((faculty) => faculty._id === section.instructor);
        section.course = courseData.find((course) => course._id === section.course);
        section.room = roomData.find((room) => room._id === section.room);
        return section;
      });



      if (sectionData) {

        console.log(sectionData);
        const formattedEvents =
          sectionData.map((section) => {
            const { sectionNumber, schedule, course, instructor, room } = section;

            if (schedule && schedule.length > 0 && schedule[0].day && schedule[0].startTime && schedule[0].endTime) {

              const title = `${sectionNumber} - 
                                        ${course ? course.subject + ' ' + course.courseNumber : ''} - 
                                        ${instructor ? instructor.name : ''} - 
                                        ${room ? room.building + ' ' + room.number : ''}`;

              const event = {
                id: section._id,
                title: title,
                start: moment(`${schedule[0].day} ${schedule[0].startTime}`, 'dddd HH:mm').toDate(),
                end: moment(`${schedule[0].day} ${schedule[0].endTime}`, 'dddd HH:mm').toDate(),
              };
              return event;
            }

            return null;
          });

        const filteredEvents = formattedEvents.filter(event => event !== null);
        this.setState({ eventBase: filteredEvents });
        this.setState({ events: filteredEvents });
        console.log(this.state.events);
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
      // Handle errors
    }
  }

  render() {
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
              events={this.state.events}
              defaultView="week"
              views={['week']}
              components={{
                toolbar: () => (
                  <>
                    <CustomToolbar
                      onRoomSelect={this.handleRoomSelect}
                      onSelectProfessor={this.handleProfessorSelect}
                      onSelectCourse={this.handleCourseSelect}
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
              onEventResize={this.handleEventResize}
              onEventDrop={this.handleEventDrop}
              onSelectEvent={this.handleEventSelect}
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
            onSelectYear={this.handleYearSelect}
            onSelectSemester={this.handleSemesterSelect}
          />
        </div>
        {this.state.selectedEvent && (
          <EventEditModal
            event={this.state.selectedEvent}
            onClose={() => this.setState({ selectedEvent: null })}
            onSave={this.handleEventEdit}
          />
        )}
      </div>
    );
  }
}

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
