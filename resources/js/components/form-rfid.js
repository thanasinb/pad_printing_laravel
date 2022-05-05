import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FormRfid extends Component {
    render() {
        return (
            <form>
                <div>
                    <label>RFID :
                        <input type="text" />
                    </label>
                </div>
                <div>
                    <label>ID-MC :
                        <input type="text" />
                    </label>
                </div>
                <div>
                    <input type="submit" />
                </div>

            </form>
        );
    }
}
export default FormRfid;
