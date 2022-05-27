import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import ShowTimeline from './Timeline/ShowTimeline';
import ManageTimeline from './Timeline/ManageTimeline';
class Timeline extends Component {

    constructor(props) {
            super(props);
  
            this.state = {
                timelineActivity : [],
                timelineActivityDowntime : [],
                timelineActivityRework : [],
            }
        }

    componentDidMount() {
        this.getTimelineActivity();
        this.getTimelineActivityDowntime();
        this.getTimelineActivityRework();
    }
    
    getTimelineActivity = () => {
        let self = this;
        axios.get('/update/timelineActivity/').then(function (response) {
            self.setState({
                timelineActivity: response.data
            });
        });
    }

    getTimelineActivityDowntime = () => {
        let self = this;
        axios.get('/update/timelineActivityDowntime/').then(function (response) {
            self.setState({
                timelineActivityDowntime: response.data
            });
        });
    }

    getTimelineActivityRework = () => {
        let self = this;
        axios.get('/update/timelineActivityRework/').then(function (response) {
            self.setState({
                timelineActivityRework: response.data
            });
        });
    }


    render() {
        return (
            <div id="chart_timeline">
                <ShowTimeline />
                {/* {/* <div>{this.state.timelineActivity[0].id_activity}</div> */}
                    {this.state.timelineActivityDowntime.map(function (x, i) {
                        return <ManageTimeline key={i} data={x} /> 
                    })}
                {/* <div>{this.state.timelineActivityRework[0].id_activity}</div> */}
            </div>
        );
    }
}

export default Timeline;
