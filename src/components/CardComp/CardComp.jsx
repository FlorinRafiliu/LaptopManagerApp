import styles from "./CardComp.module.css"
import Data from "../../repository/repository";

import { Link } from "react-router";
import { deleteOffline } from "../../service/serviceOffline";

const getType = require("../../service/Service")[2];
const deleteService = require("../../service/Service")[3];

function CardComp({ref, isOnline, isServerUp, card, editCall, deleteCall}) {
    //const text = getType(card.id, data);
    const text = "";

    function deleteHandler() {
        if(isOnline && isServerUp) {
            Data().deleteLaptop(card.id)
            .then(response => { if(response.ok) deleteCall("")})
            .catch(error => {
               console.log(error);
            });
        } else {
            deleteOffline(card.id);
            deleteCall("");
        }
    }

    function editHandler() {
        editCall(card.id);
    }

    return (
        <div ref={ref} className={styles.main}>
            <Link className={styles.link} onClick={editHandler} to={"../product/" + card.id.toString()}>
                <img className={styles.image} src={require("../../photos/" + card.path)} alt="My Image" />
                <div>{card.name}</div>
                <div>{card.price} $</div>
                <div className={styles.statistic}>{text}</div>
            </Link>
            <div style={{display: "flex", flexDirection: "row"}}>
                <Link to="/editProduct">
                    <button onClick={editHandler} className={styles.button}>Edit</button>
                </Link>
                <button onClick={deleteHandler} className={styles.button}>Delete</button>
            </div>
        </div>
    );
};

export default CardComp;