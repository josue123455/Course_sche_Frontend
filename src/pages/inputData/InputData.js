import React from 'react';
import AddProfessorButton from '../calendar/addprofessorbutton.js';
import UpdateProfessorButtonComponent from '../calendar/updateprofessorbutton.js';
import DeleteprofessorbuttonComponent from '../calendar/deleteprofessorbutton.js';
import Addcoursebutton from '../calendar/addcoursebutton.js';
import Updatecoursebutton from '../calendar/updatecoursebutton.js';
import Deletecoursebutton from '../calendar/deletecoursebutton.js';
import Addroombutton from '../calendar/addclassroombutton.js';
import Updateroombutton from '../calendar/updateclassroombutton.js';
import Deleteroombutton from '../calendar/deleteclassroombutton.js';
import AddSectionbutton from '../calendar/addSectionButton.js';


class InputData extends React.Component {
  render() {
    return (
      <div className='accordion'>
        <h2>this is the page to create/update/delete data from the system</h2>

        <div id='professor' className='card' >
          <div className='card-header' >
            <h2>professor</h2>
          </div>
          <div className='card-body'>
            <AddProfessorButton />
            <UpdateProfessorButtonComponent />
            <DeleteprofessorbuttonComponent />
          </div>
        </div>

        <div id='course' className='card'>
          <div className='card-header'>
            <h2>course</h2>
          </div>
          <div className='card-body'>
            <Addcoursebutton />
            <Updatecoursebutton />
            <Deletecoursebutton />
          </div>
        </div>

        <div id='room' className='card'>
          <div className='card-header'>
            <h2>room</h2>
          </div>
          <div className='card-body'>
            <Addroombutton />
            <Updateroombutton />
            <Deleteroombutton />
          </div>
        </div>

        <div id='section' className='card'>
          <div className='card-header'>
            <h2>section</h2>
          </div>
          <div className='card-body'>
            <AddSectionbutton />
          </div>
        </div>
      </div>
    );
  }
}

export default InputData;
