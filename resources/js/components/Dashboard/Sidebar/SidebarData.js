// import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./styles.css";
// import { slide as Menu } from 'react-burger-menu'

// class McSidenav extends Component{

//     showSettings (event) {
//         event.preventDefault();

//       }
//     render(){
//       return(

// <Menu>
// <a id="home" className="menu-item" href="/">Home</a>
// <a id="about" className="menu-item" href="/about">About</a>
// <a id="contact" className="menu-item" href="/contact">Contact</a>
// <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
// </Menu>
//     );
// }
// }

// export default  McSidenav;

import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper/>,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus/>,
    cName: 'nav-text'
  }
]