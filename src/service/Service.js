
function getIdService(data) {
    return data.map(e => e.id).reduce((ans, elem) => Math.max(ans, elem)) + 1;
}

function addService(name, description, price, path, brand, year, category, data) {
    let id = getIdService(data);
    data.push({id: id, name: name, description: description, price: price, path: path, brand: brand, year:year, category: category});
}

function getType(id, data) {
    let newData = data.slice(0);
    newData = newData.sort((a, b) => a.price < b.price ? -1 : 1);
    for(let i = 0; i < newData.length; i++) {
        if(id === newData[i].id && i < Math.floor(newData.length / 3))
            return "Most affordable";
        if(id === newData[i].id && i < 2 * Math.floor(newData.length / 3))
            return "Our recommandation";
        if(id === newData[i].id && i < newData.length)
            return "Most expensive";
    }
}

function deleteService(id, data) {
    data.splice(data.findIndex(e => e.id === id), 1);
}

function editService(id, name, description, price, path, brand, category, year, data) {
    data[data.findIndex(e => e.id === id)] = {
        id: id,
        name: name, 
        description: description, 
        price: price, 
        path: path,
        brand: brand,
        category: category,
        year: year
    };
}

function filterByNameService(val, data) {
    return data.filter(elem => elem.name.match(val));
}

function sortByNameService(data) {
    return data.sort((a, b) => a.name > b.name ? 1 : -1);
}
function sortByPriceService(data) {
    return data.sort((a, b) => a.price > b.price ? 1 : -1);
}

module.exports = [addService, getIdService, getType, deleteService, editService, filterByNameService, sortByNameService, sortByPriceService];    