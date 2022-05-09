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
            <div>
            name_first : {this.props.data.name_first}<br/>
            name_last : {this.props.data.name_last}<br/>
            role : {this.props.data.name_first}<br/>
            id_job : {this.props.data.name_first}<br/>
            item No: {this.props.data.name_first}<br/>
            oparation id : {this.props.data.name_first}<br/>
            oparation name : {this.props.data.name_first}<br/>
            Qty order : {this.props.data.name_first}<br/>
            Qty complete : {this.props.data.name_first}<br/>
            Qty open : {this.props.data.name_first}<br/>
            id task : {this.props.data.name_first}<br/>
            id_staff : {this.props.data.id_staff}<br/>
            </div>
         );
    }
}
 
export default OutputTouch;