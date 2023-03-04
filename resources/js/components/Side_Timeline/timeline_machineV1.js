import { HiX } from "react-icons/hi";
import React, { Component } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { forEach, isEmpty } from 'lodash';
import "./modalTimelineMachine.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

var allDataSort =[];
var listIdMachine = [];
var listComment = []; //for comment
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

var emptyData = [
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

var todayEffect = new Date();
todayEffect.setHours(7, 0, 0, 0);
if (new Date() < todayEffect){
  // console.log("Day - 1");
  todayEffect.setDate(todayEffect.getDate()-1);
}
else{
  todayEffect = new Date();
}
var tempCurrentDate = new Date();
var shif = '';
var intDate = parseInt(tempCurrentDate.getHours());
// console.log('time : '+intDate);
if(intDate >=7 && intDate <= 19){
    shif = '07:00:00';
  }
else{
    shif = '19:00:00';
  }
let InitialTime = new Date();
// console.log(InitialTime);
let InitialTimeDate = todayEffect.getDate()+"/"+(todayEffect.getMonth()+1)+"/"+todayEffect.getFullYear();
// var refreshCount = 1000;
// console.log(new Date(parseInt(InitialTime.getFullYear()),parseInt(InitialTime.getMonth()),parseInt(InitialTime.getDate())).getTime());
// const [openModal, setOpenModal] = useState(false);
let initialStart = 10000;
class SideTimelineMachine extends Component {
    constructor(props) {
            super(props);
            this.submitTimeline = this.submitTimeline.bind(this);
            this.handleComment = this.handleComment.bind(this);
            // this.saveComment = this.saveComment.bind(this);
            this.state = {
                selectShif: shif,
                selectDate: InitialTimeDate,
                unixDate: new Date(parseInt(todayEffect.getFullYear()),parseInt(todayEffect.getMonth()),parseInt(todayEffect.getDate())).getTime(),
                nowDate : todayEffect,
                timeline : [],
                resultTimeline:[],
                id_machine : [],
                id_machine_prop : this.props.data,
                showModal:false,
                commentValue:'',
                commentTime_start:null,
                commentTime_close:null,
                series: dataSeries,
                options: {
                        chart: {
                            height: 350,
                            type: 'rangeBar',
                            events: {
                            dataPointSelection: (event, chartContext, config) => {
                                // console.log(event);
                                // this.setState({ showModal: true });
                                // this.setState({commentTime_start:event.target.dataset.rangeY1,
                                //                 commentTime_close:event.target.dataset.rangeY2})
                                //                 if(this.state.showModal == true){
                                //                 console.log(this.state.commentTime_start+'-'+this.state.commentTime_close);
                                //                 }
                            }
                            }
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                barHeight: '60%',
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
                            // console.log(opts);
                            var data = opts.ctx.w.globals.initialSeries[opts.seriesIndex].data[opts.dataPointIndex];
                            const fromYear = new Date(opts.y1).getFullYear()
                            const toYear = new Date(opts.y2).getFullYear()
                            // const values = opts.ctx.rangeBar.getTooltipValues(opts)
                            const timeStartTemp = new Date(parseInt(opts.y1))
                            const timeEndTemp = new Date(parseInt(opts.y2))
                            const timeStart = moment(timeStartTemp).format("DD/MM/yyyy HH:mm:ss");
                            const timeEnd = moment(timeEndTemp).format("DD/MM/yyyy HH:mm:ss");
                            
                            // console.log(opts.seriesIndex);
                            var returnValues;
                            if(opts.seriesIndex == 1){
                            
                            returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                '<div>ID Job     : '+data.id_job+' '+'</div>'+
                                                '<div>ID Task    : '+data.id_task+' '+'</div>'+
                                                '<div>Item Count : '+Math.round(data.count)+' '+'</div>'+
                                                '<div>Item No.   : '+data.item_no+' '+'</div>'+
                                                '<div>Total Work : '+data.total_work+' '+'</div>'+
                                                '<div>Comment    : '+(data.comment?data.comment:'-')+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 2){
                            returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                    '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                    '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                    '<div>Break Code : '+data.break_code+' '+'</div>'+
                                                    '<div>Total Break  : '+data.break_duration+' '+'</div>'+
                                                    '<div>Comment    : '+(data.comment?data.comment:'-')+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 3){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                    '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                    '<div>ID Staff   : '+data.staff+' '+'</div>'+
                                                    '<div>Code DT    : '+data.code_dt+' '+'</div>'+
                                                    '<div>Comment    : '+(data.comment?data.comment:'-')+' '+'</div>' ;
                            }
                            else if(opts.seriesIndex == 0){
                              returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                                  '<div>Time Close :'+timeEnd+' '+'</div>'+
                                                  '<div>Duration   : '+data.duration+' '+'</div>'+
                                                  '<div>Status Work: '+data.status_work+' '+'</div>'+
                                                  '<div>Comment    : '+(data.comment?data.comment:'-')+' '+'</div>' ;
                            }
                            // console.log(data.staff)
                            return returnValues
                            }
                        }
                        },
            }
        }
    

    componentDidMount = () => {
      var div = this.state.selectDate.split('/'); // Set date Interval time mask;
      var dataCheckInterval = new Date(div[1]+"/"+div[0]+"/"+div[2]+" "+this.state.selectShif).getTime();
        try {
          if(InitialTimeDate == this.state.selectDate && ((new Date().getTime()) > dataCheckInterval) && ((new Date().getTime()) < dataCheckInterval + (12*60*60*1000)) && this.props.show == true){
            this.startInterval(initialStart);
          }
        //   this.getComment();
          this.getTimeline().then(() =>{
              this.submitTimeline();
        });
      } catch (error) {
        console.error(error);
      }
    }
    
    
    startInterval = (intervalTime) => {
      clearInterval(this.interval);
      var div = this.state.selectDate.split('/'); // Set date Interval time mask;
      var dataCheckInterval = new Date(div[1]+"/"+div[0]+"/"+div[2]+" "+this.state.selectShif).getTime();
      this.interval = setInterval(() => {
        if(InitialTimeDate != this.state.selectDate || ((new Date().getTime()) < dataCheckInterval) || ((new Date().getTime()) > dataCheckInterval + (12*60*60*1000))){
          clearInterval(this.interval);
        }
        else{
        //   this.getComment();
          this.getTimeline().then(() =>{
              this.submitTimeline();
        });
        }
        
      }, intervalTime);
    }

    componentWillUnmount = () => {
    //   this.getComment();
        clearInterval(this.interval);
    }
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getTimeline = () => {
        return axios.get('/update/timelineAll/').then(response => {
            // console.log(response.data);
            listIdMachine = [];
            // console.log(this.props.data+"Props Here");
            listIdMachine.push({
                id_mc : this.props.data,
                staffLast : '-',
                timeLast : '-',
                count: 0})
            allDataSort = [];
            let resultData = response.data;
            let dataLength = Object.keys(resultData).length;
            for(let i = 0 ; i<dataLength ; i++){
              for(let j = 0 ; j<(resultData[i].length) ; j++){
                allDataSort.push(resultData[i][j]);
              }
            }
            allDataSort.sort((a, b) => (a.time_start > b.time_start) ? 1 : -1)
            this.setState({ timeline: allDataSort}, ()=>{
              // console.log(this.state.timeline);
              // console.log('this set timeline');   
            });
          // let x = this.state.timeline;
          // console.log(x);

        });
        
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // getComment = () =>{
    //   return axios.get('/update/comment/').then(function (response) {
    //     listComment = [];
    //     console.log(response.data);
    //     response.data.map(function (data, index){
    //       listComment.push({
    //         comment_id : data.comment_id,
    //         unix_start : data.unix_time_start,
    //         unix_stop : data.unix_time_stop,
    //         comment_data : data.comment_data,
    //       })
    //     });
    // });
    // }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeDate = (e) => {
    //   console.log(e);
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
    //   console.log(this.state.selectDate);
    //   console.log(InitialTimeDate);
      if(InitialTimeDate == this.state.selectDate){
        this.startInterval(initialStart);
      }
    //   console.log(this.state.timeline);
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
      var selectDate = this.state.selectDate;
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
    //   console.log(shifDateUnix);
    //   console.log(unixDate);
      // console.log(InitialTimeDate);
      // console.log(this.state.selectDate);
    //   this.getQueueMachineInfo();
      var dateDaySelect = this.state.selectDate.split('/');
      // console.log(dateDaySelect);
      // console.log(this.state.timeline);
      let count_test = 0;
    //   console.log(this.props.data);
      this.state.timeline.map( (x, i) => {
        listIdMachine.map((id_mc) => {
          // console.log(i);
          if(x.time_close=='0000-00-00 00:00:00'&&this.state.selectDate==InitialTimeDate?((new Date(x.time_start).getTime()) > unixDate):((new Date(x.time_close).getTime()) > unixDate) && ((new Date(x.time_start).getTime()) < unixDate + (12*60*60*1000))){
            var calculateCount = Math.round(parseInt(x.no_pulse1) / parseFloat(x.divider));
            
            if(x.id_machine == id_mc.id_mc){
              // if(id_mc.timeLast == '0000-00-00 00:00:00'){
              //   id_mc.timeLast = x.time_start;
              // }
              // console.log(Object.keys(x).length);
              // if((id_mc.count>0) && (id_mc.timeLast != '-')){
              //   // console.log(id_mc.timeLast);
              //   dataSeries[0].data.push({
              //   x: 'ID : '+id_mc.id_mc,
              //   y: [
              //     new Date(id_mc.timeLast).getTime(),
              //     new Date(x.time_start).getTime()
              //   ],
              //   staff : id_mc.staffLast+'(Latest)',
              // });
              // }
              // else{
              //   dataSeries[0].data.push({
              //     x: 'ID : '+id_mc.id_mc,
              //     y: [
              //       new Date(dateDaySelect[2]+'-'+dateDaySelect[1]+'-'+dateDaySelect[0]+' '+shifDateUnix).getTime(),
              //       new Date(x.time_start).getTime()
              //     ],
              //     staff : id_mc.staffLast,
              //   });
              // }
              if( x.id_activity!=null){
                count_test++;
                    if('duration' in x){
                      // console.log("Im in Idle");
                      var idle_start = new Date(x.time_start).getTime();
                      var idle_close = new Date(x.time_close).getTime();
                      if(x.time_close == '0000-00-00 00:00:00' && selectDate == InitialTimeDate){
                        idle_close = new Date().getTime();
                        if(new Date().getTime() > unixDate + (12*60*60*1000)){
                          idle_close = unixDate + (12*60*60*1000);
                        }
                        // console.log('i am check zero and initial time');
                      }
                      else if(x.time_close == '0000-00-00 00:00:00'){
                        idle_close = unixDate + (12*60*60*1000);
                        // console.log('i am check zero');
                      }
                      if(new Date(x.time_start).getTime() < unixDate){
                        idle_start = unixDate;
                      }
                      if(new Date(x.time_close).getTime() > unixDate + (12*60*60*1000)){
                        idle_close = unixDate + (12*60*60*1000);
                      }
                      
                      dataSeries[0].data.push({
                        x: 'ID : '+id_mc.id_mc,
                        y: [
                          idle_start,
                          idle_close
                        ],
                        id : x.id_activity,
                        duration : x.duration,
                        status_work : x.status_work,
                        comment : x.comment,
                        start : x.time_start,
                        close : x.time_close,
                      });
                    }
                
                    else if(x.id_break != 0){
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            new Date(x.time_start).getTime(),
                            new Date(x.break_start).getTime()
                          ],
                          staff : x.id_staff,
                          count : calculateCount,
                          item_no: x.item_no,
                          id_job: x.id_job,
                          id_task: x.id_task,
                          total_work: x.total_work
                        });

                        var bk_start = new Date(x.break_start).getTime();
                        var bk_close = new Date(x.break_stop).getTime();
                        if(x.time_close == '0000-00-00 00:00:00' && selectDate == InitialTimeDate){
                          bk_close = new Date().getTime();
                          if(new Date().getTime() > unixDate + (12*60*60*1000)){
                            bk_close = unixDate + (12*60*60*1000);
                          }
                          // console.log('i am check zero and initial time');
                        }
                        else if(x.break_stop == '0000-00-00 00:00:00'){
                          bk_close = unixDate + (12*60*60*1000);
                          // console.log('i am check zero');
                        }
                        if(new Date(x.break_start).getTime() < unixDate){
                          bk_start = unixDate;
                        }
                        if(new Date(x.break_stop).getTime() > unixDate + (12*60*60*1000)){
                          bk_close = unixDate + (12*60*60*1000);
                        }
                        // console.log(Object.keys(x).length+"-break");
                        dataSeries[2].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            bk_start,
                            bk_close
                          ],
                          staff : x.id_staff,
                          count : calculateCount,
                          break_code : x.break_code,
                          break_duration : x.break_duration,
                        });
                        var ac_bk_start = new Date(x.time_start).getTime();
                        var ac_bk_close = new Date(x.time_close).getTime();
                        if(x.time_close == '0000-00-00 00:00:00' && selectDate == InitialTimeDate){
                          ac_bk_close = new Date().getTime();
                          if(new Date().getTime() > unixDate + (12*60*60*1000)){
                            ac_bk_close = unixDate + (12*60*60*1000);
                          }
                          // console.log('i am check zero and initial time');
                        }
                        else if(x.time_close == '0000-00-00 00:00:00'){
                          ac_bk_close = unixDate + (12*60*60*1000);
                          // console.log('i am check zero');
                        }
                        if(new Date(x.time_start).getTime() < unixDate){
                          ac_bk_start = unixDate;
                        }
                        if(new Date(x.time_close).getTime() > unixDate + (12*60*60*1000)){
                          ac_bk_close = unixDate + (12*60*60*1000);
                        }
                        dataSeries[1].data.push({
                          x: 'ID : '+x.id_machine,
                          y: [
                            bk_close,
                            ac_bk_close
                          ],
                          staff : x.id_staff,
                          count : calculateCount,
                          item_no: x.item_no,
                          id_job: x.id_job,
                          id_task: x.id_task,
                          total_work: x.total_work
                        });
                    }
                    
                    else{
                      // console.log(Object.keys(x).length+"-used");
                      var ac_start = new Date(x.time_start).getTime();
                      var ac_close = new Date(x.time_close).getTime();
                        if(x.time_close == '0000-00-00 00:00:00' && selectDate == InitialTimeDate){
                          ac_close = new Date().getTime();
                          if(new Date().getTime() > unixDate + (12*60*60*1000)){
                            ac_close = unixDate + (12*60*60*1000);
                          }
                          // console.log('i am check zero and initial time');
                        }
                        else if(x.time_close == '0000-00-00 00:00:00'){
                          ac_close = unixDate + (12*60*60*1000);
                          // console.log('i am check zero');
                        }
                        if(new Date(x.time_start).getTime() < unixDate){
                          ac_start = unixDate;
                        }
                        if(new Date(x.time_close).getTime() > unixDate + (12*60*60*1000)){
                          ac_close = unixDate + (12*60*60*1000);
                        }
                      
                      dataSeries[1].data.push({
                        x: 'ID : '+x.id_machine,
                        y: [
                          ac_start,
                          ac_close
                        ],
                        // duration:x.duration,
                        staff : x.id_staff,
                        count : calculateCount,
                        item_no: x.item_no,
                        id_job: x.id_job,
                        id_task: x.id_task,
                        total_work: x.total_work
                      });
                    }
                  }
        
                  else{
                    // console.log(Object.keys(x).length+"-downtime");
                    var dt_start = new Date(x.time_start).getTime();
                    var dt_close = new Date(x.time_close).getTime();
                        if(x.time_close == '0000-00-00 00:00:00' && selectDate == InitialTimeDate){
                          dt_close = new Date().getTime();
                          if(new Date().getTime() > unixDate + (12*60*60*1000)){
                            dt_close = unixDate + (12*60*60*1000);
                          }
                          // console.log('i am check zero and initial time');
                        }
                        else if(x.time_close == '0000-00-00 00:00:00'){
                          dt_close = unixDate + (12*60*60*1000);
                          // console.log('i am check zero');
                        }
                        if(new Date(x.time_start).getTime() < unixDate){
                          dt_start = unixDate;
                        }
                        if(new Date(x.time_close).getTime() > unixDate + (12*60*60*1000)){
                          dt_close = unixDate + (12*60*60*1000);
                        }
                    
                    dataSeries[3].data.push({
                      x: 'ID : '+x.id_machine,
                      y: [
                        dt_start,
                        dt_close
                      ],
                      staff : x.id_staff,
                      code_dt : x.id_code_downtime
                    });
                  }

                  id_mc.timeLast = x.time_close;
                  id_mc.staffLast= x.id_staff;
                  id_mc.count = id_mc.count + 1;
            }
      }
    })
    });
      for(let x=0 ;x<4;x++){
        
        listComment.map((comment)=>{
          // console.log(777);
          var checkComment = 0;
          dataSeries[x].data.map(function (value){
            if(value.y[0] == comment.unix_start && value.y[1] == comment.unix_stop){
              dataSeries[x].data[checkComment] = {...dataSeries[x].data[checkComment], comment: comment.comment_data};
          }
          // console.log(checkComment);
          checkComment++;
        }
        )}
      )};
      this.setState({ series: dataSeries }, () => {
        // console.log(this.state.series);
      });
      
      
    // console.log('number repeat : '+count_test);
    console.log('OK');
    window.dispatchEvent(new Event('resize'))

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleModalClose = () => {
      this.setState({ showModal: false, commentValue:'' });
    };

    // saveComment = () =>{
    //   axios.get('/update/create/comment/',{
    //     params:{
    //       unix_start:this.state.commentTime_start,
    //       unix_stop:this.state.commentTime_close,
    //       comment_data:this.state.commentValue
    //     }
    //   }).then((response) => {
    //     this.getComment().then(()=>{this.submitTimeline()});
    //     console.log(response.data);
    //     this.setState({ showModal: false, commentValue:'' });
        
        
    // });
    // }


    handleComment = (event) =>{
      this.setState({commentValue: event.target.value});
    }
    
    render() {
        return (
            <>
            
            <Container>
                
            <form onSubmit={this.submitTimeline}>
              <br/>
            <Row>
                    <Col xs={4}>
                    <label>
                        <b>Shif : </b>
                        <select id="lang" onChange={this.onChangeShif} value={this.state.selectShif} >
                        <option value="Select">---Select---</option>
                        <option value="07:00:00">Day</option>
                        <option value="19:00:00">Night</option>
                    </select>
                    </label>
                    
                    </Col>

                    {/* <Col  style={{textAlign:'canter'}}>Date : </Col> */}

                    <Col xs ={5}><b>Date : </b> 
                        <DatePicker name='Date' onChange={this.onChangeDate} value={this.state.nowDate} format={'dd/MM/yyyy'} clearIcon={null} />
                    </Col>

                    <Col  style={{textAlign:'canter'}}><input className="btn btn-success" type="submit" value="Submit" /></Col>
                    
                    </Row>
            </form>
            
                    
                    
            </Container>
              

            <div className='row'>
            </div>
                <div id="chart_timeline" >
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={200}  />                
                    {window.dispatchEvent(new Event('resize'))}
                </div> 
            



        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">COMMENT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleModalClose}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                Enter Comment : &nbsp;
                <input type="text" value={this.state.commentValue} onChange={this.handleComment} />
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-primary" onClick={this.saveComment}>Save</button> */}
                <button type="button" className="btn btn-secondary" onClick={this.handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>



        </>
            
        );
    }
}

export default SideTimelineMachine;