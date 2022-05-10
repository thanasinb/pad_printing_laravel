import React, { Component } from 'react';
import axios from 'axios';
import OutputTouch from './OutputTouch';
import { isEmpty, isNull } from 'lodash';
class FormRfid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notFound : 'หาค่านี้ไม่พบ',
            idRfid: null,
            idMach: null,
            result: [],
            idTask: null,
        }
    }
    

    inputRfid = (event) => {
        this.setState({
            idRfid: event.target.value,
        });
    }
    inputMachineId = (event) => {
        this.setState({
            idMach: event.target.value,
        });
    }


    getInfoTouch = () => {
        let self = this;
        axios.get('/update/touch/', {
            params:{
                id_rfid : this.state.idRfid,
                id_mc : this.state.idMach,
            }
        }).then(function (response) {
            let SolveData = JSON.stringify(response.data);
            console.log(SolveData);
            self.setState({
                result: response.data
            });
        });
    }
    

    render() {
        return (
            <div className="container">
                <div>
                    <label>ID-RFID :
                        <input type="text"
                            maxLength="10"
                            onChange={this.inputRfid}/>
                    </label>
                </div>
                <div>
                    <label>ID-Machine :
                        <input type="text"
                            maxLength="6"
                            onChange={this.inputMachineId}/>
                    </label>
                </div>
                <div>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={this.getInfoTouch}
                        >Enter</button>
                </div>
                <div className="result">

                {this.state.result.map((x, i) => {
                        return <div><OutputTouch key={i }data={x}/></div>
                })}
                </div> 
                
            </div>
        );
    }
}
export default FormRfid;
