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

    function editElem(newData) {
        setElem(newData.map(e => <CardComp id={e.id} editCall={appCallBack} deleteCall={editElem} />))
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainBack}>
                <FilterComp callBack={editElem}/>
                <div className={styles.grid}>
                    {elem}
                </div>
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