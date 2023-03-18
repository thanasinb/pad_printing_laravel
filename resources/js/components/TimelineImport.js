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

export class TimelineImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileData: null,
            isManager:false,
            loading:false,
            modalSuccess:false,
            modalFailed:false,
            dataImport:null,
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
    }

    handleChange = (event) => {
      
      console.log(event);
      this.setState({fileData: event.target.files[0]});
    }

    handleSubmit = (event) => {
      this.setState({
        loading:true,
      })
      event.preventDefault();
      if(this.state.fileData == null){
        return alert("file not found");
      }
      // console.log(this.state.fileData);
      var dataImport = new FormData();
      dataImport.append('file',this.state.fileData);
      axios.post('/update/uploadImport',dataImport,{
        headers:{'Content-Type': 'multipart/form-data'},
        onUploadProgress:progressEvent => {
          console.log(`Upload progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
        }}).then(response =>{
        console.log(response.data);
        document.getElementById("import_upload").value = "";
        
          var name = {filename:this.state.fileData.name};
          axios.post('/update/importData',name).then(response =>{
            console.log(response.data);
            this.setState({
              fileData:null,
              loading:false,
            });
            alert('Import success.');
        }).catch(err=>{
          console.log(err);
            this.setState({
              fileData:null,
              loading:false,
            });
            alert('Import fail.');
        })
      })
      
      
    }

    handleClose = () =>{
      this.setState({
        modalSuccess:false,
        modalFailed:false,
        loading:false,
      })
    }


render() {
    return (
      <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', textAlign:'left' }}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className='text-black'><b>Select import file : </b></Form.Label>
                <Form.Control type='file' id="import_upload" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={this.handleChange}/>
                </Form.Group>
                <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred' }} type="submit" value="Import" disabled={this.state.isManager}/>
            </Form>
            {this.state.isManager && <p style={{color:'red'}}>* Not recommend for manager.</p>}
            {this.state.loading && <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#FFD7D7', '#FF9A59', '#f8b26a', '#E8C12C', '#B62D0E']}
              />}
            </div>
    );
}
}

export default TimelineImport;