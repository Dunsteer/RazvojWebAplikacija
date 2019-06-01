import React, { Component } from 'react'
import { Log, LogType } from '../models/Log';
import moment from 'moment';

interface Props {
  logs: Log[]
}

export default class ActivityComponent extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  filterForToday() {
    return this.props.logs.filter((log) => {
      let res = true;
      res = res && new Date(log.timestamp).getDay() === new Date().getDay();
      res = res && new Date(log.timestamp).getMonth() === new Date().getMonth();
      return res;
    })
  }

  calculateTodayPercentage() {
    const todayLog = this.filterForToday();
    if (todayLog.length == 0) return { percentage: 0, total: 0 }

    let start: Date = new Date();
    let end: Date = new Date();

    for (const log of todayLog) {
      if (log.type === LogType.Start) {
        start = new Date(log.timestamp);
      }
    }

    if (todayLog[todayLog.length - 1].type === LogType.End) {
      end = new Date(todayLog[todayLog.length - 1].timestamp);
    }

    let total = end.getTime() - start.getTime();
    let pause = 0;

    for (let i = 1; i < todayLog.length - 1; i += 2) {
      pause += new Date(todayLog[i + 1].timestamp).getTime() - new Date(todayLog[i].timestamp).getTime();
    }
    return {
      percentage: pause / total,
      total: total
    };
  }
  displayTime(ticksInMs: any) {
    var ticks = ticksInMs / 1000;
    var hh = Math.floor(ticks / 3600);
    var mm = Math.floor((ticks % 3600) / 60);
    var ss = ticks % 60;

    let format = `${hh}:${mm}:${ss}`;

    return format.split('.').shift();
  }

  renderLogs() {
    if (this.props.logs.length > 0) {
      let percentage = this.calculateTodayPercentage();

      let style = {
        backgroundColor: "green",
        display: "flex",
        alignItems: "flex-end",
        height: "25px"
      }
      let innerStyle = {
        backgroundColor: "yellow",
        flexGrow: percentage.percentage,
        height: "100%"
      }
      return (
        <div>
          <div style={style}>
            <div style={innerStyle}></div>
          </div>
          {this.displayTime(percentage.total)}
        </div>
      )
    }
    return null;
  }

  render() {
    return this.renderLogs();
  }
}


