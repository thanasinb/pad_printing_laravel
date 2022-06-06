import React from 'react';
import Timeline from './Timeline';
import TimelineV2 from './TimelineV2';

function Home() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/*component is here.*/}
                <TimelineV2/>
            </div>
        </div>
    );
}

export default Home;
