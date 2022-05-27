import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
class ShowTimeline extends Component {

    constructor(props) {
            super(props);
            this.state = {
          
                series: [
                  // 
                  {
                    name: 'Blue',
                    data: [
                      {
                        x: 'id-machine 1',
                        y: [
                          new Date(1789, 3, 30, 15, 10, 10).getTime(),
                          new Date(1789, 3, 30, 18, 50, 10).getTime()
                        ]
                      },
                    ]
                  },
                  // 
                  {
                    name: 'Green',
                    data: [
                      {
                        x: 'id-machine 2',
                        y: [
                            new Date(1789, 3, 29, 15, 10, 10).getTime(),
                            new Date(1789, 3, 29, 18, 50, 10).getTime()
                          ]
                      },
                    ]
                  },
                  //
                  {
                    name: 'Yellow',
                    data: [
                      {
                        x: 'id-machine 3',
                        y: [
                            new Date(1789, 3, 29, 15, 10, 10).getTime(),
                            new Date(1789, 3, 29, 18, 50, 10).getTime()
                          ]
                      },
                    ]
                  },
                  //
                  {
                    name: 'Red',
                    data: [
                      {
                        x: 'id-machine 4',
                        y: [
                            new Date(1789, 3, 29, 15, 10, 10).getTime(),
                            new Date(1789, 3, 29, 18, 50, 10).getTime()
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

    render() {
        return (
            <div id="timeline">
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350} />
                </div>
            </div>
        );
    }
}

export default ShowTimeline;
