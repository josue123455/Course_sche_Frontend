import React from 'react';
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

    handleFileChange = async (e, uploadCallback) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = JSON.parse(event.target.result);
            if (await uploadCallback(data)) {
                window.location.reload();
            }
        };
        reader.readAsText(file);
    }

    render() {
        return (
            <div>

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

                {/* create uploads for each collection */}
                <div className="button-container card-body">
                    <input type="file" id="courses" onChange={(e) => this.handleFileChange(e, importCourses)} />
                    <label htmlFor="courses">Upload Courses</label>
                </div>
                <div className="button-container card-body">
                    <input type="file" id="instructors" onChange={(e) => this.handleFileChange(e, importFaculty)} />
                    <label htmlFor="instructors">Upload Instructors</label>
                </div>
                <div className="button-container card-body">
                    <input type="file" id="rooms" onChange={(e) => this.handleFileChange(e, importRooms)} />
                    <label htmlFor="rooms">Upload Rooms</label>
                </div>
                <div className="button-container card-body">
                    <input type="file" id="sections" onChange={(e) => this.handleFileChange(e, importSections)} />
                    <label htmlFor="sections">Upload Sections</label>
                </div>


            </div>
        )
    }
}

export default ManageDatatButton;