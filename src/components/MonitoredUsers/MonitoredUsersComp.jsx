import React, { useEffect } from "react";

import styles from "./MonitoredUsersComp.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Data from "../../repository/repository.js";

import {toast} from "react-hot-toast";

import { addOffline } from "../../service/serviceOffline.js";

const addService = require("../../service/Service.js")[0];

function MonitoredUsers({isOnline, isServerUp}) {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        if(isServerUp && isOnline) {
            fetch("http://localhost:8080/activity")
            .then(response => response.json())
            .then(data => setUsers(data));      
        }
    }, []);

    return (
        <div className={styles.main}>
            <h3>Suspect Users</h3>
            <ol className={styles.list}>
                {users?.map(user => {return (<li>{user}</li>)})}
            </ol>
        </div>
    );
};

export default MonitoredUsers;