import CardComp from "../CardComp/CardComp";
import styles from "./ViewComp.module.css";
import FilterComp from "../FilterComp/FilterComp.jsx";

import PieChart from "../Charts/PieChart.js";
import BarChart from "../Charts/BarChart.js";
import LineGraph from "../Charts/LineGraph.js";


import { data  } from "../../data.js";
import { useState, useEffect } from "react";

function ViewComp({appCallBack}) {

    const [elem, setElem] = useState(data.map(e => <CardComp id={e.id} editCall={appCallBack} deleteCall={editElem} />));
    const [currentPage, setPage] = useState(0);

    function editElem(newData) {
        setElem(newData.map(e => <CardComp id={e.id} editCall={appCallBack} deleteCall={editElem} />))
    }

    function updatePage(val) {
        if(val + currentPage < 0)
            return;
        if(val + currentPage > Math.floor(elem.length / 6))
            return;

        setPage(prev => prev + val);
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainBack}>
                <FilterComp callBack={editElem}/>
                <div className={styles.grid}>
                    {elem.slice(currentPage * 6, (currentPage + 1) * 6)}
                </div>
            </div>

            <div className={styles.paginare}>
                <button type="button" onClick={() => updatePage(-1)}>Previous</button>
                <div>{currentPage + 1}</div>
                <button type="button" onClick={() => updatePage(1)}>Next</button>
            </div>

            <div className={styles.charts}>
                <div><PieChart /></div>
                <div><LineGraph /></div>
                <div><BarChart /></div>
            </div>
        </div>
    );

};

export default ViewComp;