import React, { Component,useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { isEmpty } from 'lodash';
// import 'bootstrap/dist/css/bootstrap.min.css';
var allData =[];
var listIdMachine = [];
var dataSeries = [
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

var tempCurrentDate = new Date();
var shif = '';
var intDate = parseInt(tempCurrentDate.getHours());
if(intDate >=7 && intDate <= 19){
    shif = '07:00:00';
  }
else{
    shif = '19:00:00';
  }
let InitialTime = new Date();
// console.log(InitialTime);
let InitialTimeDate = InitialTime.getDate()+"/"+(InitialTime.getMonth()+1)+"/"+InitialTime.getFullYear();
// console.log(new Date(parseInt(InitialTime.getFullYear()),parseInt(InitialTime.getMonth()),parseInt(InitialTime.getDate())).getTime());
class TimelineV2 extends Component {
    constructor(props) {
            super(props);

            this.state = {
                selectShif: shif,
                selectDate: InitialTimeDate,
                unixDate: new Date(parseInt(InitialTime.getFullYear()),parseInt(InitialTime.getMonth()),parseInt(InitialTime.getDate())).getTime(),
                nowDate : new Date(),
                timeline : [],
                resultTimeline:[],
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
                          onDatasetHover: {
                            highlightDataSeries: false,
            
                        },
                        style:{
                          padding: '5px 10px'
                        },
                          theme:'dark',
                          custom: function(opts) {
                            var data = opts.ctx.w.globals.initialSeries[opts.seriesIndex].data[opts.dataPointIndex];
                            const fromYear = new Date(opts.y1).getFullYear()
                            const toYear = new Date(opts.y2).getFullYear()
                            const values = opts.ctx.rangeBar.getTooltipValues(opts)
                            const timeStartTemp = new Date(parseInt(values.start))
                            const timeEndTemp = new Date(parseInt(values.end))
                            const timeStart = moment(timeStartTemp).format("DD.MM.yyyy HH:mm:ss");
                            const timeEnd = moment(timeEndTemp).format("DD.MM.yyyy HH:mm:ss");
                            // console.log(opts);
                            // console.log(data);
                        
                            return (
                              
                              '<div>Time Start : '+timeStart+' '+'</div>'+
                              '<div>Time Close :'+timeEnd+' '+'</div>'+
                              '<div>ID Staff: '+data.staff+' '+'</div>'+
                              '<div>'
                              +'<form >'
                              +'<label>Enter Comment :'
                              +'  <input '
                              +'    type="text" '
                              +'  />'
                              +' </label>'
                              +'<input type="submit" />'
                              +'</form>'
                            +'</div>'
                            )
                          }
                        }
                      },
            }
        }
    

    componentDidMount = () => {
        this.getQueueMachineInfo();
        this.getTimeline();
        this.setState({
          resultTimeline : []
        });
        // this.startTimeline();
        // this.onChangeDate(new Date());
        this.submitTimeline();
        var x =this.state.resultTimeline;
        console.log(x);
        
    }
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    getTimeline = () => {
        let self = this;
        axios.get('/update/timelineAll/').then(function (response) {
            console.log(response.data);
            let resultData = response.data;
            let dataLength = Object.keys(resultData).length;
            console.log(dataLength);
            for(let i = 0 ; i<dataLength ; i++){
              for(let j = 0 ; j<(resultData[i].length) ; j++){
                allData.push(resultData[i][j]);
              }
            }
            allData.sort((a, b) => (a.time_start > b.time_start) ? 1 : -1)
            console.log(allData);

            self.setState({
              timeline: allData
          });

        });
        
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getQueueMachineInfo(){
      axios.get('/update/getQueueMachineInfo/').then(function (response) {
        console.log(response.data);
        
    });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onChangeShif = (e) => {
      this.setState({
        selectShif : e.target.value
    });
  }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    submitTimeline = (e) => {

      if(e != null){
        e.preventDefault();
      }
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
      var shifDateUnix = this.state.selectShif;
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
      console.log(shifDateUnix);
      console.log(unixDate);
      var tempMachine;
      var tempCloseDate;
      var tempStaff;
      var count=0;
      this.state.timeline.map(function (x, i) {
        if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
          
          
          
          if(count>1){

            dataSeries[0].data.push({
              x: 'ID : '+tempMachine,
              y: [
                new Date(tempCloseDate).getTime(),
                new Date(x.time_start).getTime()
              ],
              staff : '-',
              count : '-'
            });

          }

          if( x.id_activity!=null ){
            if(x.id_break != 0){

                dataSeries[1].data.push({
                  x: 'ID : '+x.id_machine,
                  y: [
                    new Date(x.time_start).getTime(),
                    new Date(x.break_start).getTime()
                  ],
                  staff : x.id_staff,
                  count : parseInt(x.no_pulse1) / parseInt(x.divider)
                });

                dataSeries[2].data.push({
                  x: 'ID : '+x.id_machine,
                  y: [
                    new Date(x.break_start).getTime(),
                    new Date(x.break_stop).getTime()
                  ],
                  staff : x.id_staff,
                  count : parseInt(x.no_pulse1) / parseInt(x.divider)
                });

                dataSeries[1].data.push({
                  x: 'ID : '+x.id_machine,
                  y: [
                    new Date(x.break_stop).getTime(),
                    new Date(x.time_close).getTime()
                  ],
                  staff : x.id_staff,
                  count : parseInt(x.no_pulse1) / parseInt(x.divider)
                });
            }
          }

          else{
            dataSeries[3].data.push({
              x: 'ID : '+x.id_machine,
              y: [
                new Date(x.time_start).getTime(),
                new Date(x.time_close).getTime()
              ],
              staff : x.id_staff,
              count : parseInt(x.no_pulse1) / parseInt(x.divider)
            });
          }

          tempMachine = x.id_machine;
          tempCloseDate = x.time_close;
          tempStaff = x.id_staff;
          count++;



          
        }})
        count = 0;
      console.log('OK'); 
    this.setState({
      series:dataSeries
    });
    count=0;
    console.log('OK');
    console.log(dataSeries);
    window.dispatchEvent(new Event('resize'))


    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    render() {
        return (
            <>
                <div id="chart_timeline" >
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
