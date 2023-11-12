import React from 'react';
import ProfessorDropdown from './professordropdown';
import CoursenumberDropdown from './coursenumberdropdown';
import RoomDropdown from './roomdropdown';
const { createFaculty } = require('../../functions/http')


class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, // State to control form visibility
            sectionNumber: '',
            course: null,
            classMode: null,
            instructor: null,
            semester: null,
            schedule: null,
            startDate: null,
            endDate: null,
            room: null,
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

        await createFaculty({
            name: this.state.sectionNumber,
            rank: this.state.sectionRank
        })
        // Reset the form and hide it after submission
        this.setState({ showForm: false, sectionNumber: '', sectionRank: '' });
    };

    render() {
        return (
            <div className="button-container card-body">
                <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>New section</button>

                {this.state.showForm && (
                    <form onSubmit={this.handleSubmit}>
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
                            <label htmlFor='classMode' className="form-label">Class Mode (online, in person, hybrid):</label>
                            <input
                                type="text"
                                name="classMode"
                                id='classMode'
                                className='form-control'
                                value={this.state.classMode}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor='professorSelect' className="form-label">Instructor:</label>
                            <ProfessorDropdown onSelectProfessor={(selectedProfessor) => { this.setState({ instructor: selectedProfessor }) }} />
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
                            <label htmlFor='schedule' className="form-label">Schedule:</label>
                            <input
                                type="text"
                                name="schedule"
                                id='schedule'
                                className='form-control'
                                value={this.state.schedule}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor='startDate' className="form-label">Start Date:</label>
                            <input
                                type="text"
                                name="startDate"
                                id='startDate'
                                className='form-control'
                                value={this.state.startDate}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor='endDate' className="form-label">End Date:</label>
                            <input
                                type="text"
                                name="endDate"
                                id='endDate'
                                className='form-control'
                                value={this.state.endDate}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor='room' className="form-label">Room:</label>
                            <RoomDropdown onSelectRoom={(selectedRoom) => { this.setState({ room: selectedRoom }) }} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </div>
        )
    }
}
export default ButtonComponent;
