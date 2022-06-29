import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import TimelineV4 from './components/TimelineV4'


if (document.getElementById('homepage')) {
    ReactDOM.render(<Home />, document.getElementById('homepage'));
}
else if(document.getElementById('timeline')){
    ReactDOM.render(<TimelineV4 />, document.getElementById('timeline'));
}
