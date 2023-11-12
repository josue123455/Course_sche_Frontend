//button compnent to add a new section to the system 
//checklist 
//1. create component- done 
//2. create feilds - done 
//3. add it to the inputdata.js done
//4. add logic to for PUT



import React from 'react';
const { createFaculty } = require('../../functions/http')


//using the state button when the button is not clicked the state does not show the text boxes
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
            <div className="button-container">
                <button className="btn btn-primary" onClick={() => this.setState({ showForm: true })}>New section</button>

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
                            <label htmlFor='course' className="form-label">Course:</label>
                            <input
                                type="text"
                                name="course"
                                id='course'
                                className='form-control'
                                value={this.state.sectionRank}
                                onChange={this.handleInputChange}
                                required
                            />
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
                            <label htmlFor='instructor' className="form-label">Instructor:</label>
                            <input
                                type="text"
                                name="instructor"
                                id='instructor'
                                className='form-control'
                                value={this.state.instructor}
                                onChange={this.handleInputChange}
                                required
                            />
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
                            <input
                                type="text"
                                name="room"
                                id='room'
                                className='form-control'
                                value={this.state.room}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                )}
            </div>
        )
    }
}
export default ButtonComponent;
