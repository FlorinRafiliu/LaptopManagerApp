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
    const [brand, setBrand] = useState("");
    const [year, setYear] = useState();
    const [category, setCategory] = useState("");

    const navigate = useNavigate(); 

    function handleSubmit(e) {
        e.preventDefault();

        let id = data.map(e => e.id).reduce((ans, elem) => Math.max(ans, elem)) + 1;

        data.push({id: id, name: name, description: description, price: price, path: path, brand: brand, year:year, category: category});

        navigate("../viewProduct");

        console.log(id);
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
                    Brand
                    <input 
                        type="text"
                        value={brand}
                        pattern="^[A-Za-z0-9\-\ ]{5,20}"
                        required
                        onChange={(e) => setBrand(e.target.value)}/>
                </label>

                <label className={styles.labelForm}>
                    Category
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">-</option>
                        <option value="ultrabook">Ultrabook</option>
                        <option value="gaming">Gaming</option>
                        <option value="business">Business</option>
                    </select>
                </label>

                <label className={styles.labelForm}>
                    Year
                    <input type="numeric"
                        value={year}
                        required
                        pattern="[0-9]*"
                        onChange={(e) => setYear(e.target.value)}    
                    />
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