import React from 'react';
import AddProfessorButton from '../calendar/professorAddButton.js';
import UpdateProfessorButtonComponent from '../calendar/professorUpdateButton.js';
import DeleteprofessorbuttonComponent from '../calendar/professorDeleteButton.js';
import Addcoursebutton from '../calendar/courseAddButton.js';
import Updatecoursebutton from '../calendar/courseUpdateButton.js';
import Deletecoursebutton from '../calendar/courseDeleteButton.js';
import Addroombutton from '../calendar/roomAddButton.js';
import Updateroombutton from '../calendar/roomUpdateButton.js';
import Deleteroombutton from '../calendar/roomDeleteButton.js';
import AddSectionbutton from '../calendar/sectionAddButton.js';
import UpdateSectionButton from '../calendar/sectionUpdateButton.js';
import DeleteSectionbutton from '../calendar/sectionDeleteButton.js';


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
            <UpdateSectionButton />
            <DeleteSectionbutton />
          </div>
        </div>
      </div>
    );
  }
}

export default InputData;
