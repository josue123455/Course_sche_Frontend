import React from 'react';
import { getSection } from '../../functions/http';

class YearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      try {
        const sectionData = await getSection();
        // Assuming each section has a 'year' property
        const years = [...new Set(sectionData.map((section) => section.year))];

        this.setState({
          years,
        });
      } catch (error) {
        console.error('Error fetching year data:', error);
        // Handle errors, e.g., show an error message to the user
      }
    };
    fetchData();
  }

  render() {
    const { onSelectYear } = this.props;
    const { years } = this.state;

    return (
      <select
        id='selectedYear'
        className='form-control'
        onChange={(e) => {
          const selectedYear = e.target.value;
          onSelectYear(selectedYear);
        }}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  }
}

export default YearDropdown;
