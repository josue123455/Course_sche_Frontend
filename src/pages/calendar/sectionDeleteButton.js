import React from 'react';
import ProfessorDropdown from './professordropdown';
import CoursenumberDropdown from './coursenumberdropdown';
import RoomDropdown from './roomdropdown';
import SectionDropdown from './sectionDropdown';
const { getCourse, getFaculty, getRoom, deleteSection } = require('../../functions/http')


class UpdateSectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            showForm: false, // State to control form visibility
            id: null,
            sectionNumber: '',
            course: null,
            courses: [],
            mode: '',
            instructor: null,
            instructors: [],
            year: 2023,
            semester: '',
            startDate: '',
            endDate: '',
            room: null,
            rooms: [],
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

    async componentDidMount() {
        try {
            if (!this.state.facultyData) {
                const facultyData = await getFaculty();
                if (facultyData) {
                    this.setState({ instructors: facultyData });
                    this.defaultState.instructors = facultyData;
                }
                const courseData = await getCourse();
                if (courseData) {
                    this.setState({ courses: courseData });
                    this.defaultState.courses = courseData;
                }
                const roomData = await getRoom();
                if (roomData) {
                    this.setState({ rooms: roomData });
                    this.defaultState.rooms = roomData;
                }
            }
        } catch (error) {
            console.error('Error fetching faculty data:', error);
            // Handle errors, e.g., show an error message to the user
        }
    }

    // Function to handle form input changes
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    // Function to handle form submission
    handleSubmit = async (event) => {
        event.preventDefault();
        if (await deleteSection(this.state.id))
            // Reset the form and hide it after submission
            this.setState(structuredClone(this.defaultState));
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
        // console.log("section: ", section);

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

    }

    render() {
        return (
            <div className="button-container card-body">
                <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>Delete section</button>

                {this.state.showForm && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Section ID:</label>
                            <SectionDropdown
                                onSelectSection={this.handleSectionChange}
                                courses={this.state.courses}
                                instructors={this.state.instructors}
                                rooms={this.state.rooms}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='sectionNumber' className="form-label">Section Number:</label>
                            <input
                                type="text"
                                disabled
                                name="sectionNumber"
                                id='sectionNumber'
                                className='form-control'
                                value={this.state.sectionNumber}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor='courseNumberSelect' className="form-label">Course:</label>
                            <CoursenumberDropdown
                                onSelectCourse={(courseSelected) => {
                                    this.setState({
                                        course: courseSelected._id
                                    });
                                    // console.log("courseSelected: ", courseSelected);
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
                                disabled
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
                                    disabled
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
                                disabled
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
                                        disabled
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
                            <label htmlFor='startTime' className='form-label' >Start Time:</label>
                            <input
                                disabled
                                type='time'
                                name='startTime'
                                value={this.state.startTime}
                                id='startTime'
                                className='form-label'
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='endTime' className='form-label'>End Time:</label>
                            <input
                                disabled
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
                                    disabled
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
                                    disabled
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
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-danger">Delete</button>
                    </form>
                )}
            </div>
        )
    }
}
export default UpdateSectionButton;
