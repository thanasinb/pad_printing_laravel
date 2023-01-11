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
import "./Modal/modalTimelineMain.css";
import Form from 'react-bootstrap/Form';

export class TimelineMachines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMachinesTemp : [],
            dataMachines : [],
            dataOnModal : [],
            showMachineModal : false,
            showMachineEdit : false,
        }
    }
    componentDidMount() {
        this.getMachines();
    }
    
    getMachines = () =>{
        axios.get('/update/machinesAll').then(response => {
            this.setState({dataMachines : response.data});
            console.log(response.data);
        });
    }

    machineSelect = (event,row) =>{
        console.log("MC SELECTION");
        console.log(row);
        console.log(event);
        this.setState({
            dataOnModal:row,
            showMachineModal:true,
            showMachineEdit:false
        })
    }
    machineEdit = (event) =>{
        this.setState({
            showMachineModal:false,
            showMachineEdit:true
        })
    }

    closeModal = () =>{
        this.setState({
            showMachineModal:false,
            showMachineEdit:false
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
                <Form.Select aria-label="Default select example">
                    <option>Open this select type menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="search">
                    
                    <Form.Control type="email" placeholder="Search..." />
                    <Form.Text className="text-muted">
                    ค้นหาเครื่องจักรที่ต้องการโดยเลือกหมวดหมู่ของการค้นหา จากนั้นเติมคำที่ต้องลงในช่องว่าง กรณีไม่เลือกหมวดหมู่จะค้นหาจากทุกหมวด
                    </Form.Text>
                </Form.Group>
                <Button  variant="primary" type="submit">
                    Search
                </Button>
            </Form>
            </Container>
            </div>
        {this.state.dataMachines.map((row, index) => (
        <Button
        variant="secondary"
        className="container rounded p-3 m-1 mx-auto"
        key={index + '-' + row.id_mc}
        onClick={event => this.machineSelect(event,row)}
        >
            <Container>
                <Row>
                    <Col xs={6} md={4} ><GiSewingMachine size={70}/><p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> ID Machine : {row.id_mc}<p/>
                                        MC-DES : {row.mc_des?row.mc_des:"-"}
                                        {/* Name: {row.name_first+"  "+row.name_last} */}
                                        </Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>
                                        Work Mode : {row.id_workmode?row.id_workmode:"-"} <p/>
                                        MC TYPE : {row.id_mc_type}
                                        {/* Shif: {row.id_shif?row.id_shif:"-"} */}
                                        </Col>
                </Row>
            </Container>
        
        </Button>
        ))}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showMachineModal ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                ITEM NO. : {this.state.dataOnModal.id_mc}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.machineEdit}>Edit</button>
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
                MACHINE ID : {this.state.dataOnModal.id_mc}
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

export default TimelineMachines;