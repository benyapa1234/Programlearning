import React from 'react';
 
const ShowData = ({ data }) => {
  // For no data
  if (!data || data.length === 0) {
    return (
      <p>No data available.</p>
    );
  }
 
  // Get all unique keys from the data
  const allKeys = Array.from(new Set(data.flatMap(row => Object.keys(row))));
 
  return (
    <div id="table-container">
      <table className="table table-bordered">
        {/* Header section */}
        <thead>
          <tr>
            {allKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
 
        {/* Body section */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {allKeys.map((key, i) => (
                <td key={i}>{row[key] !== undefined ? row[key] : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default ShowData;