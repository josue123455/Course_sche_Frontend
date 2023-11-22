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
import { Link } from 'react-router-dom';
import ManageDataButton from './buttons/ManageDataButton.js';

class InputData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'professor',
    };
  }

  handleTabChange = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <div>
        <div style={{ margin: '10px' }}>
          <Link to="/">
            <button>Go back to Calendar View</button>
          </Link>
        </div>
        {/* Tab Container */}
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
            <Nav.Item>
              <Nav.Link eventKey="export">Export/Import</Nav.Link>
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
            <Tab.Pane eventKey="export">
              <div className='card'>
                <div className='card-header'>
                  <h2>Export/Import</h2>
                </div>
                <div className='card-body'>
                  {activeTab === 'export' && (
                    <>
                      <ManageDataButton />
                    </>
                  )}
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default InputData;