import Timeline from './Timeline';
import TimelineV2 from './TimelineV2';
import TimelineV3 from './TimelineV3';
import TimelineV4 from './TimelineV4';
import Navbars from './Dashboard/Navbars';
import DashboardCard from './Dashboard/DashboardCard';
import React, { Component,useState } from 'react';
import axios from 'axios';
// import Dashboard from './Dashboard';

var allData =[];
class Home extends Component {

    constructor(props) {
            super(props);
            this.state = {
                timeline : []
              
              }
            
        }
        componentDidMount = () => {
            this.getTimeline();
        }
        componentWillUnmount = () => {
            this.getTimeline();
        }

        getTimeline = () => {
            let self = this;
            axios.get('/update/timelineAll/').then(function (response) {
                // console.log(response.data);
                let resultData = response.data;
                let dataLength = Object.keys(resultData).length;
                for(let i = 0 ; i<dataLength ; i++){
                  for(let j = 0 ; j<(resultData[i].length) ; j++){
                    allData.push(resultData[i][j]);
                  }
                }
                allData.sort((a, b) => (a.time_start > b.time_start) ? 1 : -1)
                
        
                self.setState({ timeline: allData}, function () {
                //   console.log(this.state.timeline);
                //   console.log('this set timeline');
                });
              // let x = this.state.timeline;
              // console.log(x);
        
            });
            
        }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                <Navbars/>
                <DashboardCard/>
                    {/*component is here.*/}
                    <TimelineV4 data={this.state.timeline}/>
                    {/* <Dashboard/> */}
                </div>
            </div>
        );
    }
}

export default Home;