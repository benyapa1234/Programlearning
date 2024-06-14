import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import ShowData from '../commponents/ShowData';
import './UploadPage.css';

function InsertPage() {
  const [ExcelFile, setExcelfile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [jsonData, setjsonData] = useState(null);
  const [uploadDone, setUploadDone] = useState(false); // State to track upload status

  //submit state
  const [excelData, setExcelData] = useState(null);

  // State to control the visibility of the "Upload done" message
  const [showUploadMessage, setShowUploadMessage] = useState(false);

  useEffect(() => {
    if (uploadDone) {
      // Show the message for 3 seconds then hide it
      setShowUploadMessage(true);
      setTimeout(() => {
        setShowUploadMessage(false);
      }, 3000);
    }
  }, [uploadDone]);

  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result, { type: 'buffer' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0});
          setjsonData(jsonData);
          console.log(jsonData);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setTypeError('Please select only Excel file types');
        setExcelData(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  const handleUploadButtonClick =() => {
    if (jsonData) {
      fetch('http://localhost:8000/insert', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then(response => response.json())
      .then(data =>{
        console.log('Success:', data);
        setUploadDone(true); // Set upload done status to true
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } else {
      console.error('No data to upload');
    }
  };

  const handleClipboardButtonClick = async () => {
    //ขออนุญาตบราวเซอร์ใช้clipboard
    const permission = await navigator.permissions.query({ name: 'clipboard-read' });
    //ถ้าเป็นgrant&prompt ให้ผ่าน
    if (permission.state ==='granted' || permission.state === 'prompt'){
      const text = await navigator.clipboard.readText();
      const json = convertExcelDataToJson(text); //แปลงจากค่าที่อ่านได้มาเป็นjson
      
      if (json) {
        setjsonData(json);
      }
    }
  };

  const convertExcelDataToJson = (data) => {
    const rows = data.split('\n').filter(row => row.trim() !== '');
    const keys = rows[0].split('\t');
    const jsonArray = rows.slice(1).map(row => {
      const values = row.split('\t');
      const obj = {};
      keys.forEach((key, index) => {
        obj[key.trim()] = values[index].trim();
      });
      return obj;
    });
    return jsonArray;
  };

  return (
    <>
      <h1></h1>
      
      <div className="input-group">
        <input type="file" className="form-control" required onChange={handleFile} id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
        <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleClipboardButtonClick}>Clipboard</button>
        <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={handleUploadButtonClick}>Upload</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </div>

      <div className="table-container">
        {showUploadMessage && <div className="alert alert-success upload-message" role="alert">Upload Done</div>}
        <ShowData data={jsonData}></ShowData>
      </div>
      
    </>
  )
}

export default InsertPage;
