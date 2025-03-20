import { useState } from "react";
import styles from "./FilterComp.module.css";
import { data } from "../../data";

function FilterComp({callBack}) {

    const [searchValue, setSearch] = useState("");

    function updateHandler(val) {
        setSearch(val)
        const newData = data.filter(elem => elem.name.match(val));
        callBack(newData);
    }

    function sortNameHandler() {
        const newData = data.sort((a, b) => a.name > b.name ? 1 : -1);
        callBack(newData);  
    }

    function sortPriceHandler() {
        const newData = data.sort((a, b) => a.price > b.price ? 1 : -1);
        callBack(newData);  
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
        </form>
    );
};

export default FilterComp;
