import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Import auto to automatically register the required components
import domainData from '../assets/Data.json';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';



const DomainRecordDistributionChart = () => {
    const [domainData, setDomainData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/domain/get-all-domains`);
            setDomainData(res.data);
        } catch (err) {
            toast.error("Internal Server Error");
            console.error(err);
        }
    };


    const domainNames = domainData.map(domain => domain.name);
    const recordTypes = domainData.map(domain => domain.records.map(record => record.type)).flat();

    const domainCounts = countOccurrences(domainNames);
    const recordTypeCounts = countOccurrences(recordTypes);

    function countOccurrences(array) {
        return array.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
    }

    const domainChartData = {
        labels: Object.keys(domainCounts),
        datasets: [{
            label: 'Domain Distribution',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: Object.values(domainCounts)
        }]
    };

    const recordTypeChartData = {
        labels: Object.keys(recordTypeCounts),
        datasets: [{
            label: 'Record Type Distribution',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: Object.values(recordTypeCounts)
        }]
    };

    return (
        <div className="flex justify-between">
            <div>
                <h2 className="text-lg font-bold mb-4">Domain Distribution</h2>
                <Bar data={domainChartData} />
            </div>
            <div>
                <h2 className="text-lg font-bold mb-4">Record Type Distribution</h2>
                <Bar data={recordTypeChartData} />
            </div>
        </div>
    );
};

export default DomainRecordDistributionChart;
