import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
// import ReactApexChart from 'react-apexcharts';
// import DatePicker from 'react-date-picker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// import { AiFillCar } from "react-icons/ai"; 
// import { HiX } from "react-icons/hi";
import "./Modal/modalTimelineMain.css";
// import { ConstructionOutlined } from '@mui/icons-material';
// import { end } from '@popperjs/core';
// import Form from 'react-bootstrap/Form';
import { ColorRing } from 'react-loader-spinner';

export class TimelineSimulate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_staff:'12271',
            id_mc:'02-15',
            disableButtonBreak:true,
            disableButtonContinue:true,
            tempActivity:null,
        }
    }
    componentDidMount =()=> {

    }

    cardOperator =()=>{
        let data = {
            id_staff:this.state.id_staff,
            id_mc:this.state.id_mc,
        }
        axios.post('/test/AddActivity',data).then(response=>{
            console.log(response.data);
            this.setState({
                tempActivity:response.data,
                disableButtonBreak:false,
            })
    })
        // console.log(this.state.id_staff+"||"+this.state.id_mc);
    }

    cardTechnician =()=>{
        let data = {
            id_staff:this.state.id_staff,
            id_mc:this.state.id_mc,
        }
        axios.post('/test/AddActivityDT',data).then(response=>{
            console.log(response.data);
            this.setState({
                tempActivity:response.data,
                disableButtonBreak:true,
            })
        })
        
    }

    staffBreak =()=>{
        // console.log(this.state.tempActivity);
        axios.post('/test/AddBreakActivity',this.state.tempActivity).then(response=>{
            console.log(response.data);
            // this.setState({
            //     disableButtonContinue:false,
            // })
        })
        
    }

    staffContinue =()=>{
        axios.post('/test/ContinueActivity',this.state.tempActivity).then(response=>{
            console.log(response.data);
            // this.setState({
            //     disableButtonContinue:true,
            // })
        })
        
    }

    staffExit =()=>{
        console.log(this.state.tempActivity);
        axios.post('/test/ExitActivity',this.state.tempActivity).then(response=>{
            console.log(response.data);
            this.setState({
                disableButtonBreak:true,
            })
        })
        
    }

    onChangeIdStaff = (event) =>{
        this.setState({
            id_staff:event.target.value,
        })
    }

    onChangeMachine = (event) =>{
        this.setState({
            id_mc:event.target.value,
        })
    }


render() {
    return (
        <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', textAlign:'left' }}>
            <label>
                ID Staff : &nbsp;
                    <select id="lang" onChange={this.onChangeIdStaff} value={this.state.id_staff}>
                        {/* <option value="Select">---Select---</option> */}
                        <option value="12271">12271</option>
                        <option value="12272">12272</option>
                        <option value="12327">12327</option>
                        <option value="CM2633">CM2633</option>
                        <option value="62468">62468</option>
                    </select>
            </label>&nbsp;&nbsp;
            <label>
                ID Machine : &nbsp;
                    <select id="lang" onChange={this.onChangeMachine} value={this.state.id_mc}>
                        {/* <option value="Select">---Select---</option> */}
                        <option value="02-15">02-15</option>
                        <option value="02-17">02-17</option>
                        <option value="02-20">02-20</option>
                        <option value="02-35">02-35</option>
                        <option value="02-42">02-42</option>
                    </select>
            </label>
            <p/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="แตะบัตร" onClick={this.cardOperator}/>&nbsp;
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="แตะบัตรDT" onClick={this.cardTechnician}/>&nbsp;
            <hr/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="พักเบรก" onClick={this.staffBreak} />&nbsp;
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="ทำงานต่อ" onClick={this.staffContinue} />&nbsp;
            <hr/>
            <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="button" value="ออกจากงาน" onClick={this.staffExit}/>&nbsp;

        </div>
    );
}
}

export default TimelineSimulate;