import styles from "./CardComp.module.css"
import { data } from "../../data";
import { Link } from "react-router";

function CardComp({id, editCall, deleteCall}) {

    const name = data[data.findIndex(e => e.id === id)].name;
    const path = data[data.findIndex(e => e.id === id)].path;
    const price = data[data.findIndex(e => e.id === id)].price;

    const text = getType();

    function deleteHandler() {
        data.splice(data.findIndex(e => e.id === id), 1);
        deleteCall(data);
        console.log(data.length);
    }

    function editHandler() {
        editCall(id);
    }

    function getType() {
        let newData = data.slice(0);
        newData = newData.sort((a, b) => a.price < b.price ? -1 : 1);
        if(id === newData[0].id)
            return "Most affordable";
        if(id === newData[newData.length - 1].id)
            return "Most expensive";
        if(id === newData[Math.floor(newData.length / 2)].id)
            return "Our recommandation";
        return "";
    }

    return (
        <div className={styles.main}>
            <Link className={styles.link} onClick={editHandler} to={"../product" + id.toString()}>
                <img className={styles.image} src={require("../../photos/" + path)} alt="My Image" />
                <div>{name}</div>
                <div>{price} $</div>
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