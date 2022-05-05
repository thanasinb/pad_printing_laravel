import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FormRfid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idRfid: null,
            idMach: null,
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
        axios.get('/info/touch', {
            params:{
                idRfid : this.state.idRfid,
                idMach : this.state.idMach,
            }
        }).then(function (response) {
            self.setState({
                result: response.data
            });
        });
    }

    render() {
        return (
            <>
            
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
                {this.state.result}
            </div>
            </>
        );
    }
}
export default FormRfid;
