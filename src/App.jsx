import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InsertPage from './pages/UploadPage'
import Navbar from './commponents/Navbar'
import LoginPage  from './pages/Login'
import {GoogleOAuthProvider} from '@react-oauth/google';
import Update from './pages/Udq'

function App() {
  return (
    <GoogleOAuthProvider clientId="297415472715-v5vv7rsudmj5td2h79s5ddbip6d6quvv.apps.googleusercontent.com">
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/insert" element={<InsertPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/up" element={<Update />} />

        
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );


    }


export default App
