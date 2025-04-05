const addService = require("./Service.js")[0];
const getIdService = require("./Service.js")[1];
const getType = require("./Service.js")[2];
const deleteService = require("./Service.js")[3];
const editService = require("./Service.js")[4];
const filterByNameService = require("./Service.js")[5];
const sortByNameService = require("./Service.js")[6];
const sortByPriceService = require("./Service.js")[7];

test('add new data', () => {
        const mockData = [{
            id: 0,
            name: "Macbook Air 13",
            description: "Cel mai tare laptop din lume",
            price: 4500,
            path: 'macbook.jpg'
        }];
    
        addService("name", "description", 1, "path", "brand", 1, "category", mockData);
        
        expect(getIdService(mockData)).toBe(mockData[1].id + 1);
        expect(mockData.length).toBe(2);
        expect(mockData[1].name).toBe("name");
});

test('delete data', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook Air 13",
            description: "Cel mai tare laptop din lume",
            price: 4500,
            path: 'macbook.jpg'
        },
        {
            id: 1,
            name: "Macbook Air 13",
            description: "Cel mai tare laptop din lume",
            price: 4500,
            path: 'macbook.jpg'
        }
    ];
    
    deleteService(1, mockData);
    expect(mockData.length).toBe(1);
    expect(mockData[0].id).toBe(0);
});

test('edit data', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook Air 13",
            brand: "Apple",
            category: "ultrabook",
            description: "Cel mai tare laptop din lume",
            year: 2025,
            price: 4500,
            path: 'macbook.jpg',
        }
        ,
        {
            id: 1,
            name: "ACER Aspire 3",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 1899,
            path: 'acer.jpg',
        }
    ];
    
    editService(1, "name", "description", 1, "path", "brand", "category", 2025, mockData);
    
    expect(mockData.length).toBe(2);
    expect(mockData[1].name).toBe("name");
    expect(mockData[1].price).toBe(1);
    expect(mockData[1].year).toBe(2025);
});

test('get type test', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook Air 13",
            brand: "Apple",
            category: "ultrabook",
            description: "Cel mai tare laptop din lume",
            year: 2025,
            price: 2000,
            path: 'macbook.jpg',
        }
        ,
        {
            id: 1,
            name: "ACER Aspire 3",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 1000,
            path: 'acer.jpg',
        }
        ,
        {
            id: 2,
            name: "ACER Aspire 3",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 3000,
            path: 'acer.jpg',
        }
    ];
    
    expect(getType(1, mockData)).toBe("Most affordable");
    expect(getType(0, mockData)).toBe("Our recommandation");
    expect(getType(2, mockData)).toBe("Most expensive");
});

test('filter by name test', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook 13",
            brand: "Apple",
            category: "ultrabook",
            description: "Cel mai tare laptop din lume",
            year: 2025,
            price: 2000,
            path: 'macbook.jpg',
        }
        ,
        {
            id: 1,
            name: "Acer ",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 1000,
            path: 'acer.jpg',
        }
        ,
        {
            id: 2,
            name: "Lenovo gaming",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 3000,
            path: 'acer.jpg',
        }
    ];
    
    const newData = filterByNameService("a", mockData);
    expect(newData.length).toBe(2);
});

test('sort by price', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook 13",
            brand: "Apple",
            category: "ultrabook",
            description: "Cel mai tare laptop din lume",
            year: 2025,
            price: 2000,
            path: 'macbook.jpg',
        }
        ,
        {
            id: 1,
            name: "Acer ",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 1000,
            path: 'acer.jpg',
        }
        ,
        {
            id: 2,
            name: "Lenovo gaming",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 3000,
            path: 'acer.jpg',
        }
    ];
    
    const newData = sortByPriceService(mockData);
    expect(newData.length).toBe(3);

    expect(newData[0].id).toBe(1);
    expect(newData[1].id).toBe(0);
    expect(newData[2].id).toBe(2);
});

test('sort by name', () => {
    const mockData = [
        {
            id: 0,
            name: "Macbook 13",
            brand: "Apple",
            category: "ultrabook",
            description: "Cel mai tare laptop din lume",
            year: 2025,
            price: 2000,
            path: 'macbook.jpg',
        }
        ,
        {
            id: 1,
            name: "Acer ",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 1000,
            path: 'acer.jpg',
        }
        ,
        {
            id: 2,
            name: "Lenovo gaming",
            brand: "Acer",
            category: "business",
            description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
            year: 2024,
            price: 3000,
            path: 'acer.jpg',
        }
    ];
    
    const newData = sortByNameService(mockData);
    expect(newData.length).toBe(3);

    expect(newData[0].id).toBe(1);
    expect(newData[1].id).toBe(2);
    expect(newData[2].id).toBe(0);
});