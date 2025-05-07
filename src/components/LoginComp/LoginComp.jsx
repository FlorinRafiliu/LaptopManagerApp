import React, { use } from "react";
import { Link, useNavigate } from "react-router";

import { useState } from "react";
import {toast} from "react-hot-toast";
import styles from "./LoginComp.module.css";

function LoginComp({setLogged, isServerUp, isOnline}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
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

            const response = await fetch("http://localhost:8080/users/login", requestOptions);
            if(response.status === 200) {
                setLogged(true);
                const userData = await response.json();
                localStorage.setItem("user", JSON.stringify(userData));                    
                navigate("../viewProduct"); 
                toast.success("Successfully logged!")
            }
            else {
                toast.error("Invalid username or password!")
            }
        }
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

                {/* <label className={styles.labelForm}>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">-</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </label> */}
                
                <Link to="../register" className={styles.register}>
                    Create a new account!
                </Link>
                
                <button className={styles.button} type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginComp;