import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import holycross from '../images/holycross.png';
import "../App.css";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <Navbar.Brand className="app-logo" href="/">
          <img
            src={holycross}
            width="50"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
          Holy Cross of Davao College
        </Navbar.Brand>
      </Navbar>
      <div className='sidebar'>
        <CDBSidebar textColor="#333" backgroundColor="linear-gradient(to right, white, red)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Students<br />Management<br /> System
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/students" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Students List</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/manage" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Manage Students</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Navigation;
