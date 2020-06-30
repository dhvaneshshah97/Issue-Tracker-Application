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
import SignInNavItem from './SignInNavItem.jsx';
import UserContext from './UserContext.js';

function NavBar({ user, onUserChange }) {
    return (
        <Navbar fixedTop >
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
            <Col sm={4} >
                <Navbar.Form>
                    <Search />
                </Navbar.Form>
            </Col>
            <Nav pullRight>
                <IssueAddNavItem user={user} />
                <SignInNavItem user={user} onUserChange={onUserChange} />
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

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { signedIn: false } };
        this.onUserChange = this.onUserChange.bind(this);
    }
    async componentDidMount() {
        const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
        const response = await fetch(`${apiEndpoint}/user`, {
            method: 'POST',
            credentials: 'include',
        });
        const body = await response.text();
        const result = JSON.parse(body);
        const { signedIn, givenName } = result;
        this.setState({ user: { signedIn, givenName } });
    }
    onUserChange(user) {
        this.setState({ user });
    }
    render() {
        const { user } = this.state;
        return (
            <div>
                <NavBar user={user} onUserChange={this.onUserChange} />
                <Grid fluid>
                    <UserContext.Provider value={user}>
                        <Contents />
                    </UserContext.Provider>
                </Grid>
                <Footer />
            </div >
        );
    }

};