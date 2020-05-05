import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const Chart = ({ close, graphData, countryName }) => {

    return (
        <div>
            <button onClick={close}>close</button>
            <ResponsiveContainer width='100%' height={450}>
                <LineChart width='100%' height={400} data={graphData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
                    <Line type="monotone" dataKey="confirmed" dot={false} stroke="red" />
                    <Line type="monotone" dataKey="deaths" dot={false} stroke="black" />
                    <Line type="monotone" dataKey="recovered" dot={false} stroke="green" />
                    <XAxis dataKey="date">
                        <Label value={countryName} offset={350} position="top" />
                    </XAxis>
                    <YAxis />
                    <Legend />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;
