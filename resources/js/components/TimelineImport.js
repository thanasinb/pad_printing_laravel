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

export class TimelineImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }
    componentDidMount() {
    }
    handleChange = (event) => {
        console.log(event);
        this.setState({value: event.target.value});
      }



render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Select Import File 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Browse" />
        <button onSubmit={this.handleSubmit}>Import</button>
      </form>
    </div>
    );
}
}

export default TimelineImport;