import React from 'react';
import ReactDOM from 'react-dom';
import FormRfid from './form-rfid';

function Home() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/*component is here.*/}
                <FormRfid/>
            </div>
        </div>
    );
}

export default Home;
