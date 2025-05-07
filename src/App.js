import React, { useEffect, useState } from 'react';

import "./App.css";

import NavBar from './components/NavBar/NavBar.jsx';
import AddComp from './components/AddComp/AddComp.jsx';
import ViewComp from './components/ViewComp/ViewComp.jsx';
import EditComp from './components/EditComp/EditComp.jsx';
import ProductComp from './components/ProductComp/ProductComp.jsx';
import StatusBanner from './components/NetworkStatus/StatusBanner.jsx';

import { syncQueueWithServer } from './components/NetworkStatus/LocalQueue.js';
import { useNetworkStatus } from './components/NetworkStatus/useNetworkStatus.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import OrderComp from './components/OrderComp/OrderComp.jsx';
import LoginComp from './components/LoginComp/LoginComp.jsx';
import RegisterComp from './components/RegisterComp/RegisterComp.jsx';
import MonitoredUsers from './components/MonitoredUsers/MonitoredUsersComp.jsx';

function Message() {
  const [id, setId] = useState(0);
  // const { isOnline, isServerUp } = useNetworkStatus('http://localhost:8080/laptops/ping');
  const { isOnline, isServerUp } = useNetworkStatus('http://localhost:8080/laptops/ping');
  const [ isLogged, setLogged ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOnline && isServerUp) {
      syncQueueWithServer();
    }
  }, [isOnline, isServerUp]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || null);
    if(user === null) {
      navigate("./login");
    } else {
      navigate("./viewProduct");
    }
  }, []);

  return(
      <div className='App'> 
          <Toaster/>
          <StatusBanner isOnline={isOnline} isServerUp={isServerUp} />
          <NavBar/>
          <Routes>  
            <Route path='/addProduct' element={<AddComp isOnline={isOnline} isServerUp={isServerUp} />} />
            <Route path='/viewProduct' element={<ViewComp isOnline={isOnline} isServerUp={isServerUp} appCallBack={setId} />} />
            <Route path={'/order/:laptopId'} element={<OrderComp/>} />
            <Route path={'/product/'+ id.toString()} element={<ProductComp id={id} isOnline={isOnline} isServerUp={isServerUp}/>} />
            <Route path='/editProduct' element={<EditComp id={id} />} />
            <Route path='/login' element={<LoginComp setLogged={setLogged} isOnline={isOnline} isServerUp={isServerUp} />} />
            <Route path='/register' element={<RegisterComp setLogged={setLogged} isOnline={isOnline} isServerUp={isServerUp} />} />
            <Route path='/monitoredUsers' element={<MonitoredUsers isOnline={isOnline} isServerUp={isServerUp} />} />
          </Routes>
      </div> 
      
  );
};

export default Message;