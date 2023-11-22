import React from 'react';
import ProfessorDropdown from './professordropdown';
import CoursenumberDropdown from './coursenumberdropdown';
import RoomDropdown from './roomdropdown';
// import SectionDropdown from './sectionDropdown';
const { updateSection } = require('../../functions/http')


class EventEditModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log("props", this.props)
    const { instructors, rooms, courses } = this.props
    this.defaultState = {
      showForm: true, // State to control form visibility
      id: null,
      sectionNumber: '',
      course: null,
      courses: courses,
      mode: '',
      instructor: null,
      instructors: instructors,
      year: 2023,
      semester: '',
      startDate: '',
      endDate: '',
      room: null,
      rooms: rooms,
      startTime: '',
      endTime: '',
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
    };
    this.state = structuredClone(this.defaultState);
  }

  componentDidMount() {
    if (this.props.section) {
      this.handleSectionChange(this.props.section);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.section !== prevProps.section) {
      this.handleSectionChange(this.props.section);
      }
      }

  // Function to handle form input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEventSelect = (event) => {
    this.setState({ selectedEvent: event, isEventEditModalOpen: true });
  };

  // Function to handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();

    // Create an array of days that are true
    const schedule = Object.keys(this.state.days).filter((day) => this.state.days[day])
      .map((day) => {
        return {
          day,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
        };
      });

    if (await updateSection(
      this.state.id,
      {
        sectionNumber: this.state.sectionNumber?.toLowerCase(),
        course: this.state.course,
        mode: this.state.mode?.toLowerCase(),
        instructor: this.state.instructor,
        year: this.state.year,
        semester: this.state.semester,
        schedule: schedule,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        room: this.state.room,
      })) {
      // Reset the form and hide it after submission
      this.setState(structuredClone(this.defaultState));
    }
  };

  // Function to handle day toggles. 
  // grab existing state, update the day that was toggled, and return the updated state
  handleDayToggle = (day) => {
    this.setState((prevState) => {
      const updatedDays = { ...prevState.days };
      updatedDays[day] = !prevState.days[day];
      return { days: updatedDays };
    });
  };

  handleSectionChange = (section) => {
    // console.log("Selected Section: ", section);

    // if a day is in section.schedule, set the day to true
    const selectedDays = {
      Monday: section.schedule.some((day) => day.day === 'Monday'),
      Tuesday: section.schedule.some((day) => day.day === 'Tuesday'),
      Wednesday: section.schedule.some((day) => day.day === 'Wednesday'),
      Thursday: section.schedule.some((day) => day.day === 'Thursday'),
      Friday: section.schedule.some((day) => day.day === 'Friday'),
      Saturday: section.schedule.some((day) => day.day === 'Saturday'),
      Sunday: section.schedule.some((day) => day.day === 'Sunday'),
    };

    this.setState({
      id: section._id,
      sectionNumber: section.sectionNumber,
      course: section.course?._id,
      mode: section.mode,
      instructor: section.instructor?._id,
      year: section.year,
      semester: section.semester,
      room: section.room?._id,
      startTime: section.schedule[0]?.startTime,
      endTime: section.schedule[0]?.endTime,
      startDate: section.startDate?.split('T')[0],
      endDate: section.endDate?.split('T')[0],
      days: selectedDays,
    });
    // console.log("Updated State: ", this.state);

  }

  render() {
    return (
      <div className="button-container card-body">
        {/* <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>Edit Event</button> */}

        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            {/* <div className="form-group">
              <label className="form-label">Section ID:</label>
              <SectionDropdown
                onSelectSection={this.handleSectionChange}
                courses={this.state.courses}
                instructors={this.state.instructors}
                rooms={this.state.rooms}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor='sectionNumber' className="form-label">Section Number:</label>
              <input
                type="text"
                name="sectionNumber"
                id='sectionNumber'
                className='form-control'
                value={this.state.sectionNumber}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Course:</label>
              <CoursenumberDropdown
                onSelectCourse={(courseSelected) => {
                  this.setState({
                    course: courseSelected._id
                  });
                }}
                courses={this.state.courses}
                selectedCourse={this.state.course}
              />
            </div>


            <div className="form-group">
              <label htmlFor='mode' className="form-label">Class Mode (online, in person, hybrid):</label>
              <input
                type="text"
                name="mode"
                id='mode'
                className='form-control'
                value={this.state.mode}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor='professorSelect' className="form-label">Instructor:</label>
              <ProfessorDropdown
                onSelectProfessor={(professor) => {
                  this.setState({
                    instructor: professor._id
                  })
                }}
                professors={this.state.instructors}
                selectedProfessor={this.state.instructor}
              />
            </div>

            <div className="form-group">
              <label htmlFor='year' className="form-label">Year:</label>
              <div>
                <input type="number"
                  min="1990"
                  max="2099"
                  step="1"
                  name="year"
                  id='year'
                  className='form-label'
                  value={this.state.year}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor='semester' className="form-label">Semester:</label>
              <input
                type="text"
                name="semester"
                id='semester'
                className='form-control'
                value={this.state.semester}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor='days' className='form-label' >Select Days:</label>
              {Object.keys(this.state.days).map((day) => (
                <div className='form-check' key={day}>
                  <label htmlFor={day}>{day}</label>
                  <input
                    type='checkbox'
                    name={day}
                    id={day}
                    checked={this.state.days[day]}
                    className='form-check-input'
                    onChange={() => this.handleDayToggle(day)}
                  />
                </div>
              ))}
            </div>

            <div className='form-group'>
              <label htmlFor='startTime' className='form-label' >Start Time(8AM-10PM):</label>
              <input
                type='time'
                name='startTime'
                value={this.state.startTime}
                id='startTime'
                className='form-label'
                onChange={this.handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='endTime' className='form-label'>End Time(8AM-10PM):</label>
              <input
                type='time'
                name='endTime'
                value={this.state.endTime}
                id='endTime'
                className='form-label'
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor='startDate' className="form-label">Start Date:</label>
              <div>
                <input
                  type="date"
                  name="startDate"
                  id='startDate'
                  className='form-label'
                  value={this.state.startDate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor='endDate' className="form-label">End Date:</label>
              <div >
                <input
                  type="date"
                  name="endDate"
                  id='endDate'
                  className='form-label'
                  value={this.state.endDate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor='room' className="form-label">Room:</label>
              <RoomDropdown
                onSelectRoom={(roomSelected) => {
                  this.setState({
                    room: roomSelected._id
                  })
                }}
                rooms={this.state.rooms}
                selectedRoom={this.state.room}
              />
            </div>

            
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
          </form>
        )}
      </div>
    )
  }
}
export default EventEditModal;


