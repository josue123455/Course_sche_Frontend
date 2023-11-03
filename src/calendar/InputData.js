import React from 'react';
import ButtonComponent from './addprofessorbutton'; // Import the ButtonComponent
import DeleteprofessorbuttonComponent from './deleteprofessorbutton'; // Import the ButtonComponent
class InputData extends React.Component {
  render() {
    return (
      <div>
        <h1>this is the page to create/update/delete data from the system</h1>
        {/* Use the ButtonComponent here */}
        <ButtonComponent />
        <DeleteprofessorbuttonComponent />
        {/* You can add more buttons or components here */}
      </div>
    );
  }
}

export default InputData;
