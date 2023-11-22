import React from 'react';
import MigrateForm from './migrateForm.js'
const { getCourse,
    getFaculty,
    getRoom,
    getSection,
    importCourses,
    importFaculty,
    importRooms,
    importSections
} = require('../../../functions/http')

class ManageDatatButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            instructors: [],
            rooms: [],
            sections: [],
            status: "Upload Status: "
        };
    }

    async componentDidMount() {
        try {
            const facultyData = await getFaculty();
            if (facultyData) {
                this.setState({ instructors: facultyData });
            }
            const courseData = await getCourse();
            if (courseData) {
                this.setState({ courses: courseData });
            }
            const roomData = await getRoom();
            if (roomData) {
                this.setState({ rooms: roomData });
            }
            const sectionData = await getSection();
            if (sectionData) {
                this.setState({ sections: sectionData });
            }

        } catch (error) {
            console.error('Error fetching faculty data:', error);
            // Handle errors, e.g., show an error message to the user
        }
    }

    downloadData = (data, filename) => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    }

    handleFileChange = async (e, uploadCallback, dataType) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = JSON.parse(event.target.result);
            if (await uploadCallback(data)) {
                this.setState({ status: dataType + " Upload Status: Success" });
            }
            else
                this.setState({ status: dataType + " Upload Status: Failed" });
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <div>
                <div className="card-body">
                    <p className="card-text">Download the current data as a JSON file.</p>
                </div>

                <div className="button-container card-body">
                    <button className="btn btn-dark" onClick={() => this.downloadData(this.state.courses, "courses.json")}>Download Courses</button>
                </div>
                <div className="button-container card-body">
                    <button className="btn btn-dark" onClick={() => this.downloadData(this.state.instructors, "instructors.json")}>Download Instructors</button>
                </div>
                <div className="button-container card-body">
                    <button className="btn btn-dark" onClick={() => this.downloadData(this.state.rooms, "rooms.json")}>Download Rooms</button>
                </div>
                <div className="button-container card-body">
                    <button className="btn btn-dark" onClick={() => this.downloadData(this.state.sections, "sections.json")}>Download Sections</button>
                </div>

                <hr class="border border-primary" />

                {/* create uploads for each collection */}
                <div className="card-body">
                    <p className="card-text">Upload a JSON file to replace the current data.</p>
                    <p className="card-header" >{this.state.status}</p>
                </div>
                <div className="button-container card-body">
                    <label className='form-label' htmlFor="courses">Upload Courses</label>
                    <input type="file" id="courses" className='form-control' onChange={(e) => this.handleFileChange(e, importCourses, "Courses")} />
                </div>
                <div className="button-container card-body">
                    <label className='form-label' htmlFor="instructors">Upload Instructors</label>
                    <input type="file" id="instructors" className='form-control' onChange={(e) => this.handleFileChange(e, importFaculty, "Instructors")} />
                </div>
                <div className="button-container card-body">
                    <label className='form-label' htmlFor="rooms">Upload Rooms</label>
                    <input type="file" id="rooms" className='form-control' onChange={(e) => this.handleFileChange(e, importRooms, "Rooms")} />
                </div>
                <div className="button-container card-body">
                    <label className='form-label' htmlFor="sections">Upload Sections. To be used only after all other data has been uploaded</label>
                    <input type="file" id="sections" className='form-control' onChange={(e) => this.handleFileChange(e, importSections, "Sections")} />
                </div>

                <hr class="border border-primary" />


                <div className="button-container card-body">
                    <MigrateForm />
                </div>
            </div>
        )
    }
}

export default ManageDatatButton;