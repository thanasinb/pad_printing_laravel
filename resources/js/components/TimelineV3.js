import React, { Component,useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { forEach, isEmpty } from 'lodash';
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
var refreshCount = 1000;
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
                id_machine :[],
                series: dataSeries,
                options: {
                        chart: {
                          height: 350,
                          type: 'rangeBar',
                          events: {
                            dataPointSelection: (event, chartContext, config) => {
                              console.log(chartContext, config);
                            }
                          }
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
                          type: 'datetime',
                          labels: {
                            rotate: -45,
                            format: 'HH:mm:ss',
                            datetimeUTC: false,
                          }
                        },
                        legend: {
                          position: 'right'
                        },
                        tooltip: {
                          enabled:true,
                          onDatasetHover: {
                            highlightDataSeries: false,
            
                        },
                        // events: {
                        //   dataPointSelection: (event, chartContext, config) => {
                        //     console.log(chartContext);
                        //     console.log(event);
                        //     console.log(config);
                        // },
                          theme:'dark',
                          custom: function(opts) {
                            var data = opts.ctx.w.globals.initialSeries[opts.seriesIndex].data[opts.dataPointIndex];
                            const fromYear = new Date(opts.y1).getFullYear()
                            const toYear = new Date(opts.y2).getFullYear()
                            const values = opts.ctx.rangeBar.getTooltipValues(opts)
                            const timeStartTemp = new Date(parseInt(values.start))
                            const timeEndTemp = new Date(parseInt(values.end))
                            const timeStart = moment(timeStartTemp).format("DD/MM/yyyy HH:mm:ss");
                            const timeEnd = moment(timeEndTemp).format("DD/MM/yyyy HH:mm:ss");
                            // console.log(opts);
                            // console.log(opts.seriesIndex);
                            var returnValues;
                            if(opts.seriesIndex == 1){
                              returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                 '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                 '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                 '<div>ID Job     : '+data.id_job+' '+'</div>'+
                                                 '<div>ID Task    : '+data.id_task+' '+'</div>'+
                                                 '<div>Item Count : '+data.count+' '+'</div>'+
                                                 '<div>Item No.   : '+data.item_no+' '+'</div>'+
                                                 '<div>Total Work : '+data.total_work+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 2){
                              returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                   '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                   '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                   '<div>Break Code : '+data.break_code+' '+'</div>'+
                                                   '<div>Total Break  : '+data.break_duration+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 3){
                              returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                   '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                   '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                   '<div>Code DT    : '+data.code_dt+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 0){
                              returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                   '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                   '<div>ID Staff   : '+data.staff+' '+'</div>' ;
                            }
                        
                            return returnValues
                          }
                        }
                      },
            }
        }
    

    componentDidMount = () => {

          this.getTimeline();
          this.submitTimeline();  
        
    }
    // UNSAFE_componentWillMount = () =>{
    //     this.submitTimeline();
    // }
    componentWillUnmount() {
    }
 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    getTimeline = () => {
        let self = this;
        axios.get('/update/timelineAll/').then(function (response) {
            // console.log(response.data);
            let resultData = response.data;
            let dataLength = Object.keys(resultData).length;
            for(let i = 0 ; i<dataLength ; i++){
              for(let j = 0 ; j<(resultData[i].length) ; j++){
                allData.push(resultData[i][j]);
              }
            }
            allData.sort((a, b) => (a.time_start > b.time_start) ? 1 : -1)

            self.setState({
              timeline: allData
          });
          // console.log(allData);

        });
        
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getQueueMachineInfo(){
      axios.get('/update/getQueueMachineInfo/').then(function (response) {
        // console.log(response.data);
        listIdMachine = [];
        response.data.map(function (id,index){
          listIdMachine.push({
            id_mc : id,
            staffLast : '-',
            timeLast : '-',
            count: 0})
        });
    });
    // console.log(listIdMachine);
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
      this.getQueueMachineInfo();
      var dateDaySelect = this.state.selectDate.split('/');
      // console.log(dateDaySelect);
      console.log(this.state.timeline);
      this.state.timeline.map(function (x, i) {
        listIdMachine.map(function(id_mc){
          
          if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
            
            if(x.id_machine == id_mc.id_mc){
              if(id_mc.timeLast == '0000-00-00 00:00:00'){
                id_mc.timeLast = x.time_start;
              }
              if((id_mc.count>0) && (id_mc.timeLast != '-')){
                // console.log(id_mc.timeLast);
                dataSeries[0].data.push({
                x: 'ID : '+id_mc.id_mc,
                y: [
                  new Date(id_mc.timeLast).getTime(),
                  new Date(x.time_start).getTime()
                ],
                staff : id_mc.staffLast+'(Latest)',
              });
              }
              else{
                dataSeries[0].data.push({
                  x: 'ID : '+id_mc.id_mc,
                  y: [
                    new Date(dateDaySelect[2]+'-'+dateDaySelect[1]+'-'+dateDaySelect[0]+' '+shifDateUnix).getTime(),
                    new Date(x.time_start).getTime()
                  ],
                  staff : id_mc.staffLast,
                });
              }
              
              if( x.id_activity!=null){
                    if(x.id_break != 0){
        
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.time_start).getTime(),
                            new Date(x.break_start).getTime()
                          ],
                          staff : x.id_staff,
                          count : parseInt(x.no_pulse1) / parseFloat(x.divider),
                          item_no: x.item_no,
                          id_job: x.id_job,
                          id_task: x.id_task,
                          total_work: x.total_work
                        });
        
                        dataSeries[2].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.break_start).getTime(),
                            new Date(x.break_stop).getTime()
                          ],
                          staff : x.id_staff,
                          count : parseInt(x.no_pulse1) / parseFloat(x.divider),
                          break_code : x.break_code,
                          break_duration : x.break_duration,
                        });
        
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.break_stop).getTime(),
                            new Date(x.time_close).getTime()
                          ],
                          staff : x.id_staff,
                          count : parseInt(x.no_pulse1) / parseFloat(x.divider),
                          item_no: x.item_no,
                          id_job: x.id_job,
                          id_task: x.id_task,
                          total_work: x.total_work
                        });
                    }
                    else{
                      dataSeries[1].data.push({
                        x: 'ID : '+x.id_machine,
                        y: [
                          new Date(x.time_start).getTime(),
                          new Date(x.time_close).getTime()
                        ],
                        staff : x.id_staff,
                        count : parseInt(x.no_pulse1) / parseFloat(x.divider),
                        item_no: x.item_no,
                        id_job: x.id_job,
                        id_task: x.id_task,
                        total_work: x.total_work
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
                      code_dt : x.id_code_downtime
                    });
                  }

                  id_mc.timeLast = x.time_close;
                  id_mc.staffLast= x.id_staff;
                  id_mc.count = id_mc.count + 1;
            }
      }})
      
        // if(((new Date(x.time_start).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
          
        //   if(count>0){

        //     dataSeries[0].data.push({
        //       x: 'ID : '+tempMachine,
        //       y: [
        //         new Date(tempCloseDate).getTime(),
        //         new Date(x.time_start).getTime()
        //       ],
        //       staff : tempStaff,
        //       count : '-'
        //     });

        //   }
          

        //   if( x.id_activity!=null ){
        //     if(x.id_break != 0){

        //         dataSeries[1].data.push({
        //           x: 'ID : '+x.id_machine,
        //           y: [
        //             new Date(x.time_start).getTime(),
        //             new Date(x.break_start).getTime()
        //           ],
        //           staff : x.id_staff,
        //           count : parseInt(x.no_pulse1) / parseInt(x.divider)
        //         });

        //         dataSeries[2].data.push({
        //           x: 'ID : '+x.id_machine,
        //           y: [
        //             new Date(x.break_start).getTime(),
        //             new Date(x.break_stop).getTime()
        //           ],
        //           staff : x.id_staff,
        //           count : parseInt(x.no_pulse1) / parseInt(x.divider)
        //         });

        //         dataSeries[1].data.push({
        //           x: 'ID : '+x.id_machine,
        //           y: [
        //             new Date(x.break_stop).getTime(),
        //             new Date(x.time_close).getTime()
        //           ],
        //           staff : x.id_staff,
        //           count : parseInt(x.no_pulse1) / parseInt(x.divider)
        //         });
        //     }
        //   }

        //   else{
        //     dataSeries[3].data.push({
        //       x: 'ID : '+x.id_machine,
        //       y: [
        //         new Date(x.time_start).getTime(),
        //         new Date(x.time_close).getTime()
        //       ],
        //       staff : x.id_staff,
        //       count : parseInt(x.no_pulse1) / parseInt(x.divider)
        //     });
        //   }

          
        //   count++;



          
        // }
      })
      // console.log(listIdMachine);
      // console.log('OK'); 
    this.setState({
      series:dataSeries
    });
    console.log('OK');
    console.log(dataSeries);
    window.dispatchEvent(new Event('resize'))

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    render() {
        return (
            <>
                <div id="chart_timeline" >
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={400}  />                
                    {window.dispatchEvent(new Event('resize'))}
                </div> 
            <div className='ui container stackable two column grid'>
            <div className='column'>
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
                <DatePicker name='Date' onChange={this.onChangeDate} value={this.state.nowDate} clearIcon={null} />
              </div>
              <input type="submit" value="Submit" />
            </form>
            </div>
            <div className='column'>
                
            </div>
            </div>
            </>
            
        );
    }
}

export default TimelineV2;
