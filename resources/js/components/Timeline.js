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
                showPrint : timelineOpject,
                series: [
                    {
                      name: 'Blue',
                      data: [
                        {
                          x: 'id-machine 1',
                          y: [
                            new Date("2022-05-18 06:44:46").getTime(),
                            new Date("2022-06-18 06:44:46").getTime()
                          ]
                        },
                      ]
                    },

                    ],
                options: {
                        chart: {
                          height: 350,
                          type: 'rangeBar'
                        },
                        plotOptions: {
                          bar: {
                            horizontal: true,
                            barHeight: '50%',
                            rangeBarGroupRows: true
                          }
                        },
                        colors: [
                          "#008FFB", "#00E36E", "#F0E040", "#DA4747"
                        ],
                        fill: {
                          type: 'solid'
                        },
                        xaxis: {
                          type: 'datetime'
                        },
                        legend: {
                          position: 'right'
                        },
                        tooltip: {
                          custom: function(opts) {
                            const fromYear = new Date(opts.y1).getFullYear()
                            const toYear = new Date(opts.y2).getFullYear()
                            const values = opts.ctx.rangeBar.getTooltipValues(opts)
                        
                            return (
                              ''
                            )
                          }
                        }
                      },
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
            <>
            <div id="chart_timeline">
                {/* <ShowTimeline /> */}
                {/* {/* <div>{this.state.timelineActivity[0].id_activity}</div> */}
                
                    {this.state.timelineActivityRework.map(function (x, i) {
                        
                    })}
                {/* <div>{this.state.timelineActivityRework[0].id_activity}</div> */}

                <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350} />
                    
                

            </div>
            
            </>
        );
    }
}

export default Timeline;
