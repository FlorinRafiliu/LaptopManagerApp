import React, { useEffect, useState } from 'react';

import "./App.css";

import NavBar from './components/NavBar/NavBar.jsx';
import AddComp from './components/AddComp/AddComp.jsx';
import ViewComp from './components/ViewComp/ViewComp.jsx';
import EditComp from './components/EditComp/EditComp.jsx';
import ProductComp from './components/ProductComp/ProductComp.jsx';

import { Route, Routes } from 'react-router-dom';

function Message(){
  // const [message, setMessage] = useState([]);
 
  // useEffect(() => {
  //   fetch('http://localhost:8080')
  //     .then(response => response.json())
  //     .then(data => setMessage(data))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);
 
  const [id, setId] = useState(0);

  return(
      <div className='App'>
          <NavBar/>
          <Routes>  
            <Route path='/addProduct' element={<AddComp/>} />
            <Route path='/viewProduct' element={<ViewComp appCallBack={setId} />} />
            <Route path={'/product'+ id.toString()} element={<ProductComp id={id}/>} />
            <Route path='/editProduct' element={<EditComp id={id} />} />
          </Routes>
      </div>
  );
};

export default Message;