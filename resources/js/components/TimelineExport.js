import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import "./Modal/modalTimelineMain.css";
import { ConstructionOutlined } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



export class TimelineExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            date:new Date(),
            dateRange:new Date(),
            shif:'1',
            selectRange: true,
            fileName:'export',
        }
    }
    componentDidMount() {
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
        // console.log(event.target.value);
        this.setState({
            shif:event.target.value
        });
    }

    setStartDate = (date) => {
        console.log(date);
    }

    setRangeDate = (dateRange) => {
        console.log(dateRange);
    }


render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <div> <input type="checkbox" id="topping" name="topping" value={this.state.selectRange} onChange={this.handleSelectRange} /> Select Range </div>
                Start : 
                <DatePicker selected={new Date()} onChange={(date) => this.setStartDate(date)} />
                To :
                <DatePicker selected={new Date()} onChange={(date) => this.setRangeDate(date)} disabled={this.state.selectRange}/><p/>
            <lable>File Name : <input type="text" value={this.state.fileName} onChange={this.handleFileName} /></lable>
            <div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1"
                    onChange={this.handleRadioShif}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="1" control={<Radio />} label="All day (2 Shif)" />
                    <FormControlLabel value="2" control={<Radio />} label="07:00-19:00 (Day)" />
                    <FormControlLabel value="3" control={<Radio />} label="19:00-07:00 (Night)" />
                </RadioGroup>
            </FormControl>
            </div>
            <input type="submit" value="Export" />
      </form>
            
    </div>
    );
}
}

export default TimelineExport;