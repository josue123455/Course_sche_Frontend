import React from 'react';
import ButtonComponent from '../calendar/addprofessorbutton.js';
import UpdateProfessorButtonComponent from '../calendar/updateprofessorbutton.js';
import DeleteprofessorbuttonComponent from '../calendar/deleteprofessorbutton.js';
import Addcoursebutton from '../calendar/addcoursebutton.js';
import Updatecoursebutton from '../calendar/updatecoursebutton.js';
import Deletecoursebutton from '../calendar/deletecoursebutton.js';
import Addroombutton from  '../calendar/addclassroombutton.js';
import Updateroombutton from '../calendar/updateclassroombutton.js';
import Deleteroombutton from '../calendar/deleteclassroombutton.js';
import AddSectionbutton from '../calendar/addSectionButton.js';


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
        <Addcoursebutton style={buttonStyle} />
        <Updatecoursebutton style={buttonStyle} />
        <Deletecoursebutton style={buttonStyle} />
        <Addroombutton style={buttonStyle} />
        <Updateroombutton style={buttonStyle} />
        <Deleteroombutton style={buttonStyle} />
        <AddSectionbutton style={buttonStyle} />

        {/* You can add more buttons or components here */}
      </div>
    );
  }
}

export default InputData;
