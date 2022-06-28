import React, { Component } from 'react';
import Navbars from './Dashboard/Navbars';
import ReactDom from 'react-dom';
// import DataDashboard from './Dashboard/DataDashboard';
import DashboardCard from './Dashboard/DashboardCard';

class Dashboard extends Component{

render() {
    return (
        <div id="layoutSidenav_content">
        
            <Navbars/>
            {/* <DataDashboard /> */}
            <DashboardCard/>
        </div>
        );
    }
}

export default Dashboard;