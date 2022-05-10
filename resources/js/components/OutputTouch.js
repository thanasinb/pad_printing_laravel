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
            role : {this.props.data.id_role}<br/>
            id_job : {this.props.data.id_job}<br/>
            item No: {this.props.data.item_no}<br/>
            oparation id : {this.props.data.operation}<br/>
            oparation name : {this.props.data.op_des}<br/>
            Qty order : {this.props.data.qty_order}<br/>
            Qty complete : {this.props.data.qty_comp}<br/>
            Qty open : {this.props.data.qty_open}<br/>
            id task : {this.props.data.id_task}<br/>
            id_staff : {this.props.data.id_staff}<br/>
            </div>
         );
    }
}
 
export default OutputTouch;