/* eslint-disable */
import React, { useState } from 'react';
import TableCard from '../TableCard';
import { machines, data3, data4, data5, data6 } from '../../../dataSet';
import { Button, Modal, Select } from 'antd';
import MachineCharts from './MachineCharts';
import MachineVideo from './MachineVideo';

const { Option } = Select;
export default function ComponentMachineInfo() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showData, setShowData] = useState(data3 || []);
  const handleChange = (value) => {
    if (value === 1) setShowData(data3);
    else if (value === 2) setShowData(data4);
    else if (value === 3) setShowData(data5);
    else if (value === 4) setShowData(data6);
    else setShowData([]);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const machineSelection = (
    <Select defaultValue={1} style={{ width: 240 }} onChange={handleChange}>
      {machines.map((machine) => (
        <Option value={machine.value} key={machine.key}>
          {machine.label}
        </Option>
      ))}
    </Select>
  );
  const showVideoButton = (
    <Button type="primary" onClick={showModal}>
      Show video
    </Button>
  );
  return (
    <>
      <TableCard
        data={showData?.kpiData}
        title="Machine"
        selectDropDown={machineSelection}
        showVideo={showVideoButton}
      />
      <MachineCharts data={showData?.chartData} />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <MachineVideo />
      </Modal>
    </>
  );
}
