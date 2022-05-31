import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import ShowTimeline from './ShowTimeline';
class ManageTimeline extends Component {

    constructor(props) {
            super(props);
            this.state = {
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
              <ReactApexChart options={this.state.options} series={[this.props.series]} type="rangeBar" height={350} />
          </div>
      </div>
        );
    }
}

export default ManageTimeline;
