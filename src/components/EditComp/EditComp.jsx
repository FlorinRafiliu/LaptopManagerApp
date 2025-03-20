import React from "react";

import styles from "./EditComp.module.css"

import {data} from "../../data.js";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

function EditComp({id}) {

    const [name, setName] = useState(data[data.findIndex(e => e.id === id)].name);
    const [description, setDescription] = useState(data[data.findIndex(e => e.id === id)].description);
    const [price, setPrice] = useState(data[data.findIndex(e => e.id === id)].price);
    const [path, setPath] = useState(data[data.findIndex(e => e.id === id)].path);
    
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        data[data.findIndex(e => e.id === id)] = {
            id: id,
            name: name, 
            description: description, 
            price: price, 
            path: path
        };

        navigate("../../viewProduct");

        console.log(name);
        console.log(price);
        console.log(description);
    }

    return (
        <div className={styles.main}>
            <form className={styles.addForm} onSubmit={handleSubmit}>
            <label className={styles.labelForm}>
                    Product name
                    <input 
                        type="text"
                        value={name}
                        pattern="^[A-Za-z0-9\-\ ]{5,20}"
                        required
                        onChange={(e) => setName(e.target.value)}/>
                </label>

                <label className={styles.labelForm}>
                    Description
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </label>

                <label className={styles.labelForm}>
                    Price
                    <input type="numeric"
                        value={price}
                        required
                        pattern="[0-9]*"
                        onChange={(e) => setPrice(e.target.value)}    
                    />
                </label>

                <label htmlFor="item" className={styles.fileInput}>
                    <div>
                        <div className={styles.button}>Attach</div>
                        <input type="text" readOnly value={path} className={styles.bar}/>
                    </div>
                </label>
                
                <input 
                    id="item" 
                    type="file" 
                    onChange={(e) => setPath(e.target.files[0].name)}
                    hidden/>
                <div className={styles.buttons}>
                    <Link to="/viewProduct">
                        <button type="button">Cancel</button>
                    </Link>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditComp;