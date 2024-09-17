import React, { useContext, useState } from 'react';
import { Navbar, Nav, Button, Form, Dropdown } from 'react-bootstrap';
import './Navbar.css';  // Custom CSS for extra styling
import { useCalendar } from '@/context/CalendarProvider';
import { useTheme } from 'styled-components';
import { AppContext } from '@/main';

const NavbarComponent = () => {
  const context = useContext(AppContext)?.topBarHandlers
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  const [dropdownSelection, setDropdownSelection] = useState('Weeks');

  console.log("topBarHandlers",context);

  const handleGoPrev = () => {
    if (context?.current?.handleGoPrev) {
      context.current.handleGoPrev();
    }
  };

  const handleGoNext = () => {
    if (context?.current?.handleGoNext) {
      context.current.handleGoNext();
    }
  };

  const handleGoToday = () => {
    if (context?.current?.handleGoToday) {
      context.current.handleGoToday();
    }
  };

  const handleZoomIn = () => {
    if (context?.current?.zoomIn) {
      context.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (context?.current?.zoomOut) {
      context.current.zoomOut();
    }
  };

  const handleFilterData = () => {
    if (context?.current?.handleFilterData) {
      context.current.handleFilterData();
    }
  };

  const handleClearFilterData = (event: any) => {
    if (context?.current?.onClearFilterData) {
      context.current.onClearFilterData(event);
    }
  };


  return (
    <Navbar className="custom-navbar" bg="light" expand="lg">
      <Nav className="me-auto">
        <Nav.Link className="nav-title" href="#">Mini Float</Nav.Link>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="dropdown-button">
            <i className="bi bi-layers"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button className="filter-button" variant="light" onClick={handleClearFilterData} >
          <i className="bi bi-funnel"></i> clear Filter
        </Button>
      </Nav>

      <Nav className="ml-auto controls">
        <Button variant="light" onClick={handleGoPrev} className="icon-button">
          <i className="bi bi-arrow-left"></i>
        </Button>

        <Button variant="light" className="icon-button" onClick={handleGoNext}>
          <i className="bi bi-arrow-right"></i>
        </Button>

        <Button variant="light" className="today-button" onClick={handleGoToday}>Today</Button>
        {/* <Dropdown onSelect={handleDropdownSelect}>
                  <Dropdown.Toggle variant="light" className="dropdown-button">
                    <i className="bi bi-calendar3"></i> {dropdownSelection}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Hours">Hours</Dropdown.Item>
                    <Dropdown.Item eventKey="Day">Day</Dropdown.Item>
                    <Dropdown.Item eventKey="Weeks">Weeks</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}

<Button variant="light" onClick={handleZoomIn} className="icon-button">
          <i className="bi bi-zoom-in"></i>
        </Button>
{/* {(context.current.isNextZoom === false)? "Hours" : !context.current.isPrevZoom? "Week" : "Day"} */}
        <Button variant="light" onClick={handleZoomOut} className="icon-button">
          <i className="bi bi-zoom-out"></i>
        </Button>
        

        <Button variant="light" className="icon-button">
          <i className="bi bi-list"></i>
        </Button>

        <Button variant="light" className="icon-button">
          <i className="bi bi-arrows-fullscreen"></i>
        </Button>

        <Button variant="primary" className="add-button">
          <i className="bi bi-plus"></i>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
