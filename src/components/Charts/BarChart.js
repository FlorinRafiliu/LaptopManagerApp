import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Tooltip, 
    Legend, 
    Title
} from "chart.js";

import { data } from "../../data.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function BarChart() {
    const options = {};

    let mockData = {
        labels: [],
        datasets:[{
            label: "Category",
            data: [], 
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
            ],
            backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 206, 86, 0.4)",
            ]
        
        },],
    };

    mockData.labels = data.map(e => e.category)
                          .reduce((ans, elem) => {if(!ans.some(e => e == elem))return [...ans, elem]; return ans}, [])

    mockData.datasets[0].data = new Array(mockData.labels.length).fill(0);

    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        const index = mockData.labels.findIndex(e => e == item.category);
        mockData.datasets[0].data[index] += 1;
    }

    return <Bar options={options} data={mockData}/>;

};

export default BarChart;