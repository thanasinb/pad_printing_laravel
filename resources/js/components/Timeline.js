import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import ShowTimeline from './Timeline/ShowTimeline';
import ManageTimeline from './Timeline/ManageTimeline';
import { data } from 'autoprefixer';

const dataSeries = [
  {
    name: 'Idle',
    data: []
  },

  {
    name: 'Used',
    data: []
  },

  {
    name: 'Break',
    data: []
  },

  {
    name: 'Downtime',
    data: []
  },
  ];

    
class Timeline extends Component {
    constructor(props) {
            super(props);

            this.state = {
                timelineActivity : [],
                timelineActivityDowntime : [],
                timelineActivityRework : [],
                timelineBreak : [],
                timelineBreakRework : [],
                series: dataSeries,
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
        this.getTimelineBreak();
        this.getTimelineBreakRework();
        console.log(dataSeries);
        
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

    getTimelineBreak = () => {
      let self = this;
      axios.get('/update/timelineBreak/').then(function (response) {
          self.setState({
              timelineBreak: response.data
          });
      });
  }

  getTimelineBreakRework = () => {
    let self = this;
    axios.get('/update/timelineBreakRework/').then(function (response) {
        self.setState({
            timelineBreakRework: response.data
        });
    });
}
    
    
    render() {
        return (
            <>
            <div id="chart_timeline">
                    {this.state.timelineActivity.map(function (x, i) {
                      
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.time_start).getTime(),
                            new Date(x.time_close).getTime()
                          ]
                        });
                    })}

                    {this.state.timelineActivityRework.map(function (x, i) {
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.time_start).getTime(),
                            new Date(x.time_close).getTime()
                          ]
                        });
                    })}

                    {this.state.timelineBreak.map(function (x, i) {
                        dataSeries[2].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.break_start).getTime(),
                            new Date(x.break_stop).getTime()
                          ]
                        });
                    })}

                    {this.state.timelineActivityRework.map(function (x, i) {
                        dataSeries[2].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.break_start).getTime(),
                            new Date(x.break_stop).getTime()
                          ]
                        });
                    })}

                    {this.state.timelineActivityDowntime.map(function (x, i) {
                        dataSeries[3].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.time_start).getTime(),
                            new Date(x.time_close).getTime()
                          ]
                        });
                    })}
                <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350} />                
            </div>
            </>
            
        );
    }
}

export default Timeline;
