import React, { useEffect } from "react";

import styles from "./ProductComp.module.css"

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Data from "../../repository/repository.js";

function ProductComp({ id }) {

    const [product, setProduct] = useState({path : "asus.jpg"});

    useEffect(() => {
        Data().getLaptopById(id).then(data => setProduct(data));
    });

    return (
        <div className={styles.main}>
            <div className={styles.product}>
                <div className={styles.left}>
                    <img className={styles.image} src={require("../../photos/" + product?.path)} alt="My image"/>
                    {product?.name} 
                </div>
                <hr/>
                <div className={styles.right}>
                    <div className={styles.text} >Description: {product?.description}</div>
                    <div className={styles.text} >Brand: {product?.brand}</div>
                    <div className={styles.text} >Category: {product?.category}</div>
                    <div className={styles.text} >Year: {product?.year}</div>
                    <div className={styles.text} >Price: {product?.price}</div>

                    <Link to="/viewProduct">
                        <button className={styles.button} type="button">Back</button>
                    </Link>
                </div>
            </div>  
        </div>
    );
};

export default ProductComp;