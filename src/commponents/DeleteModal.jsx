import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
 
function DeleteModal({ show, onHide }) {
  // State for each form field
  const [main_plo_id, setMainPloId] = useState('');
  const [sub_plo_id, setSubPloId] = useState('');
  
 
  const handleDelete = () => {
    // Handle the insert operation here (e.g., send data to backend)
   const deleteData = new URLSearchParams({ main_plo_id, sub_plo_id });

    console.log(deleteData);

    fetch(`http://localhost:8000/delete? ${deleteData}`,{
        method:'DELETE'
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data =>{
        
        window.location.reload();
        //close the modal
        onHide();
    })
    .catch(error =>{
        console.error('Error performing delete operation', error);
    });
  };
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Main PLO ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter main plo id"
              value={main_plo_id}
              onChange={(e) => setMainPloId(e.target.value)}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default DeleteModal;