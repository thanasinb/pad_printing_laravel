import React, { Component } from 'react';
import Clock from 'react-digital-clock';
import DataDashboard from './DataDashboard';


class DashboardCard extends Component{

    render() {
        return(
            <div id="layoutSidenav_content">
                <header className="page-header page-header-dark pb-5">
                    {/* <div className="container-xl px-4">
                        <div className="page-header-content pt-4"></div>
                    </div> */}
                </header>
                <div className="container-fluid px-4 mt-n10">
                    <div className="card mb-4 w-100" id="table-machine">
                        <div className="card-header bg-red fw-bold text-white fs-4 d-flex justify-content-between bg-danger">
                            <div>Job overview by Machine</div>
                        <div>
                            <span><Clock/></span>
                        </div>
                        </div>
                        <div className="card-body">
                            <DataDashboard/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardCard;
 
 
