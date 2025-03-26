test('card component', () => {
    expect(testGetType()).toBe(true);
    expect(testDelete()).toBe(true);
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

function testDelete() {
    let id = mockData[1].id;
    if(mockData.findIndex(e => e.id === id) != 1)
        return false;
    
    
    let card = mockData[1];
    let length = mockData.length;

    mockData.splice(1, 1);

    if(length - 1 !== mockData.length)
        return false;

    for(let i = 0; i < mockData.length; i++)
        if(mockData[i] == card)
            return false;

    return true;
}

function testGetType() {
    let newData = mockData.slice(0);
    newData = newData.sort((a, b) => a.price < b.price ? -1 : 1);
    
    if(2 != newData[0].id)
        return false;

    if(1 != newData[newData.length - 1].id)
        return false;

    if(0 != newData[Math.floor(newData.length / 2)].id)
        return false;

    return true;
}