import React, { Component } from 'react';
import axios from 'axios';
import DashboardRow from './DashboardRow';


class DataDashboard extends Component{
  constructor(props) { 
    super(props);

    this.state = {
      DashboardRefresh : [],
    }
}

componentDidMount() {
  console.log(123);
 this.getDashboardRefresh();
}

getDashboardRefresh = () => {
let self = this;
axios.get('/update/DashboardRefresh/').then(function (response) {
    self.setState({                                                                                                                                                                                                                                                                                                                       
      DashboardRefresh: response.data
    });
    console.log(response.data);
    
});
}

    render(){
        return(
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr class="bg-warning">
                          <th rowSpan="2" className="text-center" scope="col">Status</th>
                          <th rowSpan="2" className="text-center" scope="col">M/C</th>
                          <th rowSpan="2" className="text-center" scope="col">Item number</th>
                          <th rowSpan="2" className="text-center" scope="col">Op.</th>
                          <th rowSpan="2" className="text-center" scope="col">Color</th>
                          <th rowSpan="2" className="text-center" scope="col">Side</th>
                          <th rowSpan="2" className="text-center" scope="col">Due Date</th>
                          <th rowSpan="2" className="text-center" scope="col">Qty accum/Qty order</th>
                          <th rowSpan="2" className="text-center" scope="col">Progress (%)</th>
                          <th rowSpan="2" className="text-center" scope="col">Run time Actual/Std(Second)</th>
                          <th rowSpan="2" className="text-center" scope="col">Total open run time(Hr)</th>
                          <th colSpan="2" className="text-center" scope="col">Estimated finish</th>
                          <th rowSpan="2" className="text-center" scope="col">Next item number</th>
                          <th rowSpan="2" className="text-center" scope="col">Next Op.</th>
                        </tr>
                        <tr className="fw-bold second-row bg-warning">
                          <th className="text-center" scope="col">Date</th>
                          <th className="text-center" scope="col">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.DashboardRefresh.map(function (x, i) {
                    return <DashboardRow key={i} data={x} /> 
                  })}            
                      </tbody>
                    </table>
    );
  }
}

export default DataDashboard;

