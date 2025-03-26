test('edit component', () => {
    expect(testEdit()).toBe(true);
});

const mockData = [
    {
        id: 0,
        name: "Macbook Air 13",
        brand: "Apple",
        category: "ultrabook",
        description: "Cel mai tare laptop din lume",
        year: 2025,
        price: 3000,
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
        price: 4000,
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
        price: 1899,
        path: 'acer.jpg',
    }
];

function testEdit() {
    mockData[mockData.findIndex(e => e.id === 1)] = {
        id: 3,
        name: "name", 
        description: "description", 
        price: "price", 
        path: "path",
        brand: "brand",
        category: "category",
        year: "year"
    };

    if(mockData[1].id !== 3)
        return false;

    if(mockData[1].name !== "name")
        return false;

    if(mockData[1].description !== "description")
        return false;

    if(mockData[1].price !== "price")
        return false;

    if(mockData[1].path !== "path")
        return false;

    if(mockData[1].brand !== "brand")
        return false;

    if(mockData[1].category !== "category")
        return false;

    if(mockData[1].year !== "year")
        return false;

    return true;

}