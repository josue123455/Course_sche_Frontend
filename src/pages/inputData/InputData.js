import React from 'react';
import ButtonComponent from '../calendar/addprofessorbutton.js';
import UpdateProfessorButtonComponent from '../calendar/updateprofessorbutton.js';
import DeleteprofessorbuttonComponent from '../calendar/deleteprofessorbutton.js';



class InputData extends React.Component {
  render() {
    const buttonStyle = {
      marginRight: '1000000px', // Adjust the value to set the desired space between buttons
    }
    return (
      <div>
        <h1>this is the page to create/update/delete data from the system</h1>
        {/* Use the ButtonComponent here */}
        <ButtonComponent style={buttonStyle} />
        <UpdateProfessorButtonComponent style={buttonStyle} />
        <DeleteprofessorbuttonComponent style={buttonStyle} />

        {/* You can add more buttons or components here */}
      </div>
    );
  }
}

export default InputData;
