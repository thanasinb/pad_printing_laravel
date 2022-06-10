import React, { Component } from 'react';

class DashboardRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const getColor = (status_work) =>{
            if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return 'blue';
            if (status_work === 1 ) return 'green';
            if (status_work === 2 ) return 'yellow';
            if (status_work === 4 ) return 'red';
            return '';
        }
        const getAccum = (qty_complete,qty_process,divider) =>{
            var qty_accumc;
            qty_accumc = qty_complete + Math.floor(qty_process*divider);
            return qty_accumc;
        }

        return (            
            <tr>
                <td style={{ backgroundColor: getColor(this.props.data.status_work) }}>
                <td style={{ color: 'white' }}>{ (this.props.data.id_staff )} </td>
                </td>
                <td>{ this.props.data.id_machine }</td>
                <td>{ this.props.data.qty_process }</td>
                <td>{ this.props.data.qty_repeat }</td>  
                <td>{ this.props.data.task_complete }</td>
                <td>{ this.props.data.status_backup }</td>                                        
                <td>{ this.props.data.qty_order }</td>
                <td>{ getAccum(this.props.data.qty_complete,this.props.data.qty_process,this.props.data.divider) }</td>         
                <td>{ this.props.data.qty_open }</td>
                <td>{ this.props.data.run_time_std}</td>
                <td>{ this.props.data.divider }</td>
                <td>{ this.props.data.run_time_actual }</td>
                <td>{ this.props.data.rework}</td>            
            </tr>
        );
    }
}

export default DashboardRow;
