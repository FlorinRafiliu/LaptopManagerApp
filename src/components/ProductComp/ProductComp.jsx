import React, { useEffect } from "react";

import styles from "./ProductComp.module.css"

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Data from "../../repository/repository.js";
import { getLaptopByIdOffline } from "../../service/serviceOffline.js";

function ProductComp({ id, isOnline, isServerUp }) {

    const [product, setProduct] = useState({path : "asus.jpg"});

    useEffect(() => {
        if(isOnline && isServerUp)
            Data().getLaptopById(id).then(data => setProduct(data));
        else {
            setProduct(getLaptopByIdOffline(id));
        }
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