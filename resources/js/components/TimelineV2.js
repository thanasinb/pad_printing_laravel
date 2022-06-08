import React, { Component,useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

;
let dataSeries = [
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
class TimelineV2 extends Component {
    constructor(props) {
            super(props);

            this.state = {
                selectShif: '---Select---',
                selectDate: null,
                unixDate: new Date().getTime(),
                nowDate : new Date(),
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
                          enabled:true,
                          custom: function(opts) {
                            const fromYear = new Date(opts.y1).getFullYear()
                            const toYear = new Date(opts.y2).getFullYear()
                            const values = opts.ctx.rangeBar.getTooltipValues(opts)
                            const timeStartTemp = new Date(parseInt(values.start))
                            const timeEndTemp = new Date(parseInt(values.end))
                            const timeStart = moment(timeStartTemp).format("DD.MM.yyyy HH:mm:ss");
                            const timeEnd = moment(timeEndTemp).format("DD.MM.yyyy HH:mm:ss");
                        
                            return (
                              '<div>'+timeStart+' '+'</div>'+
                              '<div>'+timeEnd+' '+'</div>'
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

  setDefualt = (e) => {
    console.log(e);
    const temp = String(e);
    const toUnix = (new Date(temp).getTime());
    const toStringDate = new Date(toUnix)
    const stringDate = toStringDate.getDate()+"/"+(toStringDate.getMonth()+1)+"/"+toStringDate.getFullYear()
    this.setState({
      unixDate: toUnix,
      nowDate: toStringDate,
      selectDate : stringDate
    });
  }

    onChangeDate = (e) => {
      console.log(e);
      const temp = String(e);
      const toUnix = (new Date(temp).getTime());
      const toStringDate = new Date(toUnix)
      const stringDate = toStringDate.getDate()+"/"+(toStringDate.getMonth()+1)+"/"+toStringDate.getFullYear()
      this.setState({
        unixDate: toUnix,
        nowDate: toStringDate,
        selectDate : stringDate
      });
    }
    onChangeShif = (e) => {
      this.setState({
        selectShif : e.target.value
    });
  }
    submitTimeline = () => {
      event.preventDefault();
      dataSeries = [
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
      var shifDateUnix = this.state.selectShif
      if(shifDateUnix == '07:00:00'){
        var unixDate = this.state.unixDate+(7*60*60*1000);
      }
      else if (shifDateUnix == '19:00:00'){
        var unixDate = this.state.unixDate+(19*60*60*1000);
      }
      else{
        alert('Select Shif !!');
        return;
      }
      
      
      this.state.timelineActivity.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
        
          dataSeries[1].data.push({
            x: 'ID : '+x.id_machine,
            y: [
              new Date(x.time_start).getTime(),
              new Date(x.time_close).getTime()
            ]
          });
        }})
      console.log('OK');
      this.state.timelineActivityRework.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
        dataSeries[1].data.push({
          x: 'ID : '+x.id_machine,
          y: [
            new Date(x.time_start).getTime(),
            new Date(x.time_close).getTime()
          ]
        });
    }})
    console.log('OK');
      this.state.timelineBreak.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
        dataSeries[2].data.push({
          x: 'ID : '+x.id_machine,
          y: [
            new Date(x.break_start).getTime(),
            new Date(x.break_stop).getTime()
          ]
        });
    }})
    console.log('OK');
      this.state.timelineActivityRework.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
        dataSeries[2].data.push({
          x: 'ID : '+x.id_machine,
          y: [
            new Date(x.break_start).getTime(),
            new Date(x.break_stop).getTime()
          ]
        });
    }})
    console.log('OK');
      this.state.timelineActivityDowntime.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
        dataSeries[3].data.push({
          x: 'ID : '+x.id_machine,
          y: [
            new Date(x.time_start).getTime(),
            new Date(x.time_close).getTime()
          ]
        });
    }})
    this.setState({
      series:dataSeries
    });
    console.log('OK');
    console.log(dataSeries);
    window.dispatchEvent(new Event('resize'))


    }

    
    render() {
        return (
            <>
                <div id="chart_timeline">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350}  />                
                    {window.dispatchEvent(new Event('resize'))}
                </div> 
            <div>
              <form onSubmit={this.submitTimeline}>
                    <label>
                      Shif : 
                      <select id="lang" onChange={this.onChangeShif} value={this.state.selectShif}>
                        <option value="Select">---Select---</option>
                        <option value="07:00:00">Day</option>
                        <option value="19:00:00">Night</option>
                    </select>
                    </label>
              <div>
                Date:
                <DatePicker name='Date' onChange={this.onChangeDate} value={this.state.nowDate}  />
              </div>
              <input type="submit" value="Submit" />
            </form>
            </div>
            </>
            
        );
    }
}

export default TimelineV2;
