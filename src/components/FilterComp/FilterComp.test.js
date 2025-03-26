test('edit component', () => {
    expect(testSearch()).toBe(true);
    expect(testSortPrice()).toBe(true);
    expect(testSortName()).toBe(true);
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
        name: "Lenovo Legion 16",
        brand: "Lenovo",
        category: "gaming",
        description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
        year: 2024,
        price: 1899,
        path: 'acer.jpg',
    }
];

function testSearch() {
    const newData = mockData.filter(elem => elem.name.match("1"));
    if(newData.length !== 2)
        return false;

    if(newData[0].id !== 0)
        return false;

    if(newData[1].id !== 2)
        return false;

    return true;
}

function testSortPrice() {
    const newData = mockData.sort((a, b) => a.price > b.price ? 1 : -1);

    if(newData[0].id !== 2)
        return false;

    if(newData[1].id !== 0)
        return false;

    if(newData[2].id !== 1)
        return false;

    return true;
}

function testSortName() {
    const newData = mockData.sort((a, b) => a.name > b.name ? 1 : -1);

    if(newData[0].id !== 1)
        return false;

    if(newData[1].id !== 2)
        return false;

    if(newData[2].id !== 0)
        return false;

    return true;
}