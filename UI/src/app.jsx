/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM PropTypes*/
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */
/* eslint "no-alert": "off" */

import IssueList from './IssueList.jsx';
const contentNode = document.getElementById('contents');
ReactDOM.render(<IssueList />, contentNode); // Render the component inside the content Node