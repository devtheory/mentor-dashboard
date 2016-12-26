require('./assets/app.css');
require('./assets/menu.css');
require('./assets/blabs.css');

import React from 'react';
import ReactDOM from 'react-dom';
import MentorDashboard from 'components/mentor-dashboard';
import $ from 'jquery';

let mountNode = document.getElementById('app');
ReactDOM.render(
  < MentorDashboard />, mountNode
);
