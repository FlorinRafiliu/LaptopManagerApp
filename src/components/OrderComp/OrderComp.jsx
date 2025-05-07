import React, { useEffect, useState } from "react";

import styles from "./Order.module.css";

import { Link, useNavigate, useParams } from "react-router";
import Data from "../../repository/repository.js";


function OrderComp() {
    const navigate = useNavigate(); 
    const [warehouses, setWarehouses] = useState();
    const [checkedState, setCheckedState] = useState();
    const [product, setProduct] = useState();

    const { laptopId } = useParams();

    useEffect(() => {
        fetch("http://localhost:8080/warehouses")
            .then(response => response.json())
            .then(data => {
                setWarehouses(data);
                console.log(data);
                setCheckedState(new Array(data.length).fill(false));
            })
            .catch(error => console.log(error));

        Data()
            .getLaptopById(laptopId)
            .then(data => setProduct(data))
            .catch(error => console.log(error));
    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    };

    function handleSubmit(e) {
        e.preventDefault();

        checkedState.map(
            (currentState, index) => {
              if (currentState === true) {
                const data = {
                    laptopId : laptopId,
                    warehouseId : warehouses[index].wid
                }
                console.log(data);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                };
                return fetch("http://localhost:8080/warehouse_laptop", requestOptions)
                .catch(error => console.log(error));
              }
            }
          );
        
        navigate("../viewProduct");
    }

    return (
        <div className={styles.main}>
            <form className={styles.addForm} onSubmit={handleSubmit}>
                <h3>Select the locations that require supply</h3>
                <h5>{product?.name}</h5>
                {warehouses?.map((warehouse, index) => {
                    return (
                        <div>
                            <input 
                                type="checkbox" 
                                id={`custom-checkbox-${index}`} 
                                name={warehouse.name} value={warehouse.name}
                                checked={checkedState[index]} 
                                onChange={() => handleOnChange(index)} 
                            />
                            <label htmlFor={`custom-checkbox-${index}`}>{warehouse.name}</label>
                        </div>
                );
                })}

                <div className={styles.buttons}>
                    <Link to="../viewProduct">
                        <button type="button">Back</button>
                    </Link>
                    <button type="submit">Place Order</button>
                </div>
            </form>
        </div>
    );
};

export default OrderComp;