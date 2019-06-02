import React, { Component } from 'react'
import { Chart } from './../../node_modules/chart.js/dist/Chart.bundle';
import { Log, LogType } from '../models/Log';
import { User } from '../models/User';

interface Props {
    logs: Log[]
}

interface State {
    logs: Log[]
}

export default class GraphComponent extends Component<Props, State> {
    chartRef: any
    constructor(props) {
        super(props);

        this.chartRef = React.createRef();
    }
    filterByCurrentMonth() {
        const { logs } = this.props;

        const sorted = [];
        logs.map((x: Log) => {
            const date = new Date(x.timestamp);
            const today = new Date();
            if (date.getMonth() == today.getMonth()) {
                //debugger;
                let day = date.getDate();
                if (sorted[day] == undefined) sorted[day] = [];
                sorted[day].push(x);
            }
        })
        return sorted;
    }

    calculatePercentage(logs: Log[]) {
        if (logs.length == 0) return { percentage: 0, total: 0 }

        let start: Date = new Date();
        let end: Date = new Date();

        for (const log of logs) {
            if (log.type === LogType.Start) {
                start = new Date(log.timestamp);
            }
        }

        if (logs[logs.length - 1].type === LogType.End) {
            end = new Date(logs[logs.length - 1].timestamp);
        }

        let total = end.getTime() - start.getTime();
        let pause = 0;

        for (let i = 1; i < logs.length - 1; i += 2) {
            pause += new Date(logs[i + 1].timestamp).getTime() - new Date(logs[i].timestamp).getTime();
        }
        return {
            percentage: pause / total,
            total: total,
            timestamp: `${start.getDate()}-${start.getMonth()}-${start.getUTCFullYear()}`
        };
    }

    renderChart() {
        if (this.chartRef.current) {
            let sortedLogs = this.filterByCurrentMonth();

            console.log(sortedLogs);

            let values = sortedLogs.map(x => this.calculatePercentage(x));

            let totals = values.map(x => x.total / 3600/1000);
            
            let pauses = values.map(x => x.total * x.percentage/ 3600/1000);

            let xAxis = values.map(x=>x.timestamp);

            console.log(values,totals, pauses,xAxis);

            const chart = new Chart(this.chartRef.current, {
                type: 'line',
                data: {
                    labels:[...xAxis],
                    datasets: [{
                        label: 'Total',
                        borderColor:  'rgba(0, 255, 0, 1)',
                        backgroundColor: 'rgba(0, 255, 0, 0.3)',
                        data: [...totals]
                    },{
                        label: 'Pause',
                        borderColor:  'rgba(255, 255, 0, 1)',
                        backgroundColor: 'rgba(255, 255, 0, 0.3)',
                        data: [...pauses]
                    }]
                }
            })
        }

        return null;
    }
    render() {
        return (
            <div>
                <canvas id="chart" ref={this.chartRef} />
                {this.renderChart()}
            </div>
        )
    }
}
