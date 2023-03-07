import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
// import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillCar } from "react-icons/ai"; 
import { HiX } from "react-icons/hi";
import "./Modal/modalTimelineMain.css";
import Form from 'react-bootstrap/Form';
// import { assign } from 'lodash';
// import { width } from '@mui/system';

  var dataSeriesTemp = [
    {
      name: 'Backflush',
      data: []
    },
    {
      name: 'Rework',
      data: []
    },
    ];

export class TimelineProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType : "0",
            dataItem : [],
            dataItemTemp : [],
            dataOnModal : [],
            itemSelectModal : [],
            itemSelectValueModal : 0,
            showItemModal : false,
            showItemEdit : false,
            isManager:false,
            // datetimeStartAll : "",
            // datetimeCloseAll : "",
            series: dataSeriesTemp,
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
                            // "#008FFB",
                            "#00E36E", 
                            "#F0E040", 
                            // "#DA4747"
                            ],
                            fill: {
                            type: 'solid'
                            },
                            xaxis: {
                            type: 'datetime',
                            labels: {
                                rotate: -45,
                                format: 'dd/MM HH:mm:ss',
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
                                // const fromYear = new Date(opts.y1).getFullYear()
                                // const toYear = new Date(opts.y2).getFullYear()
                                const timeStartTemp = new Date(parseInt(opts.y1))
                                const timeEndTemp = new Date(parseInt(opts.y2))
                                const timeStart = moment(timeStartTemp).format("DD/MM/yyyy HH:mm:ss");
                                const timeEnd = moment(timeEndTemp).format("DD/MM/yyyy HH:mm:ss");
                                
                                // console.log(opts.seriesIndex);
                                // console.log(opts);
                                var returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                  '<div>Time Close :'+timeEnd+' '+'</div>'+
                                  '<div>ID Staff :'+data.staff+' '+'</div>'+
                                  '<div>ID Machine :'+data.machine+' '+'</div>'+
                                  '<div>Quantity :'+data.value+' '+'</div>'
                                  // '<div>item No. :'+data.item_no+' '+'</div>'+
                                  // '<div>Item Complete :'+data.qty_comp+' '+'</div>'+
                                  // '<div>Item Remaining :'+data.qty_open+' '+'</div>'+
                                  // '<div>Item Order :'+data.qty_order+' '+'</div>';
                                // console.log(data.staff)
                                return returnValues
                            }
                            }
                        },
        }
    }
    componentDidMount() {
      var userLevel = localStorage.getItem('token');
      var userType = userLevel.substring(0,3);
      if(userType=='mgr'){
          this.setState({
            isManager:true,
          })
      }
        this.getItem();
    }
    
    getItem = () =>{
        axios.get('/update/planningAll').then(response => {
            this.setState({dataItem : response.data,
                            dataItemTemp : response.data });
            console.log(response.data);
        });
    }

    itemSelect = (event,row) =>{
        axios.post('/update/planningSelect',row.item_no).then(response => {
          this.setState({itemSelectModal : response.data,
                          dataOnModal:row,
                          showItemModal:true,
                          showItemEdit:false,
                          itemSelectValueModal : 0, });
          // console.log(response.data);
          // var id_task = response.data[this.state.itemSelectValueModal].id_task;
          this.makeTimelineTask();
        });
        // console.log("EM SELECTION");
        // console.log(row);
        // console.log(event);
    }
    itemEdit = (event) =>{
        
        this.setState({
            showItemModal:false,
            showItemEdit:true
        })
    }

    closeModal = () =>{
        this.setState({
            showItemModal:false,
            showItemEdit:false
        })
    }

    handleSearchType = (event) => {
      // this.filterSearch();
      this.setState({
        searchType : event.target.value
      })
    }
    filterSearch = (event) => {
      var tempFilter = event.target.value;
      var tempResult;
      // console.log(tempFilter);
        if(tempFilter.length <= 0){
          tempResult = this.state.dataItemTemp;
        }
        else if(this.state.searchType === "0"){
            tempResult = this.state.dataItemTemp.filter(x =>{
              return x.item_no.toLowerCase().includes(tempFilter.toLowerCase()) ||
                x.item_des.toLowerCase().includes(tempFilter.toLowerCase())
            })
        }
        else if(this.state.searchType === "1"){
          tempResult = this.state.dataItemTemp.filter(x =>{
            return x.item_no.toLowerCase().includes(tempFilter.toLowerCase())
          })
        }
        else if(this.state.searchType === "2"){
          tempResult = this.state.dataItemTemp.filter(x =>{
            return x.item_des.toLowerCase().includes(tempFilter.toLowerCase()) 
          })
        }
      
      // console.log(test);
      this.setState({
        dataItem : tempResult,
      })
      tempResult = [];
      
    }

    handleChangeTask  = (event) =>{
      var valueSelect = parseInt(event.target.value);
      // console.log(valueSelect);
      this.setState({
        itemSelectValueModal : valueSelect,
      })
      // var id_task = this.state.itemSelectModal[valueSelect].id_task;
      // this.makeTimelineTask(id_task);

    }

    makeTimelineTask = () => {
      // var temp = {id:id_task}
      // var tempSeries = dataSeries;
      var dataSeries = [
        {
          name: 'Backflush',
          data: []
        },
        {
          name: 'Rework',
          data: []
        },
        ];
      axios.post('/update/getDetailTask',this.state.itemSelectModal).then((response)=>{
        // console.log(temp);
        console.log(response.data);
        response.data.map((data) => {
          dataSeries[0].data.push({
            x: 'ID Task : '+data[0],
          });
          if(data[1].length>0){
            data[1].map((data)=>{
              dataSeries[0].data.push({
                x: 'ID Task : '+data.id_task,
                y: [
                  new Date(data.time_start).getTime(),
                  new Date(data.time_close).getTime()
                ],
                staff : data.id_staff,
                machine : data.id_machine,
                value : data.no_pulse1,
  
              });
          })}
          if(data[2].length>0){
            data[2].map((data)=>{
              dataSeries[1].data.push({
                x: 'ID Task : '+data.id_task,
                y: [
                  new Date(data.time_start).getTime(),
                  new Date(data.time_close).getTime()
                ],
                staff : data.id_staff,
                machine : data.id_machine,
                value : data.no_pulse1,
                
              });
          })}
        })
        
        if(response.data.length==0 && data[1].length==0 ){
          console.log("Empty Data");
        }
        this.setState({
          series : dataSeries,
        })
        console.log(this.state.series);
        
    })
    }


