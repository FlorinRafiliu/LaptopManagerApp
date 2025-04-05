import React from "react";

import styles from "./EditComp.module.css"

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import Data from "../../repository/repository.js";
import {toast} from "react-hot-toast";

function EditComp({id}) {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [path, setPath] = useState(null);
    const [brand, setBrand] = useState(null);
    const [year, setYear] = useState(null);
    const [category, setCategory] = useState(null);
    
    useEffect(() => {
        Data().getLaptopById(id).then(item => {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price);
            setPath(item.path);
            setBrand(item.brand);
            setYear(item.year);
            setCategory(item.category);
        });
    }, []);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        Data().editLaptop( id, 
            {
                name: name, 
                description: description, 
                price: price, 
                path: path,
                brand: brand,
                category: category,
                year: year
            }
        ).then(response => {if(response.status === 200) {navigate("../viewProduct"); toast.success("Successful Update")} else {navigate("../viewProduct"); toast.error("Failed Update!")}});
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