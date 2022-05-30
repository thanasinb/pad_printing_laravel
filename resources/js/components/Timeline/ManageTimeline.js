import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import ShowTimeline from './ShowTimeline';
class ManageTimeline extends Component {

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
                          new Date(2022, 3, 30, 15, 10, 10).getTime(),
                          new Date(2022, 3, 30, 18, 50, 10).getTime()
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
    componentDidMount(){
        this.state.series = this.state.series.data.concat(
              {
                x: 'id-machine 1',
                y: [
                    new Date("2022-05-18 06:44:46").getTime(),
                    new Date("2022-05-18 08:48:46").getTime()
                ]
              },
          )
    }

    render() {
        return (
            // <tr>
            //     <th>{this.props.data.id_activity_downtime}</th>
            //     <td>{this.props.data.time_start}--</td>
            //     <td>{this.props.data.time_close}</td>
            // </tr>
            <div id="timeline">
            <ShowTimeline data={this.state.series} />
        </div>
        );
    }
}

export default ManageTimeline;
