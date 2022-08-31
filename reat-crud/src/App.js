import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar } from "react-bootstrap";
import axios from "axios";
import { toast , ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import './App.css';
const api = "http://localhost:5000/users"
function App() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    loadUser();
  },[]);
  const loadUser = async ()=>{
    const response = await axios.get(api);
    setData(response);
  }

  return (
    <>
    <ToastContainer/>
    <Navbar bg='secondary' variant='dark' className="justify-content-center">
    <Navbar.Brand>Crud Operation using Json Server</Navbar.Brand>
    </Navbar>
    <Container style={{ marginTop: "70px"}}>
    <Row>
      <Col md={4}>
        <h2>Form</h2>
      </Col>
      <Col md={8}>
        <Table bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Action</th>
            {/* <th></th> */}
          </tr>
        </thead>

        </Table>
      </Col>
    </Row>

    </Container>
    </>
  );
}

export default App;
