import React, { Component } from 'react';
const { getFaculty } = require('../../functions/http')

class ProfessorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors: []
    };
  }

  async componentDidMount() {
    try {
      const facultyData = await getFaculty();
      if (facultyData) {
        this.setState({ professors: facultyData });
      }
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      // Handle errors, e.g., show an error message to the user
    }
  }

  render() {
    const { onSelectProfessor } = this.props;
    const { professors } = this.state;

    return (
      <select
        id='professorSelect'
        className='form-control'
        onChange={(e) => {
          const selectedProfessor = professors.find((professor) => professor._id === e.target.value);
          onSelectProfessor(selectedProfessor);
        }}
        required
      >
        <option value="">Select Professor</option>
        {professors.map((professor) => (
          <option key={professor._id} value={professor._id}>
            {professor.name}
          </option>
        ))}
      </select>
    );
  }
}

export default ProfessorDropdown;