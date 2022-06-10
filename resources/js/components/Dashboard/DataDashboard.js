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
 this.getDashboardRefresh();
}

getDashboardRefresh = () => {
let self = this;
axios.get('/update/DashboardRefresh/').then(function (response) {
    self.setState({                                                                                                                                                                                                                                                                                                                       
      DashboardRefresh: response.data
    });
});
}

    render(){
        return(
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                <div className="card-header bg-danger">
                  <div>Job overview by Machine</div>
                  </div>
                  <div className="card-body">
                    <table class="table table-bordered table-striped">
                      <thead>
                        <tr class="bg-warning">
                          <th rowspan="2" class="text-center" scope="col">Status</th>
                          <th rowspan="2" class="text-center" scope="col">M/C</th>
                          <th rowspan="2" class="text-center" scope="col">Item number</th>
                          <th rowspan="2" class="text-center" scope="col">Op.</th>
                          <th rowspan="2" class="text-center" scope="col">Color</th>
                          <th rowspan="2" class="text-center" scope="col">Side</th>
                          <th rowspan="2" class="text-center" scope="col">Due Date</th>
                          <th rowspan="2" class="text-center" scope="col">Qty accum/Qty order</th>
                          <th rowspan="2" class="text-center" scope="col">Progress (%)</th>
                          <th rowspan="2" class="text-center" scope="col">Run time Actual/Std(Second)</th>
                          <th rowspan="2" class="text-center" scope="col">Total open run time(Hr)</th>
                          <th colspan="2" class="text-center" scope="col">Estimated finish</th>
                          <th rowspan="2" class="text-center" scope="col">Next item number</th>
                          <th rowspan="2" class="text-center" scope="col">Next Op.</th>
                        </tr>
                        <tr class="fw-bold second-row bg-warning">
                          <th class="text-center" scope="col">Date</th>
                          <th class="text-center" scope="col">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.DashboardRefresh.map(function (x, i) {
                    return <DashboardRow key={i} data={x} /> 
                  })}            
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default DataDashboard;

