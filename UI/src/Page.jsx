import React from 'react';
import Contents from './Contents.jsx';
// import { NavLink, Link } from 'react-router-dom';
import {
    Navbar, Nav, NavItem, NavDropdown,
    MenuItem, Glyphicon, Tooltip, OverlayTrigger, Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Search from './Search.jsx';

function NavBar() {
    return (
        <Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand>Issue Tracker Application</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/issues">
                    <NavItem>Issue List</NavItem>
                </LinkContainer>
                <LinkContainer to="/report">
                    <NavItem>Report</NavItem>
                </LinkContainer>
            </Nav>
            <Col sm={5}>
                <Navbar.Form>
                    <Search />
                </Navbar.Form>
            </Col>
            <Nav pullRight>
                <IssueAddNavItem />
                <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-vertical" />} noCaret >
                    <LinkContainer to="/about">
                        <MenuItem>About</MenuItem>
                    </LinkContainer>

                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

function Footer() {
    return (
        <small>
            <hr />
            <p className="text-center">
                Full source code availabel at this
                {' '}
                <a href="https://github.com/dhvaneshshah97/Issue_Tracker_Application_MERN_Stack_GraphQL" target="_blank">
                    GitHub Respository
                </a>
            </p>
        </small>
    )
}

export default function Page() {
    return (
        <div>
            <NavBar />
            <Grid fluid>
                <Contents />
            </Grid>
            <Footer />
        </div>
    );
};