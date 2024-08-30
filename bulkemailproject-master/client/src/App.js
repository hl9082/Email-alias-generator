import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState(null);

  const handleCreateEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-email', { firstName, lastName });
      alert('Email created successfully: ' + response.data.email);
    } catch (error) {
      alert('Error creating email: ' + error.message);
    }
  };

  const handleUploadAndCreateEmails = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Emails created from Excel file: ' + response.data.message);
    } catch (error) {
      alert('Failed to create emails from Excel file: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-5 mb-5"><strong>BULK EMAIL APPLICATION</strong></h1>
      </div>
      <div className="main row justify-content-center">
        <form id="student-form" className="row justify-content-center mb-4" autoComplete="off">
          <div className="col-10 col-md-8 mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-control"
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="col-10 col-md-8 mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-control"
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="col-10 col-md-8 mb-3">
            <label htmlFor="excelFile">Upload Excel File</label>
            <input
              className="form-control"
              id="excelFile"
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="col-10 col-md-8">
            <button className="btn btn-success add-btn" onClick={handleCreateEmail}>Create Email</button>
          </div>
          <div className="col-10 col-md-8 mt-3">
            <button className="btn btn-success add-btn" onClick={handleUploadAndCreateEmails}>Upload and Create Emails</button>
          </div>
        </form>
        <div className="col-12 mt-5">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="student-list">
              <tr>
                <td>Dear</td>
                <td>Programmer</td>
                <td>
                  <button className="btn btn-warning btn-sm edit">Edit</button>
                  <button className="btn btn-danger btn-sm delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
