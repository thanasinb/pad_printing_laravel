import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import "./Modal/modalTimelineMain.css";
// import { ConstructionOutlined } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as XLSX from "xlsx";
// import FormLabel from '@mui/material/FormLabel';



export class TimelineExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            dateStartShow:new Date(),
            dateEndedShow:new Date(),
            dateStart:"",
            dateEnded:"",
            shifType:"all_day",
            shif:['07:00:00', '07:00:00'],
            selectRange: true,
            fileName:'export',
            isManager:false,
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
        var toDay = new Date();
        this.setState({
            dateStart:toDay.getFullYear()+"-"+(toDay.getMonth()+1<10?("0"+(toDay.getMonth()+1)):(toDay.getMonth()+1))+"-"+(toDay.getDate()<10?("0"+toDay.getDate()):(toDay.getDate())),
            dateEnded:toDay.getFullYear()+"-"+(toDay.getMonth()+1<10?("0"+(toDay.getMonth()+1)):(toDay.getMonth()+1))+"-"+(toDay.getDate()<10?("0"+toDay.getDate()):(toDay.getDate())),
        })
    }

    handleSelectRange = () =>{
        this.setState({
            selectRange: !this.state.selectRange ,
        })
    }

    handleFileName = (event) => {
        this.setState({
            fileName:event.target.value,
        })
    }

    handleRadioShif = (event) => {
        var temp = event.target.value;
        var type;
        if(event.target.value == "07:00:00-07:00:00"){
            type = "all_day";
        }
        else if(event.target.value == "07:00:00-19:00:00"){
            type = "day";
        }
        else if(event.target.value == "19:00:00-07:00:00"){
            type = "night";
        }
        var shif_split = temp.split("-");
        this.setState({
            shif:shif_split,
            shifType:type,
        })
        // console.log(this.state.shif);
    }

    setStartDate = (date) => {
        this.setState({
            dateStartShow:date,
            dateStart:date.getFullYear()+"-"+(date.getMonth()+1<10?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<10?("0"+date.getDate()):(date.getDate())),
        })
        // console.log((date.getDate()<10?("0"+date.getDate()):(date.getDate()))+"-"+(date.getMonth()<10?("0"+date.getMonth()):(date.getMonth()))+"-"+date.getFullYear());
        
    }

    setRangeDate = (date) => {
        this.setState({
            dateEndedShow:date,
            dateEnded:date.getFullYear()+"-"+(date.getMonth()+1<10?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<10?("0"+date.getDate()):(date.getDate())),
        })
        // console.log(date);
    }

    handleExport = (event) =>{
        event.preventDefault();
        var resultEndDate = this.state.dateEnded;
        if(this.state.selectRange == true){
            resultEndDate = this.state.dateStart;
        }
        if(this.state.shif[0] == "07:00:00" && this.state.shif[1] == "07:00:00" && (this.state.dateStart == this.state.dateEnded || this.state.selectRange == true)){
            var editDate = this.state.dateStart.split("-");
            editDate[2] = parseInt(editDate[2])+1;
            editDate[2] = parseInt(editDate[2])<10?"0"+editDate[2].toString():editDate[2].toString();
            resultEndDate = editDate[0]+"-"+editDate[1]+"-"+editDate[2]
        }
        else if(this.state.shif[0] == "07:00:00" && this.state.shif[1] == "07:00:00"){
            var editDate = this.state.dateEnded.split("-");
            editDate[2] = parseInt(editDate[2])+1;
            editDate[2] = parseInt(editDate[2])<10?"0"+editDate[2].toString():editDate[2].toString();
            resultEndDate = editDate[0]+"-"+editDate[1]+"-"+editDate[2]
        }
        else if(this.state.shif[0] == "19:00:00" && this.state.shif[1] == "07:00:00" && this.state.selectRange == true){
            var editDate = this.state.dateStart.split("-");
            editDate[2] = parseInt(editDate[2])+1;
            editDate[2] = parseInt(editDate[2])<10?"0"+editDate[2].toString():editDate[2].toString();
            resultEndDate = editDate[0]+"-"+editDate[1]+"-"+editDate[2]
        }
        else if(this.state.shif[0] == "19:00:00" && this.state.shif[1] == "07:00:00" && this.state.selectRange == false){
            var editDate = this.state.dateEnded.split("-");
            editDate[2] = parseInt(editDate[2])+1;
            editDate[2] = parseInt(editDate[2])<10?"0"+editDate[2].toString():editDate[2].toString();
            resultEndDate = editDate[0]+"-"+editDate[1]+"-"+editDate[2]
        }
        var dateShif = {
            shifSelect: this.state.shifType,
            dateAt:this.state.dateStart,
            dateTo:resultEndDate,
            shifTimeAt:this.state.shif[0],
            shifTimeTo:this.state.shif[1],
            name:this.state.fileName,
        };
        console.log(dateShif);
        axios.post('update/exportFile',dateShif).then(response =>{
            console.log(response.data);
            if(response.data['success'] == true){
                this.downloadFileExport(dateShif['name']);
            }
        })
    }

    downloadFileExport = async(fileName) =>{
        const response = await fetch('Download/export.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const worksheetAsBlob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(worksheetAsBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName+'.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


render() {
    return (
        <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', width:'40%', textAlign:'left' }}>
            <form onSubmit={this.handleExport}>
            <div> 
            <b>Select Range : </b><input type="checkbox" id="topping" name="topping" value={this.state.selectRange} onChange={this.handleSelectRange} /><hr/>
                </div>
                <b>Start : </b>
                {/* <DatePicker selected={this.state.dateStartShow} dateFormat="dd/MM/yyyy" onChange={(date) => this.setStartDate(date)} /> */}
                <DatePicker
                    selected={this.state.dateStartShow}
                    onChange={(date) => this.setStartDate(date)}
                    selectsStart
                    startDate={this.state.dateStartShow}
                    endDate={this.state.dateEndedShow}
                />
                <b>To : </b>
                {/* <DatePicker selected={this.state.dateEndedShow} dateFormat="dd/MM/yyyy" onChange={(date) => this.setRangeDate(date)} disabled={this.state.selectRange}/><p/> */}
                <DatePicker
                    selected={this.state.dateEndedShow}
                    onChange={(date) => this.setRangeDate(date)}
                    selectsEnd
                    startDate={this.state.dateStartShow}
                    endDate={this.state.dateEndedShow}
                    minDate={this.state.dateStartShow}
                    disabled={this.state.selectRange}
                />
            <hr/>
            <lable><b>File Name : </b><input type="text" value={this.state.fileName} onChange={this.handleFileName} /></lable>
            <hr/>
            <div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="07:00:00-07:00:00"
                    onChange={this.handleRadioShif}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="07:00:00-07:00:00" control={<Radio />} label="All day (2 Shif)" />
                    <FormControlLabel value="07:00:00-19:00:00" control={<Radio />} label="07:00-19:00 (Day)" />
                    <FormControlLabel value="19:00:00-07:00:00" control={<Radio />} label="19:00-07:00 (Night)" />
                </RadioGroup>
            </FormControl>
            </div>
            <hr/>
            <input className='btn btn-danger' style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="submit" value="Export" />
      </form>
            
    </div>
    );
}
}

export default TimelineExport;