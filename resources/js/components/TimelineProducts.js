import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillCar } from "react-icons/ai"; 
import { HiX } from "react-icons/hi";
import "./Modal/modalTimelineMain.css";

export class TimelineProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItem : [],
            dataOnModal : [],
            showItemModal : false,
            showItemEdit : false,
        }
    }
    componentDidMount() {
        this.getItem();
    }
    
    getItem = () =>{
        axios.get('/update/planningAll').then(response => {
            this.setState({dataItem : response.data});
            console.log(response.data);
        });
    }

    itemSelect = (event,row) =>{
        console.log("EM SELECTION");
        console.log(row);
        console.log(event);
        this.setState({
            dataOnModal:row,
            showItemModal:true,
            showItemEdit:false
        })
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


render() {
    return (
        <div>
        {this.state.dataItem.map((row, index) => (
        <Button
        variant="secondary"
        className="container rounded p-3 m-1 mx-auto"
        key={index + '-' + row.item_no}
        onClick={event => this.itemSelect(event,row)}
        >
            <Container>
                <Row>
                    <Col xs={6} md={4} ><AiFillCar size={70}/><p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> Item NO. : {row.item_no}<p/>
                                        {/* MC-DES : {row.mc_des?row.mc_des:"-"} */}
                                        {/* Name: {row.name_first+"  "+row.name_last} */}
                                        </Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>
                                        Status : {"WORKING"} <p/>
                                        </Col>
                </Row>
            </Container>
        
        </Button>
        ))}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemModal ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                ITEM NO. : {this.state.dataOnModal.item_no}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.itemEdit}>Edit</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemEdit ? 'block' : 'none'}}>
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
        </div>
    </div>
    );
}
}

export default TimelineProducts;