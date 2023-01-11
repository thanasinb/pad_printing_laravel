import React, { Component, Fragment } from 'react';
import { HiX } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import "./Modal/modalTimelineMain.css";

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

var allActivity = [];

class TimelineEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEmployees : [],
            dataOnModal : [],
            allActivityList : [],
            showEmployeeModal : false,
            showEmployeeEdit : false,
            series: dataSeries,
                options: {
                        chart: {
                            height: 350,
                            type: 'rangeBar',
                            events: {
                                dataPointSelection: (event, chartContext, config) => {
                                console.log(event);
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
                            theme:'dark',
                            custom: function(opts) {
                                var data = opts.ctx.w.globals.initialSeries[opts.seriesIndex].data[opts.dataPointIndex];
                                const fromYear = new Date(opts.y1).getFullYear()
                                const toYear = new Date(opts.y2).getFullYear()
                                const timeStartTemp = new Date(parseInt(opts.y1))
                                const timeEndTemp = new Date(parseInt(opts.y2))
                                const timeStart = moment(timeStartTemp).format("DD/MM/yyyy HH:mm:ss");
                                const timeEnd = moment(timeEndTemp).format("DD/MM/yyyy HH:mm:ss");
                                
                                // console.log(opts.seriesIndex);
                                var returnValues;
                                if(opts.seriesIndex == 1){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>' ;
                                }
                                else if(opts.seriesIndex == 2){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>' ;
                                }
                                else if(opts.seriesIndex == 3){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>';
                                }
                                else if(opts.seriesIndex == 0){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>';
                                }
                                // console.log(data.staff)
                                return returnValues
                            }
                            }
                        },

        }
    }

    componentDidMount() {
        this.getEmployees();
        this.getTimeline();
    }

    componentDidUnMount(){
        this.getEmployees();
        this.getTimeline();
    }
    
    getTimeline = () => {
        axios.get('/update/timelineAll/').then(response => {
            let resultData = response.data;
            let dataLength = Object.keys(resultData).length;
            for(let i = 0 ; i<dataLength ; i++){
                for(let j = 0 ; j<(resultData[i].length) ; j++){
                    allActivity.push(resultData[i][j]);
                }
            }
            allActivity.sort((a, b) => (a.time_start > b.time_start) ? 1 : -1)
            this.setState({ allActivityList: allActivity});
        });
        
    }

    getEmployees = () =>{
        axios.get('/update/employeesAll').then(response => {
            this.setState({dataEmployees : response.data});
            console.log(response.data);
        });
    }

    employeesSelect = (event,row) =>{
        console.log("EM SELECTION");
        console.log(row);
        console.log(event);
        this.setState({
            dataOnModal:row,
            showEmployeeModal:true,
            showEmployeeEdit:false
        })
    }
    employeesEdit = (event) =>{
        this.setState({
            showEmployeeModal:false,
            showEmployeeEdit:true
        })
    }

    closeModal = () =>{
        this.setState({
            showEmployeeModal:false,
            showEmployeeEdit:false
        })
    }


render() {
    return (
        <div>
        {this.state.dataEmployees.map((row, index) => (
        <div key={index + '-' + row.id_staff}>
        <Button
            variant="secondary"
            className="container rounded p-3 m-1 mx-auto"
            onClick={event => this.employeesSelect(event,row)}
            >
            <Container>
                <Row>
                    <Col xs={6} md={4} ><HiOutlineUser size={70}/><p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> ID Staff : {row.id_staff}<p/>
                                        ID-RFID : {row.id_rfid}<p/>
                                        Name : {row.name_first+"  "+row.name_last}</Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>Site: {row.site?row.site:"-"} <p/>
                                        Role : {row.id_role}<p/>
                                        Shif : {row.id_shif?row.id_shif:"-"}</Col>
                </Row>
            </Container>
        </Button>
        </div>
        ))}

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showEmployeeModal ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                Enter ID Staff : {this.state.dataOnModal.id_staff}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.employeesEdit}>Edit</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
              <div className='container' id={"chart_timeline_main"} >
                Product : {this.state.dataOnModal.id_staff}
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={150}  />                
                    {window.dispatchEvent(new Event('resize'))}
                </div> 
            </div>
          </div>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showEmployeeEdit ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">EDIT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                Enter ID Staff : {this.state.dataOnModal.id_staff}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.closeModal}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

    </div>
    );

}

}
export default TimelineEmployees;
