import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
 
function UpdateModal({ show, onHide }) {
  // Search
  const [search_main_plo_id, setSearchMainPloId] = useState('');
  const [search_sub_plo_id, setSearchSubPloId] = useState('');

  const [main_plo_id, setMainPloId] = useState('');
  const [main_plo_name, setMainPloName] = useState('');
  const [sub_plo_id, setSubPloId] = useState('');
  const [sub_plo_name, setSubPloName] = useState('');
  const [plo_detail, setPloDetail] = useState('');

  
  const handleSearch = () => {
   const url = `http://localhost:8000/search?main_plo_id=${search_main_plo_id}&sub_plo_id=${search_sub_plo_id}`;
   
   fetch(url)
   .then(response => {
    if (!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
   })
   .then(data =>{
      const fetchedData = data[0];
      setMainPloId(fetchedData.main_plo_id || '');
      setMainPloName(fetchedData.main_plo_name || '');
      setSubPloId(fetchedData.sub_plo_id || '');
      setSubPloName(fetchedData.sub_plo_name || '');
      setPloDetail(fetchedData.plo_detail || '');
   })
   .catch(error => {
    console.error('Error performing search', error);
   });
  };

  const handleUpdate = () => {
    const url = `http://localhost:8000/update?main_plo_id=${search_main_plo_id}&sub_plo_id=${search_sub_plo_id}`;
    
    const data = {
      main_plo_id,
      main_plo_name,
      sub_plo_id,
      sub_plo_name,
      plo_detail
    };

    fetch (url, {
      method:'PUT',
      headers:{'Content-Type' : 'application/json'},
      body : JSON.stringify(data)
    });

    window.location.reload();
    onHide;
  };
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Search Main PLO ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter main plo id"
              value={search_main_plo_id}
              onChange={(e) => setSearchMainPloId(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Search Sub PLO ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter sub plo id"
              value={search_sub_plo_id}
              onChange={(e) => setSearchSubPloId(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Modal.Footer>
      <hr/>
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
            <Form.Label>Main PLO Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter main plo name"
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
              placeholder="Enter plo details"
              value={plo_detail}
              onChange={(e) => setPloDetail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;