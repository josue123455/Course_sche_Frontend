import React from 'react';
import { getSection } from '../../functions/http';


class SectionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.courses = props.courses;
    this.instructors = props.instructors;
    this.rooms = props.rooms;

    this.state = {
      sections: [],
      courses: this.courses,
      instructors: this.instructors,
      rooms: this.rooms,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courses !== this.props.courses) {
      this.setState({ courses: this.props.courses });
    }
    if (prevProps.instructors !== this.props.instructors) {
      this.setState({ instructors: this.props.instructors });
    }
    if (prevProps.rooms !== this.props.rooms) {
      this.setState({ rooms: this.props.rooms });
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const sectionData = await getSection();
        if (sectionData) {
          this.setState({
            sections: sectionData.map((section) => {
              section.course = this.courses.find((course) => course._id === section.course);
              section.instructor = this.instructors.find((instructor) => instructor._id === section.instructor);
              section.room = this.rooms.find((room) => room._id === section.room);
              return section;
            })
          });
        }
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }

  render() {
    const { onSelectSection } = this.props;
    const { sections } = this.state;

    return (
      <select
        id='selectedSection'
        className='form-control'
        onChange={(e) => {
          const selectedSection = sections.find((section) => section._id === e.target.value);
          onSelectSection(selectedSection);
        }}
      >
        <option value="">Select Section</option>
        {sections.map((section) => (<option key={section._id} value={section._id}>{section.course.subject} {section.course.courseNumber}- {section.sectionNumber}</option>))}
      </select>
    );
  }
}

export default SectionDropdown;
