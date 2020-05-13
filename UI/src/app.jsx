/* eslint linebreak-style: ["error", "windows"] */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';  

const contentNode = document.getElementById('contents');
const element = (
    <Router>
        <Page/>
    </Router>
)
ReactDOM.render(element, contentNode); // Render the component inside the content Node
if (module.hot) {
    module.hot.accept();
    }