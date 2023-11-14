import React from 'react';
import { getSection } from '../../functions/http';

class SemesterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      semesters: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const sectionData = await getSection();
        // Assuming each section has a 'semester' property
        const semesters = [...new Set(sectionData.map((section) => section.semester.toLowerCase()))];
  
        this.setState({
          semesters,
        });
      } catch (error) {
        console.error('Error fetching semester data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }
  

  render() {
    const { onSelectSemester } = this.props;
    const { semesters } = this.state;

    return (
      <select
        id='selectedSemester'
        className='form-control'
        onChange={(e) => {
          const selectedSemester = e.target.value;
          onSelectSemester(selectedSemester);
        }}
      >
        <option value="">Select Semester</option>
        {semesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    );
  }
}

export default SemesterDropdown;
