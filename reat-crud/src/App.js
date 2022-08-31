import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import './App.css';
const api = "http://localhost:5000/users"
const initialState = {
  name: '',
  address: '',
  email: '',
  contact: ''
}

function App() {
  const [create, setCreate] = useState(initialState);
  const [data, setData] = useState([]);

  const { name, address, email, contact } = create;

  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const response = await axios.get(api);
    setData(response.data);
  }

  const handleChange=(e)=>{
    let {name,value} = e.target;
    setCreate({...create,[name]:value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(!name || !address || !email || !contact){
      toast.error("please fill all input field")
    }
    else{
      axios.post(api, create);
        toast.success("Added Successfully")
        setCreate({name: "",address: "", email: "", contact : ""})
        setTimeout(()=>{
          loadUser();
        },500)
    }
  }

  return (
    <>
      <ToastContainer />
      <Navbar bg='secondary' variant='dark' className="justify-content-center">
        <Navbar.Brand>Crud Operation using Json Server</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: "70px" }}>
        <Row>
          <Col md={4}>
            <Form onSubmit={handleSubmit}>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
                <Form.Control type="text" placeholder='Enter Name' name="name" value={name} onChange={handleChange}/>
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Address</Form.Label>
                <Form.Control type="text" placeholder='Enter Address' name="address" value={address} onChange={handleChange}/>
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
                <Form.Control type="text" placeholder='Enter Email' name="email" value={email} onChange={handleChange}/>
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Contact</Form.Label>
                <Form.Control type="text" placeholder='Enter Contact' name="contact" value={contact} onChange={handleChange}/>
              </Form.Group>
              
              <div className='d-grid gap-2 mt-3'>
                <Button type="submit" variant="secondary">Submit</Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Action</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              {data && data.map((el, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.address}</td>
                    <td>{el.email}</td>
                    <td>{el.contact}</td>
                    <td>
                      <ButtonGroup>
                        <Button style={{ marginRight: "5px" }} variant="primary">Update</Button>
                        <Button style={{ marginRight: "5px" }} variant="danger">Delete</Button>
                      </ButtonGroup>
                    </td>

                  </tr>

                </tbody>
              ))}

            </Table>
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default App;
