import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import "./Modal/modalTimelineMain.css";
import { HiX } from "react-icons/hi";
// import { ConstructionOutlined } from '@mui/icons-material';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';



export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validateBox:false,
            user:'',
            password:'',
            registerModal:false,
            regUser:'',
            regPass:'',
            regRole:'employee',
            successLogin:false,
            failedLogin:false,
            returnLoginData:'',
        }
    }
    componentDidMount() {
        // if(localStorage.getItem('token')){
        //     window.location.href = '/';
        // }
    }

    showRegisModal = () =>{
        this.setState({
            registerModal:true,
        })
    }
    closeModal = () =>{
        this.setState({
            registerModal:false,
        })
    }

    handleUser = (event) =>{
        this.setState({
            user:event.target.value,
        })
    }

    handlePassword = (event) =>{
        this.setState({
            password:event.target.value,
        })
    }

    handleRegisUser = (event) =>{
        this.setState({
            regUser:event.target.value,
        })
    }

    handleRegisPassword = (event) =>{
        this.setState({
            regPass:event.target.value,
        })
    }

    handleSubmitRegister = (event) =>{
        event.preventDefault();
        let info = {
            id:this.state.regUser,
            password:this.state.regPass,
            role:this.state.regRole,
        }
        axios.post('/update/userRegister',info).then(response =>{
                console.log(response.data);
                if(response.data.status == 'OK'){
                    this.setState({
                        registerModal:false,
                    })
                    alert('Register success.');
                }
                else{
                    alert('Register fail.');
                }
            })
    }

    handleRegisRole = (event)=>{
        this.setState({
            regRole:event.target.value,
        })
    }

    handleLogin = (event) =>{
        event.preventDefault();
        // console.log(this.state.user+"//"+this.state.password);
        axios.post('/update/userLogin',{
            user:this.state.user,
            pass:this.state.password}).then(response =>{
                console.log(response.data);
                if(response.data.auth=='pass'){
                    localStorage.setItem('token', response.data.token);
                    this.setState({
                        returnLoginData:response.data.status,
                        successLogin:true,
                        failedLogin:false,
                    })
                    if(response.data.token.substring(0,3)=='mgr'){
                        window.location.href = '/';
                    }
                    else{
                        window.location.href = '/export';
                    }
                    
                }
                else{
                    this.setState({
                        returnLoginData:response.data.status,
                        successLogin:false,
                        failedLogin:true,
                    })
                }
            })
    }


render() {
    return (
        <>
        <div className='container p-3' style={{backgroundColor:'#EEEEEE',borderRadius: '10px', border:'5px solid #E9BB3B', width:'40%', textAlign:'center' }}>
            <img src='/media/uclogo.png' alt='majorrette' style={{textAlign: 'center' }}></img><hr/>
            <b  style={{ fontSize: '28px' }}>USER LOGIN</b><hr/>
            <div style={{textAlign: 'left' }}>
            <Form onSubmit={this.handleLogin}>
            <Form.Label className='text-black'><b></b></Form.Label>
                <Form.Group className="mb-3">
                    <Form.Label className='text-black'><b>USER : </b></Form.Label>
                    <Form.Control value={this.state.user} type='text' id="user" onChange={this.handleUser}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='text-black'><b>PASSWORD : </b></Form.Label>
                    <Form.Control value={this.state.password} type='password' id="pass" onChange={this.handlePassword}/>
                </Form.Group>
                <hr/>
                <div style={{textAlign: 'center' }}>
                <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred'}} type="submit" value="Login" />&nbsp;&nbsp;
                <input className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred'}} type="button" onClick={this.showRegisModal} value="Register" />
                </div>
            </Form>
            {/*start show notify access */}
            <hr/>
            {this.state.successLogin?
            <input className="btn btn-primary" readOnly style={{ color: 'black', backgroundColor: '#AFFFB2', borderColor: 'green', width:'100%'}} value={this.state.returnLoginData} />
            :''}

            {this.state.failedLogin?
            <input className="btn btn-primary" readOnly style={{ color: 'black', backgroundColor: '#FFB3B3', borderColor: 'darkred', width:'100%'}} value={this.state.returnLoginData+", Login Failed."} />
            :''}
            {/*end show notify access */}
            </div>
    </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.registerModal ? 'block' : 'none'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">REGISTER FORM</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                    <span aria-hidden="true"><HiX/></span>
                    </button>
                </div>
                <div className="modal-body">
                <Form onSubmit={this.handleSubmitRegister}>
                <Form.Group className="mb-3" controlId="user_input">
                    <Form.Label className='text-black'>User</Form.Label>
                    <Form.Control value={this.state.regUser} type='text' onChange={(event) => this.handleRegisUser(event)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="pass_input">
                    <Form.Label className='text-black'>Password</Form.Label>
                    <Form.Control value={this.state.regPass} type='password' onChange={(event) => this.handleRegisPassword(event)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="id_mc_type">
                    <Form.Label className='text-black'>ID Machine Type</Form.Label>
                    <Form.Select value={this.state.addIdMcType} onChange={(event) => this.handleRegisRole(event)}>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                    </Form.Select>
                </Form.Group>
                    {/* <input className="btn btn-primary" type="submit" value="Register" /> */}
                </Form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" style={{ color: 'white', backgroundColor: '#a81f1f', borderColor: 'darkred'}} onClick={this.handleSubmitRegister}>Register</button>
                    <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                </div>
                </div>
            </div>
            </div>
    </>
    );
}
}

export default LoginPage;