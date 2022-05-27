import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
class ManageTimeline extends Component {

    constructor(props) {
            super(props);
        }

    render() {
        return (
            <tr>
                <th>{this.props.data.id_activity_downtime}</th>
                <td>{this.props.data.time_start}--</td>
                <td>{this.props.data.time_close}</td>
            </tr>
                
        );
    }
}

export default ManageTimeline;
