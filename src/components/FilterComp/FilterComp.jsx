import { useState } from "react";
import styles from "./FilterComp.module.css";
import {localData} from "../../data";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import LineGraph from "../Charts/LineGraph";
import FileUploadDownload from "../FileUploadDownload/FileUploadDownload";

function FilterComp({callBack}) {

    const [searchValue, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [isInserting, setIsInserting] = useState(false);

    function updateHandler(val) {
        setSearch(val);
        callBack(val);
    }

    function sortNameHandler() {
        callBack("sortedByName");  
    }

    function sortPriceHandler() {
       callBack("sortedByPrice");
    }

    function filterByCategory(category) {
        setCategory(category);
        callBack(category);
    }

    return (
        <form className={styles.filterForm}>
            <label>
                Search <br/>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => updateHandler(e.target.value)} 
                />
            </label>
            <button type="button" onClick={sortNameHandler} className={styles.button}>Filter by name</button>
            <button type="button" onClick={sortPriceHandler} className={styles.button}>Filter by price</button>
            <select value={category} onChange={(e) => filterByCategory(e.target.value)}>
                    <option value="">-</option>
                    <option value="ultrabook">Ultrabook</option>
                    <option value="gaming">Gaming</option>
                    <option value="business">Business</option>
            </select>

            <div className={styles.charts}>
                {/* <div><PieChart /></div> */}
                <FileUploadDownload />
            </div>
        </form>
    );
};

export default FilterComp;
