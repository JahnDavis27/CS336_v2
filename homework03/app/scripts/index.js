//https://web.archive.org/web/20161019043332/https://facebook.github.io/react/docs/tutorial.html
//https://cs.calvin.edu/courses/cs/336/kvlinden/09webpack/lab.html

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import '../css/base.css';

import PersonBox from './PersonBox.js'

ReactDOM.render(
  <PersonBox url='/people' pollInterval={2000} />,
  document.getElementById('content')
);