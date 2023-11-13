import React from 'react';
import { getSection, getCourse } from '../../functions/http';


class SectionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const sectionData = await getSection();
        const courseData = await getCourse();
        if (sectionData) {
          this.setState({
            sections: sectionData.map((section) => {
              const course = courseData.find((course) => course._id === section.course);
              section.course = course;
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
