import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, Tooltip, Legend, ArcElement} from "chart.js";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import Data from "../../repository/repository.js";
import { useEffect, useState } from "react";

ChartJS.register(Tooltip, Legend, ArcElement);

function PieChart() {
    const options = {};

    const [localData, setData] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                client.subscribe('/topic/data', (message) => {
                    const newData = JSON.parse(message.body);
                    setData(prev => [...prev, ...newData]);
                });
            },
        });

        client.activate();
        setStompClient(client);

        return () => client.deactivate();
    }, []);

    useEffect(() => {
        Data().getLaptops().then(data => setData(data));
    }, [])

    let mockData = {
        labels: [],
        datasets:[{label: "Nr of units",data: [],backgroundColor: [],hoverOffset: 4, },],
    };

    const startStream = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/start-stream',
                body: '',
            });
        }
    };

    const stopStream = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/stop-stream',
                body: '',
            });
        }
    };

    // useEffect(() => {
    //     Data().getLaptops().then(data => setLocalData(JSON.parse(JSON.stringify(data))));
    // }, [])

    for(let i = 0; i < localData.length; i++) {
        let item = localData[i];
        const index = mockData.labels.findIndex(e => e === item.brand);
        if(index != -1) {
            mockData.datasets[0].data[index] += 1;
        } else {
            mockData.labels.push(item.brand);
            mockData.datasets[0].data.push(1);
            mockData.datasets[0].backgroundColor.push('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
        }
    }

    return  <>
                <Pie options={options} data={mockData}/>
                <button type="button" onClick={startStream} style={{ marginRight: '10px' }}>
                    ▶️ Start Streaming
                </button>
                <button type="button" onClick={stopStream}>
                    ⏹️ Stop Streaming
                </button>
            </>;

};

export default PieChart;