import React, { use } from "react";
import { Link, useNavigate } from "react-router";

import { useState } from "react";
import {toast} from "react-hot-toast";
import styles from "./RegisterComp.module.css";

function RegisterComp({setLogged, isServerUp, isOnline}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault();

        if(isServerUp && isOnline) {
            const user = {
                username : username,
                password : password,
                role : role
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            fetch("http://localhost:8080/users/register", requestOptions)
            .then(response => { 
                if(response.status === 200) {
                    navigate("../login"); 
                    toast.success("Account created!")
                } else {
                    toast.error("Error!")
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    function backToLogin() {
        navigate("../login");
    }

    return (
        <div className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.labelForm} htmlFor="username">Username:</label>
                <input 
                    className={styles.input} 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <label className={styles.labelForm} htmlFor="password">Password:</label>
                <input 
                    className={styles.input} 
                    type="password" 
                    d="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label className={styles.labelForm}>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">-</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </label>
                <div>
                    <button className={styles.button} type="button" onClick={backToLogin}>Back</button>
                    <button className={styles.button} type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterComp;