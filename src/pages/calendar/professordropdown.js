import React, { Component } from 'react';
const { getFaculty } = require('../../functions/http')

class ProfessorDropdown extends Component {
  constructor(props) {
    super(props);
    this.selectedProfessor = props.selectedProfessor;
    this.professors = props.professors;

    this.state = {
      professors: this.professors ? this.professors : [],
      selectedProfessor: this.selectedProfessor
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.professors !== this.props.professors) {
      this.setState({ professors: this.props.professors });
    }
    if (prevProps.selectedProfessor !== this.props.selectedProfessor) {
      this.setState({ selectedProfessor: this.props.selectedProfessor });
    }
  }

  async componentDidMount() {
    try {
      if (!this.state.professors || this.state.professors.length === 0) {
        const professors = await getFaculty();
        if (professors) {
          this.setState({ professors: professors });
        }
      }
      // else
      //   console.log("faculty already exists");
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
          this.setState({ selectedProfessor: e.target.value });
          const selectedProfessor = professors.find((professor) => professor._id === e.target.value);
          onSelectProfessor(selectedProfessor);
        }}
        value={this.state.selectedProfessor ? this.state.selectedProfessor._id : ''}
        required
      >
        <option value="">Select Professor</option>
        {professors.map((professor) => (
          <option
            key={professor._id} value={professor._id}>
            {professor.name}
          </option>
        ))}
      </select>
    );
  }
}

export default ProfessorDropdown;