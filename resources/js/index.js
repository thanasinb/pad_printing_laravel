import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import TimelineMain from './components/TimelineMain'


// if (document.getElementById('homepage')) {
//     ReactDOM.render(<Home />, document.getElementById('homepage'));
// }
if(document.getElementById('homepage')){
    ReactDOM.render(<TimelineMain />, document.getElementById('homepage'));
}
