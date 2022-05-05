import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'


if (document.getElementById('homepage')) {
    ReactDOM.render(<Home />, document.getElementById('homepage'));
}
