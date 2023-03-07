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
import Form from 'react-bootstrap/Form';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
var dataSeries = [
    {
      name: 'Working',
      data: []
    },

    // {
    //   name: 'Used',
    //   data: []
    // },
  
    // {
    //   name: 'Break',
    //   data: []
    // },
  
    // {
    //   name: 'Downtime',
    //   data: []
    // },
    ];
    var dataSeriesTemp = [
      {
        name: 'Working',
        data: []
      },
      
      // {
      //   name: 'Used',
      //   data: []
      // },
    
      // {
      //   name: 'Break',
      //   data: []
      // },
    
      // {
      //   name: 'Downtime',
      //   data: []
      // },
      ];

var allActivity = [];
var tempEditData = {
  id_staff:'',
  id_rfid:'',
  prefix:'',
  name_first:'',
  name_last:'',
  site:'',
  id_shif:'',
  role:'',
  staff_img:'',
};

class TimelineEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempIdStaff:"",
            dataEmployees : [],
            dataEmployeesTemp : [],
            dataTimelineEmployees : [],
            dataTimelineEmployeesTemp : [],
            itemNo:[],
            startAt:'',
            searchType : "0",
            typeSearchBox : "",
            dataOnModal : [],
            allActivityList : [],
            showEmployeeModal : false,
            showEmployeeEdit : false,
            series: dataSeries,
            tempUploadImage: null,
            isManager:false,
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
                            // "#F0E040", 
                            // "#DA4747"
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
                                var data = opts.ctx.w.globals.initialSeries[0].data[opts.dataPointIndex];
                                // const fromYear = new Date(opts.y1).getFullYear()
                                // const toYear = new Date(opts.y2).getFullYear()
                                const timeStartTemp = new Date(parseInt(opts.y1))
                                const timeEndTemp = new Date(parseInt(opts.y2))
                                const timeStart = moment(timeStartTemp).format("DD/MM/yyyy HH:mm:ss");
                                const timeEnd = moment(timeEndTemp).format("DD/MM/yyyy HH:mm:ss");
                                
                                // console.log(opts.seriesIndex);
                                var returnValues;
                                // console.log(opts);
                                if(opts.seriesIndex == 0){
                                returnValues = '<div>Time Start : '+timeStart+' '+'</div>'+
                                  '<div>Time Close :'+timeEnd+' '+'</div>'+
                                  '<div>ID Staff :'+data.id_staff+' '+'</div>'+
                                  '<div>ID Activity :'+data.id_activity+' '+'</div>'+
                                  '<div>ID Task :'+data.id_task+' '+'</div>'+
                                  '<div>item No. :'+data.item_no+' '+'</div>'+
                                  '<div>Item Complete :'+data.qty_comp+' '+'</div>'+
                                  '<div>Item Remaining :'+data.qty_open+' '+'</div>'+
                                  '<div>Item Order :'+data.qty_order+' '+'</div>';
                                }
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
            // console.log(response.data);
        });
        
    }

    getEmployees = () =>{
        axios.get('/update/employeesAll').then(response => {
            this.setState({dataEmployees : response.data,
                            dataEmployeesTemp : response.data});
            console.log(response.data);
        });
    }

    
    employeesEdit = (event) =>{
      document.getElementById("imageEdit").value = "";
        this.setState({
            showEmployeeModal:false,
            showEmployeeEdit:true
        })
    }

    closeModal = () =>{
        this.setState({
            showEmployeeModal:false,
            showEmployeeEdit:false,
            series:dataSeriesTemp,
            tempUploadImage: null,
        })
    }

    backModal = () =>{
      this.setState({
        showEmployeeModal:true,
        showEmployeeEdit:false,
        tempUploadImage: null,
    })
  }

  handleIdStaff = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        id_staff: event.target.value
      }
    })
  }

  handleIdRfid = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        id_rfid: event.target.value
      }
    })
  }

  handleNameFirst = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        name_first: event.target.value
      }
    })
  }

  handleNameLast = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        name_last: event.target.value
      }
    })
  }

  handleSite = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        site: event.target.value
      }
    })
  }

  handlePrefix = (event) => {
    // console.log(event.target.value)
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        id_prefix: event.target.value
      }
    })
  }

  handleShif = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        id_shif: event.target.value
      }
    })
  }

  handleRole = (event) => {
    this.setState({
      dataOnModal: {
        ...this.state.dataOnModal,
        id_role: event.target.value
      }
    })
  }

  handleSubmitEditModal = (event) =>{
    event.preventDefault();
    document.getElementById("imageEdit").value = "";
    tempEditData['id_staff_old'] = this.state.tempIdStaff;
    tempEditData['id_staff'] = event.target.idStaff.value;
    tempEditData['id_rfid'] = event.target.idRfid.value;
    tempEditData['prefix'] = event.target.prefixName.value;
    tempEditData['name_first'] = event.target.firstName.value;
    tempEditData['name_last'] = event.target.lastName.value;
    tempEditData['site'] = event.target.site.value;
    tempEditData['id_shif'] = event.target.shif.value;
    tempEditData['id_role'] = event.target.role.value;
    tempEditData['staff_img'] = this.state.tempUploadImage!=null?this.state.tempUploadImage.name:"-";
    this.uploadImage();
    // console.log(event.target.idStaff.value);
    axios.post('/update/editEmployee',tempEditData).then(response => {
      if(response.data.status == "OK"){
        this.setState({
          showEmployeeModal:false,
          showEmployeeEdit:false
        });
        this.getEmployees();
        alert("Editing employee "+response.data.id_staff+" success.");
        // console.log(response.data);
      }
      else{
        alert("Employee ID Staff: "+response.data.id_staff+" already exist.");
      }
  });
  }

  handleSearchType = (event) => {
    this.setState({
      searchType : event.target.value
    })
  }
  
  filterSearch = (event) => {

    var tempFilter = event.target.value;
    var tempResult;
    // console.log(tempFilter);
      if(tempFilter.length <= 0){
        tempResult = this.state.dataEmployeesTemp;
      }
      else if(this.state.searchType === "0"){
          tempResult = this.state.dataEmployeesTemp.filter(x =>{
            return x.id_rfid.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.role.toLowerCase().includes(tempFilter.toLowerCase()) || 
              x.name_first.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.name_last.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.site.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.id_staff.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.id_shif.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.prefix.toLowerCase().includes(tempFilter.toLowerCase()) ||
              x.name_last.toLowerCase().includes(tempFilter.toLowerCase()) ||
              (x.prefix+x.name_first+" "+x.name_last).toLowerCase().includes(tempFilter.toLowerCase())
          })
      }
      else if(this.state.searchType === "1"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.id_staff.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
      else if(this.state.searchType === "2"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.id_rfid.toLowerCase().includes(tempFilter.toLowerCase()) 
        })
      }
      else if(this.state.searchType === "3"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.name_first.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
      else if(this.state.searchType === "4"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.name_last.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
      else if(this.state.searchType === "5"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.role.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
      else if(this.state.searchType === "6"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.site.toLowerCase().includes(tempFilter.toLowerCase()) 
        })
      }
      else if(this.state.searchType === "7"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.id_shif.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
      else if(this.state.searchType === "8"){
        tempResult = this.state.dataEmployeesTemp.filter(x =>{
          return x.prefix.toLowerCase().includes(tempFilter.toLowerCase())
        })
      }
    
    // console.log(test);
    this.setState({
      dataEmployees : tempResult,
      typeSearchBox : tempFilter
    })
    tempResult = [];
    // console.log(this.state.dataEmployees)
    
  }
  employeesSelect = (event,row) =>{
    // console.log("EM SELECTION");
    var dataSeriesEmployee = [
      {
        name: 'Working',
        data: []
      },
  
      // {
      //   name: 'Used',
      //   data: []
      // },
    
      // {
      //   name: 'Break',
      //   data: []
      // },
    
      // {
      //   name: 'Downtime',
      //   data: []
      // },
      ];
    dataSeries = dataSeriesTemp;
    console.log(row);
    console.log(event);
    var staffSelect = {id_staff:''}
    staffSelect['id_staff'] = row.id_staff;
    axios.post('/update/timelineEmployees/',staffSelect).then(response => {
      // console.log(response.data[0]);
      // console.log(response.data[1]);
  if(response.data[0]){
    response.data[0].map((data, index)=>{
      if(data.item_no == response.data[1][0].item_no){
        dataSeriesEmployee[0].data.push({
          x: 'ID : '+data.id_staff,
          y: [
            new Date(data.time_start).getTime(),
            new Date(data.time_close).getTime()
          ],
          id_staff : data.id_staff,
          id_activity : data.id_activity,
          id_task : data.id_task,
          item_no : data.item_no,
          qty_comp: data.qty_comp,
          qty_open: data.qty_open,
          qty_order: data.qty_order,
          time_start: data.time_start,
        });
      }
    })
    result = dataSeriesEmployee;
  }
  else{
    var result = dataSeriesTemp;
  }
  var showDatatime = "-";
    // console.log(dataSeriesEmployee[0]);
  if(dataSeriesEmployee[0].data[0]!=null){
    showDatatime = dataSeriesEmployee[0].data[0].time_start;
  }
  // console.log(response.data[1][0].item_no);
  this.setState({
    tempIdStaff: row.id_staff,
    series : result,
    startAt : showDatatime,
    dataTimelineEmployees : response.data[0],
    dataTimelineEmployeesTemp : response.data[0],
    itemNo:response.data[1],
    dataOnModal:row,
    showEmployeeModal:true,
    showEmployeeEdit:false
  })
});
}
  handleChangeItemNo = (event) => {
    var dataSeriesEmployee = [
      {
        name: 'Working',
        data: []
      },
  
      // {
      //   name: 'Used',
      //   data: []
      // },
    
      // {
      //   name: 'Break',
      //   data: []
      // },
    
      // {
      //   name: 'Downtime',
      //   data: []
      // },
      ];
    var item_no = parseInt(event.target.value);
    console.log(this.state.dataTimelineEmployeesTemp);
    if(this.state.dataTimelineEmployeesTemp){
      this.state.dataTimelineEmployeesTemp.map((data, index)=>{
        if(data.item_no == this.state.itemNo[item_no].item_no){
          dataSeriesEmployee[0].data.push({
            x: 'ID : '+data.id_staff,
            y: [
              new Date(data.time_start).getTime(),
              new Date(data.time_close).getTime()
            ],
            id_staff : data.id_staff,
            id_activity : data.id_activity,
            id_task : data.id_task,
            item_no : data.item_no,
            qty_comp: data.qty_comp,
            qty_open: data.qty_open,
            qty_order: data.qty_order,
            time_start: data.time_start,
          });
        }
      })
      result = dataSeriesEmployee;
    }
    else{
      var result = dataSeriesTemp;
    }
    var showDatatime = "-";
    // console.log(dataSeriesEmployee[0]);
    if(dataSeriesEmployee[0].data[0]!=null){
      showDatatime = dataSeriesEmployee[0].data[0].time_start;
    }
    
    // console.log(dataSeriesEmployee[0].data[0].time_start);
    this.setState({
      startAt : showDatatime,
      series : result
    })

  }

  handleEmployeeUploadImageOnModal = (event) =>{
    var selectedFile = event.target.files[0];
    var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if(selectedFile.size > (1048576*4)){
      alert("Maximum image file size is 4 MB");
      document.getElementById("imageEdit").value = "";
    }
    else if(selectedFile.name.length > 20){
      alert("Filename is too longer");
      document.getElementById("imageEdit").value = "";
    }
    else if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      this.setState({
        tempUploadImage:selectedFile,
        // imageValue:event.target.files[0].name,
      })
      console.log("Add file.");
    } else {
      console.log("Not found or match type file.");
    }
    
  }

  uploadImage = () =>{
    var formData = new FormData();
    formData.append('file', this.state.tempUploadImage);
    axios.post('/update/uploadFileImage/employee',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
    }
    }).then(response =>{
      console.log(response.data);
      this.setState({
        tempUploadImage:null,
      })
    })
  }

  deleteImage = () =>{
    if (confirm('Are you sure, you want to delete image Staff ID : '+this.state.dataOnModal.id_staff)) {
      // Delete it!
      var data = {
        id_staff:this.state.dataOnModal.id_staff,
        image:this.state.dataOnModal.staff_img,
        type:'employee',
      }
      axios.post('/update/deleteImage',data).then(response =>{
        console.log(response.data);
        this.setState({
          dataOnModal: {
            ...this.state.dataOnModal,
            staff_img: '',
          }
        })
        this.getEmployees();
      })
    } 
    else {
      // Do nothing!
      console.log('Cancel image deleting.');
    }
  }


