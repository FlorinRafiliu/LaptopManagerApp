import React from "react";

import styles from "./ProductComp.module.css"

import {data} from "../../data.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function ProductComp({ id }) {

    const navigate = useNavigate();
    const product = data[data.findIndex(e => e.id === id)];

    return (
        <div className={styles.main}>
            <div className={styles.product}>
                <div className={styles.left}>
                    <img className={styles.image} src={require("../../photos/" + product.path)} alt="My image"/>
                    {product.name} 
                </div>
                <hr/>
                <div className={styles.right}>
                    <div className={styles.text} >Description: {product.description}</div>
                    <div className={styles.text} >Price: {product.price}</div>
                    <Link to="/viewProduct">
                        <button className={styles.button} type="button">Back</button>
                    </Link>
                </div>
            </div>  
        </div>
    );
};

export default ProductComp;