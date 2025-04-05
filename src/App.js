import React, { useEffect, useState } from 'react';

import "./App.css";

import NavBar from './components/NavBar/NavBar.jsx';
import AddComp from './components/AddComp/AddComp.jsx';
import ViewComp from './components/ViewComp/ViewComp.jsx';
import EditComp from './components/EditComp/EditComp.jsx';
import ProductComp from './components/ProductComp/ProductComp.jsx';
import StatusBanner from './components/NetworkStatus/StatusBanner.jsx';

import { useNetworkStatus } from './components/NetworkStatus/useNetworkStatus.js';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Message() {
  const [id, setId] = useState(0);
  const { isOnline, isServerUp } = useNetworkStatus('http://localhost:8080/laptops/ping');

  return(
      <div className='App'> 
          <Toaster/>
          <StatusBanner isOnline={isOnline} isServerUp={isServerUp} />
          <NavBar/>
          <Routes>  
            <Route path='/addProduct' element={<AddComp/>} />
            <Route path='/viewProduct' element={<ViewComp appCallBack={setId} />} />
            <Route path={'/product/'+ id.toString()} element={<ProductComp id={id}/>} />
            <Route path='/editProduct' element={<EditComp id={id} />} />
          </Routes>
      </div>
      
  );
};

export default Message;