render() {
    return (
        <div>
          {/* <Fab color="error" aria-label="add" position="sticky" bottom="20px" right="20px" >
        <AddIcon />
        </Fab> */}
        <div>
            <Container className="bg-dark rounded p-4 m-1 mx-auto">
            <Form>
                <Form.Group className="mb-3" controlId="typeSearch">
                <Form.Label className='text-white'>SEARCH</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleSearchType}>
                    <option value="0">All</option>
                    <option value="1">By ID-Staff</option>
                    <option value="2">By MC-RFID</option>
                    <option value="3">By First Name</option>
                    <option value="4">By Last Name</option>
                    <option value="5">By Role</option>
                    <option value="6">By Site</option>
                    <option value="7">By Team</option>
                    <option value="8">By Prefix</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="search">
                    
                    <Form.Control type="text" placeholder="Search..." onChange={this.filterSearch}/>
                    <Form.Text className="text-muted">
                    ค้นหาพนักงานที่ต้องการโดยเลือกหมวดหมู่ของการค้นหา จากนั้นเติมคำที่ต้องลงในช่องว่าง กรณีไม่เลือกหมวดหมู่จะค้นหาจากทุกหมวด
                    </Form.Text>
                </Form.Group>
                {/* <Button  variant="primary" type="submit">
                    Search
                </Button> */}
            </Form>
            </Container>
        </div>

        {this.state.dataEmployees.length>0?this.state.dataEmployees.map((row, index) => (
        <div key={index + '-' + row.id_staff}>
        <Button
            variant="secondary"
            className="container rounded p-3 m-1 mx-auto"
            onClick={event => this.employeesSelect(event,row)}
            >
            <Container>
                <Row>
                    <Col xs={6} md={4} >{row.staff_img.length<2?<HiOutlineUser size={70}/>:<img src={"images/employees/"+encodeURI(row.staff_img)} width="70" height="70" alt={"Image ID : "+row.staff_img} />}<p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> ID Staff : {row.id_staff}<p/>
                                        ID-RFID : {row.id_rfid}<p/>
                                        Name : {row.prefix+row.name_first+"  "+row.name_last}</Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>Site: {row.site?row.site:"-"} <p/>
                                        Role : {row.role}<p/>
                                        Team : {row.id_shif?row.id_shif:"-"}</Col>
                </Row>
            </Container>
        </Button>
        </div>
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
      </div>
      }

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showEmployeeModal ? 'block' : 'none'}}>
          <div className="modal-dialog-med" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                <Row>
                <Col>
                  <b>ID Staff : </b>{this.state.dataOnModal.id_staff}<p/>
                  <b>ID RFID : </b>{this.state.dataOnModal.id_rfid}<p/>
                  <b>Name : </b>{this.state.dataOnModal.prefix+this.state.dataOnModal.name_first+" "+this.state.dataOnModal.name_last}<p/>
                  <b>Site : </b>{this.state.dataOnModal.site}<p/>
                  <b>Team : </b>{this.state.dataOnModal.id_shif}<p/>
                  <b>Role : </b>{this.state.dataOnModal.role}<p/>
                </Col>
                <Col>
                {this.state.dataOnModal.staff_img<2?<HiOutlineUser size={220}/>:<img src={"images/employees/"+encodeURI(this.state.dataOnModal.staff_img)} width="220" height="220" alt={"Image ID : "+this.state.dataOnModal.staff_img} />}
                </Col>
                </Row>
                
              </div>
              <div className="modal-footer">
                {!this.state.isManager && <button type="button" className="btn btn-primary" onClick={this.employeesEdit}>Edit</button>}
                {!this.state.isManager&&this.state.dataOnModal.staff_img?<button type="button" className="btn btn-danger" onClick={this.deleteImage}>Delete image</button>:true}
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
              <div className='container' id={"chart_timeline_employees"} >
              <b>Timeline : </b>{this.state.dataOnModal.prefix+this.state.dataOnModal.name_first+" "+this.state.dataOnModal.name_last}
              <Form>
                <Form.Group className="mb-3" controlId="type">
                <Form.Label className='text-black' style={{ fontWeight: 'bold' }}>Select Item</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleChangeItemNo}>
                {this.state.itemNo ? 
                  this.state.itemNo.map((data, index)=>(
                    <option key={index} value={index}>{data.item_des+" // "+data.item_no}</option>
                  )) : <option>No data found</option>
                }
                </Form.Select>
                <Form.Label className='text-black' style={{ fontWeight: 'bold' }}>{"Date Start : "+this.state.startAt}</Form.Label>
                </Form.Group>
            </Form>
                    <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={250}  />                
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
              <Form onSubmit={this.handleSubmitEditModal}>
                <Form.Group className="mb-3" controlId="idStaff">
                  <Form.Label className='text-black'>ID Staff</Form.Label>
                  <Form.Control placeholder="Search..." value={this.state.dataOnModal.id_staff} onChange={(event) => this.handleIdStaff(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="idRfid">
                  <Form.Label className='text-black'>ID RFID</Form.Label>
                <Form.Control placeholder="Search..." value={this.state.dataOnModal.id_rfid} onChange={(event) => this.handleIdRfid(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="prefixName">
                  <Form.Label className='text-black'>Prefix</Form.Label>
                  <Form.Select aria-label="Default select example" value={this.state.dataOnModal.id_prefix} onChange={(event) => this.handlePrefix(event)}>
                      {/* <option value={this.state.dataOnModal.id_prefix}>{this.state.dataOnModal.prefix+' (ค่าเริ่มต้น)'}</option> */}
                      <option value="1">นาย</option>
                      <option value="2">นาง</option>
                      <option value="3">นางสาว</option>
                  </Form.Select>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className='text-black'>First Name</Form.Label>
                <Form.Control placeholder="Search..." value={this.state.dataOnModal.name_first} onChange={(event) => this.handleNameFirst(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className='text-black'>Last Name</Form.Label>
                <Form.Control placeholder="Search..." value={this.state.dataOnModal.name_last} onChange={(event) => this.handleNameLast(event)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className='text-black'>Employees Image</Form.Label>
                <Form.Control id='imageEdit' type='file' accept="image/png, image/jpeg, image/jpg" onChange={this.handleEmployeeUploadImageOnModal}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="site">
                  <Form.Label className='text-black'>Site</Form.Label>
                <Form.Control placeholder="Search..." value={this.state.dataOnModal.site?this.state.dataOnModal.site:"-"} onChange={(event) => this.handleSite(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="shif">
                  <Form.Label className='text-black'>Team</Form.Label>
                  <Form.Select aria-label="Default select example" value={this.state.dataOnModal.id_shif} onChange={(event) => this.handleShif(event)}>
                      {/* <option value={this.state.dataOnModal.id_shif}>{this.state.dataOnModal.id_shif+' (ค่าเริ่มต้น)'}</option> */}
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                  </Form.Select>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="role">
                  <Form.Label className='text-black'>Role</Form.Label>
                  <Form.Select aria-label="Default select example" value={this.state.dataOnModal.id_role} onChange={(event) => this.handleRole(event)}>
                      {/* <option value={this.state.dataOnModal.id_role}>{this.state.dataOnModal.role+' (ค่าเริ่มต้น)'}</option> */}
                      <option value="1">Operator</option>
                      <option value="2">Technician</option>
                      <option value="3">Production Support</option>
                      <option value="4">Instructor</option>
                      <option value="5">Senior Instructor</option>
                      <option value="6">Foreman</option>
                      <option value="7">Leader</option>
                      <option value="8">Senior Technician</option>
                      <option value="9">Manager</option>
                      <option value="10">Engineering</option>
                  </Form.Select>
                </Form.Group>
                <input className="btn btn-primary" type="submit" value="Save" />
            </Form>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.backModal}>Back</button>
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
