import React from 'react';
import Timeline from './Timeline';
import TimelineV2 from './TimelineV2';
import TimelineV3 from './TimelineV3';
import TimelineV4 from './TimelineV4';
// import Dashboard from './Dashboard';

function Home() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/*component is here.*/}
                <TimelineV4/>
                {/* <Dashboard/> */}
            </div>
        </div>
    );
}

export default Home;
