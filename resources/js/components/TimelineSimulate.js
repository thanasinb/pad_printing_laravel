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
import { ColorRing } from 'react-loader-spinner';

export class TimelineSimulate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityType:1,
            id_staff:null,
            id_rfid:null,
            id_mc:'02-00',
        }
    }
    componentDidMount =()=> {

    }

    staffActiveCard =()=>{

    }

    staffActivity =()=>{

    }

    staffBreak =()=>{

    }

    staffContinue =()=>{

    }

    staffExit =()=>{

    }

render() {
    return (
        <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', textAlign:'left' }}>

            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="แตะบัตร" onClick={this.staffActivity}/><p/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="เลือก Activity" onClick={this.staffActivity}/><p/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="พักเบรก" onClick={this.staffActivity}/><p/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="ทำงานต่อ" onClick={this.staffActivity}/><p/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="ออกจากงาน" onClick={this.staffActivity}/><p/>

        </div>
    );
}
}

export default TimelineSimulate;