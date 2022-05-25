import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import ShowTimeline from './Timeline/ShowTimeline';
class Timeline extends Component {

    constructor(props) {
            super(props);
  
            this.state = {
          
              }
        }

    lifeCycleTimeline() {
        this.getTimelineList();
    }
    
    getTimelineList = () => {
        let self = this;
        axios.get('/update/timeline/').then(function (response) {
            self.setState({
                employees: response.data
            });
        });
    }


    render() {
        return (
            <div id="chart_timeline">
                <ShowTimeline />
            </div>
        );
    }
}

export default Timeline;
