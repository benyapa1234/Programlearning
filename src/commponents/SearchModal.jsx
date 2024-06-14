import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
 
function SearchModal({ show, onHide, onSearch }) {
  // State for each form field
  const [main_plo_id, setMainPloId] = useState('');
  const [sub_plo_id, setSubPloId] = useState('');

 //ถ้าข้อมูลไม่ครบจะ search ไม่ได้
  const isFormValid = main_plo_id.trim() !== '' && sub_plo_id.trim()!=='';
 
  const handleSearch = () => {
    // Handle the insert operation here (e.g., send data to backend)
    const searchData = new URLSearchParams({main_plo_id,sub_plo_id}).toString();
    
    console.log(searchData);

    fetch(`http://localhost:8000/search? ${searchData}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    })
    .then(data =>{
        onSearch(data); //Pass search results to the callback
         // Close the modal
        onHide; 
    })
    .catch(error =>{
        console.error('Error performing search', error)
    });
  };
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Search Data</Modal.Title>
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
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default SearchModal;