import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './commentBox';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import '../css/base.css';

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={60000}/>,
    document.getElementById('content')
);