render() {
    return (
        <div>
          <div>
                <Container className="bg-dark rounded p-4 m-1 mx-auto">
            <Form>
                <Form.Group className="mb-3" controlId="typeSearch">
                <Form.Label className='text-white'>SEARCH</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleSearchType}>
                    <option value="0">All</option>
                    <option value="1">By Item Number</option>
                    <option value="2">By Item Description</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="search">
                    
                    <Form.Control type="text" placeholder="Search..." onChange={this.filterSearch}/>
                    <Form.Text className="text-muted">
                    ค้นหางานที่ต้องการโดยเลือกหมวดหมู่ของการค้นหา จากนั้นเติมคำที่ต้องลงในช่องว่าง กรณีไม่เลือกหมวดหมู่จะค้นหาจากทุกหมวด
                    </Form.Text>
                </Form.Group>
                {/* <Button  variant="primary" type="submit">
                    Search
                </Button> */}
            </Form>
            </Container>
            </div>
        {this.state.dataItem.length>0?this.state.dataItem.map((row, index) => (
        <Button
        variant="secondary"
        className="container rounded p-3 m-1 mx-auto"
        key={index + '-' + row.item_no}
        onClick={event => this.itemSelect(event,row)}
        >
            <Container>
                <Row>
                    <Col xs={6} md={4} ><AiFillCar size={45}/><p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> Item NO. : {row.item_no}<p/>
                                        {/* MC-DES : {row.mc_des?row.mc_des:"-"} */}
                                        {/* Name: {row.name_first+"  "+row.name_last} */}
                                        </Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>
                                        Item Description : {row.item_des} <p/>
                                        </Col>
                </Row>
            </Container>
        
        </Button>
        ))
        :<div>
        <Button
        variant="warning"
        className="container rounded p-3 m-1 mx-auto">
        <Container>
                <Row>
                    <Col>Data Not Found</Col>
                </Row>
            </Container>
            </Button>
      </div>}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemModal ? 'block' : 'none'}}>
          <div className="modal-dialog-xl"  role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
              <b>ITEM NO. : </b>{this.state.dataOnModal.item_no}<p/>
              <b>ITEM Description : </b>{this.state.dataOnModal.item_des}<p/>
                <Form>
                  <Form.Group className="mb-3" controlId="type">
                  <Form.Label className='text-black' style={{ fontWeight: 'bold' }} >Select Task Detail</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.handleChangeTask}>
                  {this.state.itemSelectModal ? 
                    this.state.itemSelectModal.map((data, index)=>(
                      <option key={index} value={index}>{"ID Task: "+data.id_task+" || ID Job: "+data.id_job+" || Date Due: "+data.date_due}</option>
                    )) : <option>No data found</option>
                  }
                  </Form.Select>
                  </Form.Group>
                </Form>
                {this.state.showItemModal?
                  <div>
                    <Container>
                      <Row>
                        <Col>
                          <b>ID Task : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].id_task}<p/>
                          <b>ID Job : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].id_job}<p/>
                          <b>Operation : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].operation}<p/>
                          <b>Type : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].type}<p/>
                          <b>Product Line : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].prod_line}<p/>
                        </Col>
                        <Col>
                        <b>Work Center : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].work_center}<p/>
                        <b>Work Order : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].work_order}<p/>
                        <b>Sales Job : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].sales_job}<p/>
                        <b>Site : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].site}<p/>
                        <b>Date Due : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].date_due}<p/>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <b>Datetime Update : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].datetime_update}<p/>
                        <b>Operation Color/Des./Side : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].op_color+" / "
                        +this.state.itemSelectModal[this.state.itemSelectValueModal].op_des+" / "
                        +this.state.itemSelectModal[this.state.itemSelectValueModal].op_side}<p/>
                        <b>Quantity Comp/Open/Order : </b>{this.state.itemSelectModal[this.state.itemSelectValueModal].qty_comp+" / "
                        +this.state.itemSelectModal[this.state.itemSelectValueModal].qty_open+" / "
                        +this.state.itemSelectModal[this.state.itemSelectValueModal].qty_order}<p/>
                        </Col>
                      </Row>
                  </Container>
                  </div>
                  :"-"}
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-primary" onClick={this.itemEdit}>Edit</button> */}
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={this.state.itemSelectModal.length>4?62*this.state.itemSelectModal.length:250}  />                
                {window.dispatchEvent(new Event('resize'))}
            </div>
          </div>
        </div>

        {/* <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemEdit ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">EDIT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                ITEM NO. : {this.state.dataOnModal.item_no}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.closeModal}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>

            </div>
          </div>
        </div> */}
    </div>
    );
}
}

export default TimelineProducts;