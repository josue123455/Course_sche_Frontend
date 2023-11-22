import React from 'react';
const { migrateData } = require('../../../functions/http')

class migrateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldYear: 2020,
            oldSemester: "Fall",
            year: 2023,
            semester: "Spring",
            startDate: "2023-09-20",
            endDate: "2023-12-20"
        };
    }

    migrateData = async (e) => {
        try {
            e.preventDefault();
            const data = await migrateData(this.state.oldYear,
                this.state.oldSemester,
                this.state.year,
                this.state.semester,
                this.state.startDate,
                this.state.endDate);
            if (data) {
                this.setState({
                    oldYear: 2020,
                    oldSemester: "",
                    year: 2023,
                    semester: "",
                    startDate: "2023-09-20",
                    endDate: "2023-12-20"
                })
            }
        } catch (error) {
            console.error('Error fetching faculty data:', error);
            // Handle errors, e.g., show an error message to the user
        }
    }

    render() {
        return (
            <div>

                <div className='card'>
                    <div className='card-header'>
                        <h3>Migrate Data</h3>
                    </div>
                    <form className='card-body'
                        onSubmit={this.migrateData}>
                        <div className='form-group'>
                            <label htmlFor='oldYear'>Old Year</label>
                            <input
                                type='number'
                                className='form-control'
                                id='oldYear'
                                value={this.state.oldYear}
                                onChange={(e) => this.setState({ oldYear: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='oldSemester'>Old Semester</label>
                            <input
                                type='text'
                                className='form-control'
                                id='oldSemester'
                                value={this.state.oldSemester}
                                onChange={(e) => this.setState({ oldSemester: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='year'>Year</label>
                            <input
                                type='number'
                                className='form-control'
                                id='year'
                                value={this.state.year}
                                onChange={(e) => this.setState({ year: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='semester'>Semester</label>
                            <input
                                type='text'
                                className='form-control'
                                id='semester'
                                value={this.state.semester}
                                onChange={(e) => this.setState({ semester: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='startDate'>Start Date</label>
                            <input
                                type='text'
                                className='form-control'
                                id='startDate'
                                value={this.state.startDate}
                                onChange={(e) => this.setState({ startDate: e.target.value })}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='endDate'>End Date</label>
                            <input
                                type='text'
                                className='form-control'
                                id='endDate'
                                value={this.state.endDate}
                                onChange={(e) => this.setState({ endDate: e.target.value })}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Migrate Data
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

export default migrateForm;