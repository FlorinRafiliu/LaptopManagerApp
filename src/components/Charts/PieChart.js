import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from "chart.js";

import { data } from "../../data.js";

ChartJS.register(Tooltip, Legend, ArcElement);

function PieChart() {
    const options = {};

    let mockData = {
        labels: [],
        datasets:[{label: "Nr of units",data: [],backgroundColor: [],hoverOffset: 4, },],
    };

    for(let i = 0; i < data.length; i++) {
        let item = data[i];
        const index = mockData.labels.findIndex(e => e === item.brand);
        if(index != -1) {
            mockData.datasets[0].data[index] += 1;
        } else {
            mockData.labels.push(item.brand);
            mockData.datasets[0].data.push(1);
            mockData.datasets[0].backgroundColor.push('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
        }
    }

    return <Pie options={options} data={mockData}/>;

};

export default PieChart;