import React, { Component } from 'react';
import axios from 'axios';
import OutputTouch from './OutputTouch';
class FormRfid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idRfid: null,
            idMach: null,
            resultStaff: [],
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
                idRfid : this.state.idRfid,
                idMach : this.state.idMach,
            }
        }).then(function (response) {
            let SolveData = JSON.stringify(response.data);
            console.log(SolveData);
            self.setState({
                resultStaff: response.data
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

                {this.state.resultStaff.map((x) => {
                    return <div><OutputTouch data={x}/></div>
                })}
                
                </div>
            </div>
            
        );
    }
}
export default FormRfid;
