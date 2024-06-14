import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
 
function InsertModal({ show, onHide }) {
  // State for each form field
  const [main_plo_id, setMainPloId] = useState('');
  const [main_plo_name, setMainPloName] = useState('');
  const [sub_plo_id, setSubPloId] = useState('');
  const [sub_plo_name, setSubPloName] = useState('');
  const [plo_detail, setPloDetail] = useState('');
  
 
  const handleInsert = () => {
    // Handle the insert operation here (e.g., send data to backend)
    const data ={
      main_plo_id,
      main_plo_name,
      sub_plo_id,
      sub_plo_name,
      plo_detail,
    };

    if(data){
        fetch('http://localhost:8000/insert',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify([data]),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error =>{
            console.error('Error:',error);
        });
    } else {
        console.error('No data to upload');
    }
        window.location.reload();
   
    // Close the modal
    onHide();
  };
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Insert Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>PLO ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter plo id"
              value={main_plo_id}
              onChange={(e) => setMainPloId(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PLO Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter plo name"
              value={main_plo_name}
              onChange={(e) => setMainPloName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sub PLO ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sub plo id"
              value={sub_plo_id}
              onChange={(e) => setSubPloId(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sub PLO Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sub plo name"
              value={sub_plo_name}
              onChange={(e) => setSubPloName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter details"
              value={plo_detail}
              onChange={(e) => setPloDetail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleInsert}>Insert</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default InsertModal;