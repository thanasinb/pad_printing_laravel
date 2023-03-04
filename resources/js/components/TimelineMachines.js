import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { GiSewingMachine } from "react-icons/gi"; 
import { HiX } from "react-icons/hi";
import { CgAddR } from "react-icons/Cg";
import "./Modal/modalTimelineMain.css";
import Form from 'react-bootstrap/Form';
import { BorderClearOutlined, ThirtyFpsSelect } from '@mui/icons-material';
import SideTimelineMachine from './Side_Timeline/timeline_machineV1';

export class TimelineMachines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempIdMc:"",
            searchType : "0",
            dataMachinesTemp : [],
            dataMachines : [],
            dataOnModal : [],
            showMachineModal : false,
            showMachineEdit : false,
            showMachineAdd : false,
            addIdMc : "",
            addIdMcType : "1",
            addMcDes : "",
            addMcImg :"",
            tempUploadImage: null,
        }
    }
    componentDidMount() {
        this.getMachines();
    }
    
    getMachines = () =>{
        axios.get('/update/machinesAll').then(response => {
            this.setState({dataMachines : response.data,
                            dataMachinesTemp : response.data});
            console.log(response.data);
        });
    }

    machineSelect = (event,row) =>{
        // console.log("MC SELECTION");
        console.log(row);
        console.log(event);
        this.setState({
            tempIdMc: row.id_mc,
            dataOnModal:row,
            showMachineModal:true,
            showMachineEdit:false,
            // imageValue:"",
        })
        
    }
    machineEdit = (event) =>{
        this.setState({
            showMachineModal:false,
            showMachineEdit:true
        })
    }

    

    handleAddMachineModal = (event) =>{
      event.preventDefault();
      // console.log(event.target.id_mc.value);
      var tempAddData = {
        id_mc:this.state.addIdMc,
        id_mc_type:this.state.addIdMcType,
        mc_des:this.state.addMcDes,
        mc_img:this.state.tempUploadImage!=null?this.state.tempUploadImage.name:"-",
      };
      if(this.state.tempUploadImage!=null){
        this.uploadImage();
      }
      // console.log(tempAddData);
      axios.post('/update/addMachine',tempAddData).then(response => {
        console.log(response.data);
        if(response.data.status == "OK"){
          this.setState({
            showMachineAdd:false,
            addIdMc:"",
            addIdMcType:"1",
            addMcDes:"",
            // tempUploadImage:null,
          });
          this.getMachines();
          alert("Add machine "+response.data.id_mc+" success.");
          document.getElementById("imageEdit").value = "";
          document.getElementById("imageAdd").value = "";
        }
        else{
          alert("Machine "+response.data.id_mc+" already exist.");
        }
        
      });
    }

    handleSubmitEditModal = (event) =>{
      event.preventDefault();
      var tempEditData = {
        id_mc_old:this.state.tempIdMc,
        id_mc:this.state.dataOnModal.id_mc,
        id_mc_type:this.state.dataOnModal.id_mc_type,
        mc_des:this.state.dataOnModal.mc_des,
        mc_img:this.state.tempUploadImage!=null?this.state.tempUploadImage.name:"-",
      };
      if(this.state.tempUploadImage!=null){
        this.uploadImage();
      }
      // console.log(tempEditData);
      axios.post('/update/editMachine',tempEditData).then(response => {
        // console.log(response.data);
        
        if(response.data.status == "OK"){
          this.setState({
            showMachineEdit:false,
            showMachineModal:false,
            // tempUploadImage:null,
          });
          this.getMachines();
          alert("Editing machine "+response.data.id_mc+" success.");
          console.log(response.data);
          document.getElementById("imageEdit").value = "";
          document.getElementById("imageAdd").value = "";
        }
        else{
          alert("Machine "+response.data.id_mc+" already exist.");
        }
        
    });
    }

    uploadImage = () =>{
      var formData = new FormData();
      formData.append('file', this.state.tempUploadImage);
      axios.post('/update/uploadFileImage',formData,{
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

    backModal = () => {
      document.getElementById("imageEdit").value = "";
      document.getElementById("imageAdd").value = "";
      this.setState({
        showMachineEdit:false,
        showMachineModal:true,
      })
    }

    closeModal = () =>{
        document.getElementById("imageEdit").value = "";
        document.getElementById("imageAdd").value = "";
        this.setState({
            showMachineModal:false,
            showMachineEdit:false,
            showMachineAdd:false,
            tempUploadImage:null,
            addIdMc:"",
            addIdMcType:"1",
            addMcDes:"",
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
          tempResult = this.state.dataMachinesTemp;
        }
        else if(this.state.searchType === "0"){
            tempResult = this.state.dataMachinesTemp.filter(x =>{
              return x.id_mc.toLowerCase().includes(tempFilter.toLowerCase()) ||
                x.mc_des.toLowerCase().includes(tempFilter.toLowerCase()) || 
                x.id_mc_type.toString().includes(tempFilter.toLowerCase()) ||
                x.mc_type.toLowerCase().includes(tempFilter.toLowerCase())
            })
        }
        else if(this.state.searchType === "1"){
          tempResult = this.state.dataMachinesTemp.filter(x =>{
            return x.id_mc.toLowerCase().includes(tempFilter.toLowerCase())
          })
        }
        else if(this.state.searchType === "2"){
          tempResult = this.state.dataMachinesTemp.filter(x =>{
            return x.mc_des.toLowerCase().includes(tempFilter.toLowerCase()) 
          })
        }
        else if(this.state.searchType === "3"){
          tempResult = this.state.dataMachinesTemp.filter(x =>{
            return x.id_mc_type.toString().includes(tempFilter.toLowerCase())
          })
        }
        else if(this.state.searchType === "5"){
          tempResult = this.state.dataMachinesTemp.filter(x =>{
            return x.mc_type.toLowerCase().includes(tempFilter.toLowerCase())
          })
        }
      
      // console.log(test);
      this.setState({
        dataMachines : tempResult,
      })
      tempResult = [];
      
    }
    addMachine = () =>{
      this.setState({
        showMachineAdd : true,
        addIdMc:"",
        addIdMcType:"1",
        addMcDes:"",
        // imageValue:"",
      })
      
    }

    machineDelete = (event) =>{
      var tempDeleteData = {
        id_mc:this.state.dataOnModal.id_mc,
      }

      if (confirm('Are you sure, you want to Delete Machine ID:'+this.state.dataOnModal.id_mc)) {
        // Delete it!
        // console.log(tempDeleteData);
        axios.post('/update/deleteMachine',tempDeleteData).then(response => {
          console.log(response.data);
          this.setState({
            showMachineModal:false,
            showMachineEdit:false,
            showMachineAdd:false,
            tempUploadImage:null,
          });
          this.getMachines();
          alert("Delete machine "+response.data.id_mc+" success.");
        });
      } else {
        // Do nothing!
        console.log('Cancel Deleting.');
      }
    }

    

    handleIdMachine = (event) =>{
      this.setState({
        addIdMc:event.target.value,
      })
    }
    
    handleIdMachineType = (event) =>{
      this.setState({
        addIdMcType:event.target.value,
      })
    }

    handleMachineDes = (event) => {
      this.setState({
        addMcDes:event.target.value,
      })
    }

    handleMachineUploadImage = (event) =>{
      var selectedFile = event.target.files[0];
      var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.setState({
          tempUploadImage:selectedFile,
          // imageValue:event.target.files[0].name,
        })
        console.log("Add file.");
      } else {
        console.log("Not found or match type file.");
      }
      
    }

    handleMachineUploadImageOnModal = (event) =>{
      // console.log(event.target.files[0]);
      var selectedFile = event.target.files[0];
      var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        this.setState({
          tempUploadImage:selectedFile,
          // imageValue:event.target.files[0].name,
        })
        console.log("Add file.");
      } else {
        console.log("Not found or match type file.");
      }
      
    }

    handleIdMachineOnModal = (event) => {
      this.setState({
        dataOnModal: {
          ...this.state.dataOnModal,
          id_mc: event.target.value
        }
      })
    }
  
    handleIdMachineTypeOnModal = (event) => {
      this.setState({
        dataOnModal: {
          ...this.state.dataOnModal,
          id_mc_type: event.target.value
        }
      })
    }
  
    handleMachineDesOnModal = (event) => {
      this.setState({
        dataOnModal: {
          ...this.state.dataOnModal,
          mc_des: event.target.value
        }
      })
    }

    


render() {
    return (
        <div>
            <div>
            {/* <img src="36550.jpg" alt="Example image" /> */}
                <Container className="bg-dark rounded p-4 m-1 mx-auto">
            <Form>
                <Form.Group className="mb-3" controlId="typeSearch">
                <Form.Label className='text-white'>SEARCH</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleSearchType}>
                    <option value="0">All</option>
                    <option value="1">By ID-Machine</option>
                    <option value="2">By Machine-Description</option>
                    <option value="3">By ID-Machine-TYPE</option>
                    <option value="5">By Machine-TYPE</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="search">
                    
                    <Form.Control type="text" placeholder="Search..." onChange={this.filterSearch}/>
                    <Form.Text className="text-muted">
                    ค้นหาเครื่องจักรที่ต้องการโดยเลือกหมวดหมู่ของการค้นหา จากนั้นเติมคำที่ต้องลงในช่องว่าง กรณีไม่เลือกหมวดหมู่จะค้นหาจากทุกหมวด
                    </Form.Text>
                </Form.Group>
                {/* <Button  variant="primary" type="submit">
                    Search
                </Button> */}
            </Form>
            </Container>
            </div>
            <div>
            <Button variant="warning" className="container rounded p-3 m-1 mx-auto" style={{border:'3px solid gray'}} onClick={event => this.addMachine()}>
                <CgAddR size={30}/> ADD MACHINE
          </Button>
            </div>
        {this.state.dataMachines.length>0?this.state.dataMachines.map((row, index) => (
        <Button
        variant="secondary"
        className="container rounded p-3 m-1 mx-auto"
        key={index + '-' + row.id_mc}
        onClick={event => this.machineSelect(event,row)}
        >
            <Container>
                <Row>
                    <Col xs={6} md={4} >{row.mc_img.length<2?<GiSewingMachine size={70}/>:<img src={"images/"+encodeURI(row.mc_img)} width="70" height="70" alt={"Image ID : "+row.id_mc} />}<p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> ID Machine : {row.id_mc}<p/>
                                        MC-DES : {row.mc_des?row.mc_des:"-"}
                                        {/* Name: {row.name_first+"  "+row.name_last} */}
                                        </Col>
                    <Col xs={6} md={4} style={{textAlign:'canter'}}>
                                        MC TYPE : {row.mc_type}
                                        {/* Shif: {row.id_shif?row.id_shif:"-"} */}
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
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showMachineModal ? 'block' : 'none'}}>
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
                  <b>ID Machine : </b>{this.state.dataOnModal.id_mc}<p/>
                  <b>Macnine Type : </b>{this.state.dataOnModal.mc_type}<p/>
                  <b>Machine Description : </b>{this.state.dataOnModal.mc_des}<p/>
                  <b>Time Contact : </b>{this.state.dataOnModal.time_contact}<p/>
                  <b>Machine Image : </b>{this.state.dataOnModal.mc_img}<p/>
                </Col>
                <Col>
                  {this.state.dataOnModal.mc_img<1?<GiSewingMachine size={200}/>
                  :<img src={"images/"+encodeURI(this.state.dataOnModal.mc_img)} width="200" height="200" alt={"Image ID :"+this.state.dataOnModal.id_mc}/>}
                </Col>
                </Row>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.machineEdit}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={this.machineDelete}>Delete</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
              <div className='container' id={"chart_timeline_machine"} >
                {this.state.showMachineModal? <SideTimelineMachine data={this.state.dataOnModal.id_mc} show={this.state.showMachineModal}/> : "-"}
                    
                </div> 
            </div>
          </div>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showMachineAdd ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ADD MACHINE</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
              <Form onSubmit={this.handleAddMachineModal}>
                <Form.Group className="mb-3" controlId="id_mc">
                  <Form.Label className='text-black'>ID Machine</Form.Label>
                  <Form.Control value={this.state.addIdMc} type='text' onChange={(event) => this.handleIdMachine(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="id_mc_type">
                  <Form.Label className='text-black'>ID Machine Type</Form.Label>
                  <Form.Select value={this.state.addIdMcType} onChange={(event) => this.handleIdMachineType(event)}>
                      <option value="1">2 Color Ink Tray Shutter</option>
                      <option value="2">4 Color Ink Tray Shutter</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className='text-black'>Machine Image</Form.Label>
                <Form.Control id='imageAdd' type='file' accept="image/png, image/jpeg, image/jpg" onChange={this.handleMachineUploadImage}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mc_des">
                  <Form.Label className='text-black'>Machine Description</Form.Label>
                <Form.Control as={'textarea'} value={this.state.addMcDes} onChange={(event) => this.handleMachineDes(event)}/>
                </Form.Group>
                <input className="btn btn-primary" type="submit" value="Add Machine" />
            </Form>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.backModal}>Back</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showMachineEdit ? 'block' : 'none'}}>
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
              <Form.Group className="mb-3" controlId="id_mc_edit">
                  <Form.Label className='text-black'>ID Machine</Form.Label>
                  <Form.Control value={this.state.dataOnModal.id_mc} type='text' onChange={(event) => this.handleIdMachineOnModal(event)}/>
                </Form.Group>
                  <Form.Group className="mb-3" controlId="id_mc_type_edit">
                  <Form.Label className='text-black'>ID Machine Type</Form.Label>
                  <Form.Select value={this.state.dataOnModal.id_mc_type} onChange={(event) => this.handleIdMachineTypeOnModal(event)}>
                      <option value="1">2 Color Ink Tray Shutter</option>
                      <option value="2">4 Color Ink Tray Shutter</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className='text-black'>Machine Image</Form.Label>
                <Form.Control id='imageEdit' type='file' accept="image/png, image/jpeg, image/jpg" onChange={this.handleMachineUploadImageOnModal}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mc_des_edit">
                  <Form.Label className='text-black'>Machine Description</Form.Label>
                <Form.Control value={this.state.dataOnModal.mc_des} as={'textarea'} onChange={(event) => this.handleMachineDesOnModal(event)}/>
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

export default TimelineMachines;
