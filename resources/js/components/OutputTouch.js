import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class OutputTouch extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <>
            {this.props.data}
            </>
         );
    }
}
 
export default OutputTouch;