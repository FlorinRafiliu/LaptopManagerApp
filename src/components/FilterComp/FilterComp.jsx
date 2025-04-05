import { useState } from "react";
import styles from "./FilterComp.module.css";
import { data } from "../../data";

const filterByNameService = require("../../service/Service")[5];
const sortByNameService = require("../../service/Service")[6];
const sortByPriceService = require("../../service/Service")[7];

function FilterComp({callBack}) {

    const [searchValue, setSearch] = useState("");
    const [category, setCategory] = useState("");

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
                Search
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
        </form>
    );
};

export default FilterComp;
