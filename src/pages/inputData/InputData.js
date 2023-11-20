// all of the import statments for the 
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
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
  //tehe constructor where the intial state is set to professor since this this is the first tab that is shown
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'professor',
    };
  }
//handle tab change method(since associated with the class personal notes) when a tab is clicked the method is called and setting the active tab to the selected tab and triggers a re-render
  handleTabChange = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };

  render() {
    const {
      activeTab,
    } = this.state;

    return (
        //the component uses tge tab container from the react bootstrap library  the nav key is used to create navigation tabs and each nav item represents a tab the event key prop is used to the coresponding tab key for the tab
      <Tab.Container id="data-tabs" activeKey={activeTab} onSelect={this.handleTabChange}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="professor">Professor</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="course">Course</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="room">Room</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="section">Section</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="professor">
            <div className='card'>
              <div className='card-header'>
                <h2>Professor</h2>
              </div>
              <div className='card-body'>
                {activeTab === 'professor' && (
                  <>
                    <AddProfessorButton />
                    <UpdateProfessorButtonComponent />
                    <DeleteprofessorbuttonComponent />
                  </>
                )}
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="course">
            <div className='card'>
              <div className='card-header'>
                <h2>Course</h2>
              </div>
              <div className='card-body'>
                {activeTab === 'course' && (
                  <>
                    <Addcoursebutton />
                    <Updatecoursebutton />
                    <Deletecoursebutton />
                  </>
                )}
              </div>
            </div>
            {/* inside each tab pane there is conditonal rendering buttions based on the active tab this ensures that the buttions for the current tab are being displayed */}
          </Tab.Pane>
          <Tab.Pane eventKey="room">
            <div className='card'>
              <div className='card-header'>
                <h2>Room</h2>
              </div>
              <div className='card-body'>
                {activeTab === 'room' && (
                  <>
                    <Addroombutton />
                    <Updateroombutton />
                    <Deleteroombutton />
                  </>
                )}
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="section">
            <div className='card'>
              <div className='card-header'>
                <h2>Section</h2>
              </div>
              <div className='card-body'>
                {activeTab === 'section' && (
                  <>
                    <AddSectionbutton />
                    <UpdateSectionButton />
                    <DeleteSectionbutton />
                  </>
                )}
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );
  }
}

export default InputData;
