import React from 'react';
import ReactDOM from 'react-dom';
import TimelineMain from './components/TimelineMain';  
import TimelineMainV2 from './components/TimelineMainV2';  
import TimelineEmployees from './components/TimelineEmployees'; 
import TimelineMachines from './components/TimelineMachines';
import TimelineProducts from './components/TimelineProducts';
import TimelineExport from './components/TimelineExport';
import TimelineImport from './components/TimelineImport';


// if (document.getElementById('homepage')) {
//     ReactDOM.render(<Home />, document.getElementById('homepage'));
// }
if(document.getElementById('timeline')){
    ReactDOM.render(<TimelineMainV2 />, document.getElementById('timeline'));
}
else if(document.getElementById('import')){
    ReactDOM.render(<TimelineImport />, document.getElementById('import'));
}
else if(document.getElementById('export')){
    ReactDOM.render(<TimelineExport />, document.getElementById('export'));
}
else if(document.getElementById('products')){
    ReactDOM.render(<TimelineProducts />, document.getElementById('products'));
}
else if(document.getElementById('machines')){
    ReactDOM.render(<TimelineMachines />, document.getElementById('machines'));
}
else if(document.getElementById('employees')){
    ReactDOM.render(<TimelineEmployees />, document.getElementById('employees'));
}