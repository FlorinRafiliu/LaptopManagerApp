
import { queueOperation } from "../components/NetworkStatus/LocalQueue";

let localData = [];

function getIdService() {
    if(localData.length == 0)
        return 0;
    return localData.map(e => e.id).reduce((ans, elem) => Math.max(ans, elem)) + 1;
}

export function editOffline(id, name, description, price, path, brand, category, year) {
    localData[localData.findIndex(e => e.id === id)] = {
        id: id,
        name: name, 
        description: description, 
        price: price, 
        path: path,
        brand: brand,
        category: category,
        year: year
    };
    queueOperation({ type: 'edit', payload: 
        { 
            id: id,
            name: name, 
            description: description, 
            price: price, 
            path: path,
            brand: brand,
            category: category,
            year: year 
        } 
    });
}

export function deleteOffline(id) {
    localData.splice(localData.findIndex(e => e.id === id), 1);
    queueOperation({ type: 'delete', payload: { id: id} });
}

export function filterByNameOffline(val) {
    return localData.filter(elem => elem.name.match(val));
}

export function getLaptopByIdOffline(id) {
    return localData.find(e => e.id == id);
}

export function sortByNameOffline() {
    return localData.sort((a, b) => a.name > b.name ? 1 : -1);
}

export function addOffline(data) {
    data.id = getIdService(localData);
    localData.push(data);
    queueOperation({ type: 'create', payload: data });
}

export function getOfflineData() {
    return localData;
}

export function sortByPriceOffline() {
    return localData.sort((a, b) => a.price > b.price ? 1 : -1);
}

export function deepCopy(source) {
    localData = JSON.parse(JSON.stringify(source));
    console.log(localData);
}