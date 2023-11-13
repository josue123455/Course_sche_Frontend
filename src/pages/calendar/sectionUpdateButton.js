import React from 'react';
import ProfessorDropdown from './professordropdown';
import CoursenumberDropdown from './coursenumberdropdown';
import RoomDropdown from './roomdropdown';
import SectionDropdown from './sectionDropdown';
const { updateSection } = require('../../functions/http')


class UpdateSectionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, // State to control form visibility
            id: null,
            sectionNumber: '',
            course: null,
            mode: '',
            instructor: null,
            year: 2023,
            semester: '',
            startDate: '',
            endDate: '',
            room: null,
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
    }

    // Function to handle form input changes
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
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

        await updateSection(
            this.state.id,
            {
                sectionNumber: this.state.sectionNumber.toLowerCase(),
                course: this.state.course,
                mode: this.state.mode.toLowerCase(),
                instructor: this.state.instructor,
                year: this.state.year,
                semester: this.state.semester,
                schedule: schedule,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                room: this.state.room,
            })

        // Reset the form and hide it after submission
        this.setState({ showForm: false, sectionNumber: '', sectionRank: '' });
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

    render() {
        return (
            <div className="button-container card-body">
                <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>Update section</button>

                {this.state.showForm && (
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Section ID:</label>
                            <SectionDropdown onSelectSection={(selectedSection) => { this.setState({ id: selectedSection }) }} />
                        </div>
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
                            <label htmlFor='courseNumberSelect' className="form-label">Course:</label>
                            <CoursenumberDropdown onSelectCourse={(selectedCourse) => { this.setState({ course: selectedCourse }) }} />
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
                            <ProfessorDropdown onSelectProfessor={(selectedProfessor) => { this.setState({ instructor: selectedProfessor }) }} />
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
                            <label htmlFor='startTime' className='form-label' >Start Time:</label>
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
                            <label htmlFor='endTime' className='form-label'>End Time:</label>
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
                            <RoomDropdown onSelectRoom={(selectedRoom) => { this.setState({ room: selectedRoom }) }} />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                    </form>
                )}
            </div>
        )
    }
}
export default UpdateSectionButton;
