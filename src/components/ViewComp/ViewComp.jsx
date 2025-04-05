import CardComp from "../CardComp/CardComp";
import styles from "./ViewComp.module.css";
import FilterComp from "../FilterComp/FilterComp.jsx";

import PieChart from "../Charts/PieChart.js";
import BarChart from "../Charts/BarChart.js";
import LineGraph from "../Charts/LineGraph.js";


import { data  } from "../../data.js";
import { useState, useEffect } from "react";
import { getLaptops } from "../../service/ServiceLaptops.js";

import Data from "../../repository/repository.js";

function ViewComp({appCallBack}) {

    // const [elem, setElem] = useState(data.map(e => <CardComp id={e.id} editCall={appCallBack} deleteCall={editElem} />));
    const [elem, setElem] = useState(null);

    const [currentPage, setPage] = useState(0);
    const [paginare, setPaginare] = useState(6);

    const [isInserting, setIsInserting] = useState(false);
    
    useEffect(() => {
        Data().getLaptops().then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
    }, []);

    let insertionInterval;

    function editElem(status) {
        if(status === "sortedByPrice")
            Data().getLaptopsSortedByPrice().then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
        else if(status === "sortedByName")
            Data().getLaptopsSortedByName().then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
        else if(status === "")
            Data().getLaptops().then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
        else if(status === "business" || status === "gaming" || status === "ultrabook")
            Data().getLaptopsByCategory(status).then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
        else 
            Data().getLaptopsFilteredByName(status).then(data => setElem(data.map(e => <CardComp card={e} editCall={appCallBack} deleteCall={editElem} />)));
    }

    function updatePage(val) {
        if(val + currentPage < 0)
            return;
        if(val + currentPage > Math.floor(elem.length / paginare))
            return;

        setPage(prev => prev + val);
    }

    function create(id, name, description, price, path, brand, year, category) {
        data.push({id: id, name: name, description: description, price: price, path: path, brand: brand, year:year, category: category});
        editElem(data);
        return data;
    }

    async function  insertRandomRecord()   {
        const brands = ['Asus', 'Apple', 'New Lenovo', 'HP'];
        const names = ['Lenovo', 'Asus', 'Macbook', 'HP'];
        const paths = ['asus.jpg', 'lenovo.jpg', 'acer.jpg', 'dell.jpg'];
        const categories = ['business', 'gaming', 'ultrabook'];
        const name = names[Math.floor(Math.random() * names.length)];
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const path = paths[Math.floor(Math.random() * paths.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        return create(data[data.length - 1].id + 1, name, "Descrirere", Math.floor(Math.random() * 1000), path, brand, 2024, category);
    }

    function startRandomInsertions() {

        const insertBatch = async () => {
                const promises = [];
                for (let i = 0; i < 3; i++) {
                    promises.push(insertRandomRecord());
                }
            await Promise.all(promises);
        };

        insertionInterval = setInterval(() => {
            insertBatch().catch(err => console.error('Random insertion error:', err));
        }, 5000);
    }

    function stopRandomInsertions() {
        if (insertionInterval) {
            clearInterval(insertionInterval);
            insertionInterval = null;
        }
    }

    const toggleInsertions = () => {
        if (isInserting) {
            stopRandomInsertions();
        } else {
            startRandomInsertions();
        }
        setIsInserting(!isInserting);
    };



    return (
        <div className={styles.main}>
            <div className={styles.mainBack}>
                <FilterComp callBack={editElem}/>
                <div className={styles.grid}>
                    {elem?.slice(currentPage * paginare, (currentPage + 1) * paginare)}
                </div>
            </div>

            <div className={styles.paginare}>
                <button type="button" onClick={() => updatePage(-1)}>Previous</button>
                <div>{currentPage + 1}</div>
                <button type="button" onClick={() => updatePage(1)}>Next</button>
                <select value={paginare} onChange={(e) => setPaginare(e.target.value)}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                </select>
            </div>

            <div className={styles.charts}>
                <div><PieChart /></div>
                <div><LineGraph /></div>
                <div><BarChart /></div>
            </div>
            <button onClick={toggleInsertions}> Click </button>
        </div>
    );

};

export default ViewComp;