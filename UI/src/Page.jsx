import React from 'react';
import Contents from './Contents.jsx';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <NavLink exact to="/" activeClassName="current">Home</NavLink>
            {' | '}
            <NavLink to="/issues" activeClassName="current">Issue List</NavLink>
            {' | '}
            <NavLink to="/report" activeClassName="current">Report</NavLink>
        </nav>
    );
};

export default function Page() {
    return (
        <div>
            <NavBar />
            <Contents />
        </div>
    );
};