/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  margin: 10px;
`;

export default function Insight(props) {
  // const availability = roundOff(100 * getAvailability());
  // const performance = roundOff(100 * getPerformance());
  // const quality = roundOff(100 * getQuality());

  const getInsight = () => {
    const availability = props.availability;
    const performance = props.performance;
    const quality = props.quality;
    const oee = props.oee;

    let a = '',
      b = '';

    if (oee > 85) {
      a = <p>Congrats! You have a world class OEE</p>;
    } else if (oee > 60) {
      a = (
        <p>
          You have an average OEE and there is a scope of improvement to outperform over your
          competitors
        </p>
      );
    } else {
      a = (
        <p>
          You have a very low OEE and requires a considerable improvement in processes and
          infrastructure
        </p>
      );
    }
    if (availability < performance && availability < quality) {
      b = (
        <>
          <p>
            You should reduce your unplanned downtime to increase your OEE. You can look at measures
            like:
          </p>
          <ul>
            <li>
              <p>Better operator training</p>
            </li>
            <li>
              <p>Better process visibility and planning</p>
            </li>
            <li>
              <p>Preventive maintenance and regular audits</p>
            </li>
            <li>
              <p>Software and hardware upgrades</p>
            </li>
          </ul>
        </>
      );
    } else if (performance < availability && performance < quality) {
      b = (
        <>
          <p>Your production rate is low either due to:</p>
          <ul>
            <li>
              <p>High change over times</p>
            </li>
            <li>
              <p>Machines under performaning</p>
            </li>
            <li>
              <p>Unskilled operators</p>
            </li>
            <li>
              <p>High idling of machines or operators</p>
            </li>
            <li>
              <p>A better capacity utilisation will result in higher OEE.</p>
            </li>
          </ul>
        </>
      );
    } else {
      b = (
        <>
          <p>
            Your finished goods rejection rate is high resulting into low net output. You should
            setup better QA measures and perform QA audits at:
          </p>
          <ul>
            <li>
              <p>Raw materials received from suppliers</p>
            </li>
            <li>
              <p>Machine maintenance and utilisation</p>
            </li>
            <li>
              <p>End-to-end procedures, planning and cross-functional transactions</p>
            </li>
            <li>
              <p>Environmental controls</p>
            </li>
          </ul>
        </>
      );
    }

    return (
      <>
        <h2>Insights</h2>
        <div>
          <ol type="a">
            <li>{a}</li>
            <li>{b}</li>
          </ol>
        </div>
      </>
    );
  };

  return <Wrapper>{props.getClicked && <>{getInsight()}</>}</Wrapper>;
}
