import { data1, data2 } from 'applications/smart-factory/dataSet';
import React from 'react';
// import { PageHeaderText } from '../styling';
import MachineInfo from './MachineInfo';
import TableCard from './TableCard';

export default function ComponentMachineMonitoring() {
  return (
    <>
      {/* <PageHeaderText>Machine Monitoring</PageHeaderText> */}
      <TableCard data={data1} title="Factory Profile" />
      <TableCard data={data2} title="Job Profile" />
      <MachineInfo />
    </>
  );
}
