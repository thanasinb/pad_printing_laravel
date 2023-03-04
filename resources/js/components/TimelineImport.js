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
import { ConstructionOutlined } from '@mui/icons-material';
import { end } from '@popperjs/core';
import Form from 'react-bootstrap/Form';

export class TimelineImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: null,
        }
    }
    componentDidMount() {
    }

    handleChange = (event) => {
      
      console.log(event);
      this.setState({fileData: event.target.files[0]});
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if(this.state.fileData == null){
        return alert("file not found");
      }
      // console.log(this.state.fileData);
      var dataImport = new FormData();
      dataImport.append('file',this.state.fileData);
      axios.post('/update/uploadImport',dataImport,{headers:{'Content-Type': 'multipart/form-data'}}).then(response =>{
        console.log(response.data);
      })
    }


render() {
    return (
        <div>
        <Form onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3" controlId="importfile">
                  <Form.Label className='text-black'>Select import file : </Form.Label>
                <Form.Control type='file' accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.handleChange}/>
                </Form.Group>
                <input className="btn btn-primary" type="submit" value="Import" />
            </Form>
    </div>
    );
}
}

export default TimelineImport;