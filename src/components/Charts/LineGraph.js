import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Tooltip, 
    Legend, 
    Title
} from "chart.js";

import { localData } from "../../data.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function LineGraph() {
    const options = {};

    let mockData = {
        labels: [],
        datasets:[{label: "Nr of units",data: [], borderColor: "rgb(75, 192, 192"},],
    };

    mockData.labels = localData.map(e => e.year)
                          .reduce((ans, elem) => {if(!ans.some(e => e == elem))return [...ans, elem]; return ans}, [])
                          .sort((a, b) => a < b ? -1 : 1);
    mockData.datasets[0].data = new Array(mockData.labels.length).fill(0);

    for(let i = 0; i < localData.length; i++) {
        let item = localData[i];
        const index = mockData.labels.findIndex(e => e == item.year);
        mockData.datasets[0].data[index] += 1;
    }

    return <Line options={options} data={mockData}/>;

};

export default LineGraph;