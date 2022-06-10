import React, { Component } from 'react';
import Navbars from './Dashboard/Navbars';
import DataDashboard from './Dashboard/DataDashboard';


class Dashboard extends Component{

render() {
    return (
        <div>
            <Navbars/>
            <DataDashboard />
        </div>
        );
    }
}

export default Dashboard;