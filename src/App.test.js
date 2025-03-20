

test('add new data', () => {
  expect(testAdd()).toBe(true);
});



function testAdd() {
  const mockData = [{
      id: 0,
      name: "Macbook Air 13",
      description: "Cel mai tare laptop din lume",
      price: 4500,
      path: 'macbook.jpg'
  }];

  let id;
  if(mockData.length > 0)
      id = mockData[mockData.length-1].id + 1;
  else 
      id = 0;

  mockData.push({id: id, name: "name", description: "description", price: 100, path: "path"})
  
  if(mockData.length != 2 || mockData[1].name != "name") {
      console.log("aici");
      return false;
  }
  
  return true;
}