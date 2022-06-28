import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiHamburgerMenu } from 'react-icons/Gi';
// import HamburgerMenu from "./Hamburger/HamburgerMenu";
// import McSidenav from "./ToggleMenu/McSidenav";

class Navbars extends Component{
    render(){  
      return(
        <body>
          <nav class="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
          <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" ><i data-feather="menu"></i><GiHamburgerMenu/></button>
          {/* <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" ><McSidenav/></button> */}
          {/* <HamburgerMenu /> */}
              <div class="container-fluid">
                  <a class="navbar-brand pe-3 ps-4 ps-lg-2">Majorette</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                      </ul>
                  </div>
              </div>
          </nav>
        </body>
    );
}
}

export default Navbars;


// import Navbar from "./Sidebar/Navbar";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Web from "./Pages/Web";

// function Navbars (){
//     return(
//         <>
//         <Router>
//             <Navbar/>
//             <Switch>
//                 <Route path="/" exact component={Web} />
//             </Switch>
//             </Router>
//             </>
//     );
// }

// export default Navbars;