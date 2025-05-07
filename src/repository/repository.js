const Data = () => ({
    getLaptops: () => {
        return fetch("http://localhost:8080/laptops")
                .then(response => response.json())
                .catch(error => console.log(error));
    },

    getLaptopById: (id) => {
        return fetch(`http://localhost:8080/laptops/${id}`)
                .then(response => response.json())
                .catch(error => console.log(error));
    },

    addLaptop: (data) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , Authorization: `${user.username}`},
            body: JSON.stringify(data)
        };
        return fetch("http://localhost:8080/laptops", requestOptions)
        .catch(error => console.log(error));
    },

    editLaptop: (id, data) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `${user.username}` },
            body: JSON.stringify(data)
        };
        return fetch(`http://localhost:8080/laptops/${id}`, requestOptions)
        .catch(error => console.log(error));
    },

    deleteLaptop: (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `${user.username}` },
        };
        return fetch(`http://localhost:8080/laptops/${id}`, requestOptions)
        .catch(error => console.log(error));
    },

    getLaptopsSortedByPrice:() => {
        return fetch("http://localhost:8080/laptops/sortedByPrice")
        .then(response => response.json())
        .catch(error => console.log(error));
    },
    
    getLaptopsSortedByName:() => {
        return fetch("http://localhost:8080/laptops/sortedByName")
        .then(response => response.json())
        .catch(error => console.log(error));
    },

    getLaptopsFilteredByName:(val) => {
        return fetch(`http://localhost:8080/laptops/filteredByName=${val}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    },

    getLaptopsByCategory:(val) => {
        return fetch(`http://localhost:8080/laptops/filteredByCategory=${val}`)
        .then(response => response.json())
        .catch(error => console.log(error));
    },
});

export default Data;