import React, { useEffect, useState } from 'react';
import InsertModal from '../commponents/InsertModal';
import SearchModal from '../commponents/SearchModal';
import UpdateModal from '../commponents/UpdateModal';
import DeleteModal from '../commponents/DeleteModal';
import ShowData from '../commponents/ShowData';
import 'bootstrap/dist/css/bootstrap.min.css';

function Update() {
    const [data, setData] = useState([]);
  const [showInsert, setShowInsert] = useState(false); // State to control modal visibility
  const [showSearch, setShowSearch] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const fetchJsonData = async(URL) =>{
    try {
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error('Network response not ok');
        }
        return await response.json();
    } catch(error){
        console.error('There was a problem with the fetch operation:',error);
    }
  };

  const handleSearch = (Results) => {
    setData(Results);
  }

  useEffect(() => {

    fetchJsonData('http://localhost:8000/getdata').then((data) => {
        setData(data);
        console.log('fetch json data: complete');
        console.log(data);
    });
  }, []);
  
    
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setShowInsert(true)}>INSERT</button>
      <button type="button" className="btn btn-secondary" onClick={() => setShowSearch(true)}>SEARCH</button>
      <button type="button" className="btn btn-success" onClick={() => setShowUpdate(true)} >Update</button>
      <button type="button" className="btn btn-danger" onClick={() => setShowDelete(true)}>DELETE</button>

      <ShowData data={data}></ShowData>

        <InsertModal show={showInsert} onHide={() => setShowInsert(false)} />
        <SearchModal show={showSearch} onHide={() => setShowSearch(false)} onSearch={handleSearch}/>
        <UpdateModal show={showUpdate} onHide={() => setShowUpdate(false)} />
        <DeleteModal show={showDelete} onHide={() => setShowDelete(false)} />
    </div>
  );
}

export default Update;
