import React from "react";

import styles from "./AddComp.module.css";

import {data} from "../../data.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function AddComp() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [path, setPath] = useState("No file chosen!");

    const navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault();

        let id;
        if(data.length > 0)
            id = data[data.length-1].id + 1;
        else 
            id = 0;

        data.push({id: id, name: name, description: description, price: price, path: path});

        navigate("../viewProduct");

        console.log(name);
        console.log(price);
        console.log(description);
        console.log(path);
    }

    // function getTag() {
    //     let minId = data.findIndex(e => e.tag === -1);
    //     let maxId = data.findIndex(e => e.tag === 1);

    //     if(price < data[minId].price) {
    //         data[minId].tag = null;
    //         return -1;
    //     }
    //     if(price >   data[maxId].price) {
    //         data[maxId].tag = null;
    //         return 1;
    //     }

    //     return 0;
    // }

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
                    required
                    hidden/>
                <div className={styles.buttons}>
                    <Link to="/viewProduct">
                        <button type="button">Cancel</button>
                    </Link>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddComp;