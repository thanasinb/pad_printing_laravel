import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillCar } from "react-icons/ai"; 
import { HiX } from "react-icons/hi";
import "./Modal/modalTimelineMain.css";
import Form from 'react-bootstrap/Form';

export class TimelineProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType : "0",
            dataItem : [],
            dataItemTemp : [],
            dataOnModal : [],
            itemSelectModal : [],
            itemSelectValueModal : 0,
            showItemModal : false,
            showItemEdit : false,
        }
    }
    componentDidMount() {
        this.getItem();
    }
    
    getItem = () =>{
        axios.get('/update/planningAll').then(response => {
            this.setState({dataItem : response.data,
                            dataItemTemp : response.data });
            console.log(response.data);
        });
    }

    itemSelect = (event,row) =>{
        axios.post('/update/planningSelect',row.item_no).then(response => {
          this.setState({itemSelectModal : response.data,
                          dataOnModal:row,
                          showItemModal:true,
                          showItemEdit:false,
                          itemSelectValueModal : 0, });
          // console.log(response.data);
        });
        // console.log("EM SELECTION");
        // console.log(row);
        // console.log(event);
    }
    itemEdit = (event) =>{
        
        this.setState({
            showItemModal:false,
            showItemEdit:true
        })
    }

    closeModal = () =>{
        this.setState({
            showItemModal:false,
            showItemEdit:false
        })
    }

    handleSearchType = (event) => {
      // this.filterSearch();
      this.setState({
        searchType : event.target.value
      })
    }
    filterSearch = (event) => {
      var tempFilter = event.target.value;
      var tempResult;
      // console.log(tempFilter);
        if(tempFilter.length <= 0){
          tempResult = this.state.dataItemTemp;
        }
        else if(this.state.searchType === "0"){
            tempResult = this.state.dataItemTemp.filter(x =>{
              return x.item_no.toLowerCase().includes(tempFilter.toLowerCase()) ||
                x.item_des.toLowerCase().includes(tempFilter.toLowerCase())
            })
        }
        else if(this.state.searchType === "1"){
          tempResult = this.state.dataItemTemp.filter(x =>{
            return x.item_no.toLowerCase().includes(tempFilter.toLowerCase())
          })
        }
        else if(this.state.searchType === "2"){
          tempResult = this.state.dataItemTemp.filter(x =>{
            return x.item_des.toLowerCase().includes(tempFilter.toLowerCase()) 
          })
        }
      
      // console.log(test);
      this.setState({
        dataItem : tempResult,
      })
      tempResult = [];
      
    }

    handleChangeJob = (event) =>{
      var valueSelect = parseInt(event.target.value);
      console.log(valueSelect);
      this.setState({
        itemSelectValueModal : valueSelect,
      })
    }


render() {
    return (
        <div>
          <div>
                <Container className="bg-dark rounded p-4 m-1 mx-auto">
            <Form>
                <Form.Group className="mb-3" controlId="typeSearch">
                <Form.Label className='text-white'>SEARCH</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleSearchType}>
                    <option value="0">All</option>
                    <option value="1">By Item Number</option>
                    <option value="2">By Item Description</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="search">
                    
                    <Form.Control type="text" placeholder="Search..." onChange={this.filterSearch}/>
                    <Form.Text className="text-muted">
                    ค้นหาเครื่องจักรที่ต้องการโดยเลือกหมวดหมู่ของการค้นหา จากนั้นเติมคำที่ต้องลงในช่องว่าง กรณีไม่เลือกหมวดหมู่จะค้นหาจากทุกหมวด
                    </Form.Text>
                </Form.Group>
                {/* <Button  variant="primary" type="submit">
                    Search
                </Button> */}
            </Form>
            </Container>
            </div>
        {this.state.dataItem.map((row, index) => (
        <Button
        variant="secondary"
        className="container rounded p-3 m-1 mx-auto"
        key={index + '-' + row.item_no}
        onClick={event => this.itemSelect(event,row)}
        >
            <Container>
                <Row>
                    <Col xs={6} md={4} ><AiFillCar size={45}/><p/>
                                        <a style={{ color: '#CBCBCB', opacity:0.5}}>Click to see more information</a></Col>
                    <Col xs={6} md={4}> Item NO. : {row.item_no}<p/>
                                        {/* MC-DES : {row.mc_des?row.mc_des:"-"} */}
                                        {/* Name: {row.name_first+"  "+row.name_last} */}
                                        </Col>
                    <Col xs={3} md={2} style={{textAlign:'canter'}}>
                                        Item Description : {row.item_des} <p/>
                                        </Col>
                </Row>
            </Container>
        
        </Button>
        ))}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemModal ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                ITEM NO. : {this.state.dataOnModal.item_no}<p/>
                ITEM Description : {this.state.dataOnModal.item_des}<p/>
                <Form>
                  <Form.Group className="mb-3" controlId="type">
                  <Form.Label className='text-black'>Item Description</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={this.handleChangeJob}>
                  {this.state.itemSelectModal ? 
                    this.state.itemSelectModal.map((data, index)=>(
                      <option key={index} value={index}>{"Date Due: "+data.date_due+" // id_job: "+data.id_job+" // id_task: "+data.id_task}</option>
                    )) : <option>No data found</option>
                  }
                  </Form.Select>
                  </Form.Group>
                </Form>
                {this.state.showItemModal?
                  <div>
                  ID Task : {this.state.itemSelectModal[this.state.itemSelectValueModal].id_task}<p/>
                  ID Job : {this.state.itemSelectModal[this.state.itemSelectValueModal].id_job}<p/>
                  Operation : {this.state.itemSelectModal[this.state.itemSelectValueModal].operation}<p/>
                  Product Line : {this.state.itemSelectModal[this.state.itemSelectValueModal].prod_line}<p/>
                  Operation Color/Des./Side : {this.state.itemSelectModal[this.state.itemSelectValueModal].op_color+" / "
                  +this.state.itemSelectModal[this.state.itemSelectValueModal].op_des+" / "
                  +this.state.itemSelectModal[this.state.itemSelectValueModal].op_side}<p/>
                  Quantity Comp/Open/Order : {this.state.itemSelectModal[this.state.itemSelectValueModal].qty_comp+" / "
                  +this.state.itemSelectModal[this.state.itemSelectValueModal].qty_open+" / "
                  +this.state.itemSelectModal[this.state.itemSelectValueModal].qty_order}<p/>
                  Type : {this.state.itemSelectModal[this.state.itemSelectValueModal].type}<p/>
                  Work Center : {this.state.itemSelectModal[this.state.itemSelectValueModal].work_center}<p/>
                  Work Order : {this.state.itemSelectModal[this.state.itemSelectValueModal].work_order}<p/>
                  Sales Job : {this.state.itemSelectModal[this.state.itemSelectValueModal].sales_job}<p/>
                  Site : {this.state.itemSelectModal[this.state.itemSelectValueModal].site}<p/>
                  Date Due : {this.state.itemSelectModal[this.state.itemSelectValueModal].date_due}<p/>
                  Datetime Update : {this.state.itemSelectModal[this.state.itemSelectValueModal].datetime_update}<p/>
                  </div>
                  :"-"}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.itemEdit}>Edit</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" style={{ display: this.state.showItemEdit ? 'block' : 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">EDIT</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true"><HiX/></span>
                </button>
              </div>
              <div className="modal-body">
                ITEM NO. : {this.state.dataOnModal.item_no}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.closeModal}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
}
}

export default TimelineProducts;