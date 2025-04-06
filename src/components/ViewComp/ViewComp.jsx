import CardComp from "../CardComp/CardComp";
import styles from "./ViewComp.module.css";
import FilterComp from "../FilterComp/FilterComp.jsx";

import PieChart from "../Charts/PieChart.js";
import BarChart from "../Charts/BarChart.js";
import LineGraph from "../Charts/LineGraph.js";

import { useRef, useCallback } from "react";
import {  localData  } from "../../data.js";
import { useState, useEffect } from "react";
import { getLaptops } from "../../service/ServiceLaptops.js";
import useLaptopSearch from "../InfiniteScroll/useLaptopSearch.js";

import Data from "../../repository/repository.js";
import { deepCopy, filterByNameOffline, getOfflineData, sortByNameOffline, sortByPriceOffline } from "../../service/serviceOffline.js";

function ViewComp({isOnline, isServerUp, appCallBack}) {
    
    const [pageNumber, setPageNumber] = useState(1)
    const [query, setQuery] = useState("");
    const [queryId, setQueryId] = useState(0);

    const {
        laptops,
        loading,
        setLoading,
        setLaptops
    } = useLaptopSearch(pageNumber, query, queryId);

    const observer = useRef();
    const lastBookElementRef = useCallback(node => {
        if (loading) return;
        if(!(isOnline && isServerUp)) return;

        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            setLoading(true);
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            console.log(pageNumber);    
          }
        })
        if (node) {
            observer.current.observe(node);
        }
      })

    useEffect(() => {
        if(!(isOnline && isServerUp)) {
            console.log("aici");
            setLaptops(JSON.parse(JSON.stringify(getOfflineData())));
        }
    }, [isOnline, isServerUp]);

    function editElem(status) {
        if(isOnline && isServerUp) {
            setPageNumber(1);
            setQuery(status);
            setQueryId(prev => prev + 1);
        } else {
            if(status === "sortedByPrice") {
                setLaptops(JSON.parse(JSON.stringify(sortByPriceOffline()))); 
            }else if(status === "sortedByName") {
                setLaptops(JSON.parse(JSON.stringify(sortByNameOffline())));
            } else if(status === "") {
                setLaptops(JSON.parse(JSON.stringify(getOfflineData())));
            } else if(status === "business" || status === "gaming" || status === "ultrabook") {
                setLaptops(JSON.parse(JSON.stringify(getOfflineData())));
            } else {
                setLaptops(JSON.parse(JSON.stringify(filterByNameOffline(status))));
            }
        }
    }

    // function editElem(status) {
    //     if(status === "sortedByPrice") {
    //         if(isOnline && isServerUp) {
    //             Data().getLaptopsSortedByPrice().then(data => {
    //                 setElem(data.map(e => <CardComp isOnline={isOnline} isServerUp={isServerUp}  card={e} editCall={appCallBack} deleteCall={editElem} />));
    //                 deepCopy(data, localData);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //         } else {
    //             setLaptops(JSON.parse(JSON.stringify(sortByPriceOffline())));
    //         }
    //     }
    //     else if(status === "sortedByName") {
    //         if(isOnline && isServerUp) {
    //             Data().getLaptopsSortedByName().then(data => {
    //                 setElem(data.map(e => <CardComp isOnline={isOnline} isServerUp={isServerUp}  card={e} editCall={appCallBack} deleteCall={editElem} />));
    //                 deepCopy(data, localData);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //         } else {
    //             setLaptops(JSON.parse(JSON.stringify(sortByNameOffline())));
    //         }
    //     } else if(status === "") {
    //         if(isOnline && isServerUp) {
    //             Data().getLaptops().then(data => {
    //                 setElem(data.map(e => <CardComp isOnline={isOnline} isServerUp={isServerUp}  card={e} editCall={appCallBack} deleteCall={editElem} />));
    //                 deepCopy(data);
    //                 console.log(data);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //         } else {
    //             setLaptops(JSON.parse(JSON.stringify(getOfflineData())));
    //         }
    //     } else if(status === "business" || status === "gaming" || status === "ultrabook") {
    //         if(isOnline && isServerUp) {
    //             Data().getLaptops().then(data => {
    //                 setElem(data.map(e => <CardComp isOnline={isOnline} isServerUp={isServerUp}  card={e} editCall={appCallBack} deleteCall={editElem} />));
    //                 deepCopy(data);
    //                 console.log(data);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //         } else {
    //             console.log("aici");
    //             setLaptops(JSON.parse(JSON.stringify(getOfflineData())));
    //         }
    //     } else {
    //         if(isOnline && isServerUp) {
    //             Data().getLaptopsFilteredByName(status).then(data => {
    //                 setElem(data.map(e => <CardComp isOnline={isOnline} isServerUp={isServerUp}  card={e} editCall={appCallBack} deleteCall={editElem} />));
    //                 deepCopy(data);
    //                 console.log(data);
    //             }).catch(error => {
    //                 console.log(error);
    //             });
    //         } else {
    //             setLaptops(JSON.parse(JSON.stringify(filterByNameOffline(status))));
    //         }
    //     }
    // }

    return (
        <div className={styles.main}>
            <div className={styles.mainBack}>
                <FilterComp callBack={editElem}/>
                <div className={styles.grid}>
                    {
                        laptops.map((e, index) => {
                            if(laptops.length == index + 1) {
                                return <CardComp ref={lastBookElementRef} isOnline={isOnline} isServerUp={isServerUp} card={e} editCall={appCallBack} deleteCall={editElem} />
                            } else {
                                return <CardComp isOnline={isOnline} isServerUp={isServerUp} card={e} editCall={appCallBack} deleteCall={editElem} />
                            }
                        })
                    }
                </div>
            </div>

            {/* <div className={styles.paginare}>
                <button type="button" onClick={() => updatePage(-1)}>Previous</button>
                <div>{currentPage + 1}</div>
                <button type="button" onClick={() => updatePage(1)}>Next</button>
                <select value={paginare} onChange={(e) => setPaginare(e.target.value)}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                </select>
            </div> */}
        </div>
    );

};

export default ViewComp;