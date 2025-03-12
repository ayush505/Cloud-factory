/* eslint-disable */
import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import result from '../../assets/production.png';
import TableList from './TableList';
import { ContentCard, PageHeaderText } from '../styling';

export default function ProductionPlanner() {
  const [showpic, setshowpic] = useState(false);
  let [id, setId] = useState(1);
  const [theArray, setTheArray] = useState([id]);

  const addEntryClick = () => {
    setId(++id);
    setTheArray([...theArray, id]);
  };

  const onChangeshowpic = () => {
    setshowpic(true);
  };

  const handleRemoveItem = (e) => {
    console.log('worked');
    const tempArr = theArray.filter((item) => item !== e);
    setTheArray(tempArr);
  };

  return (
    <>
      {/* <PageHeaderText>Generate Production Plan</PageHeaderText> */}

      {theArray.map((entry) => (
        <div>
          <TableList deletetable={() => handleRemoveItem(entry)} />
        </div>
      ))}

      <ContentCard>
        <Button
          onClick={addEntryClick}
          style={{ borderColor: '#0252cd', color: '#0252cd', borderRadius: '4px' }}
          icon={<PlusOutlined />}
          size="middle"
          ghost
        >
          Add Job Card
        </Button>
        <Button
          type="primary"
          size="middle"
          style={{ marginLeft: '10px', borderRadius: '4px' }}
          onClick={onChangeshowpic}
        >
          Generate
        </Button>
      </ContentCard>
      {showpic && (
        <ContentCard>
          <img src={result} style={{ maxWidth: '1300px', marginLeft: '130px' }} />
        </ContentCard>
      )}
    </>
  );
}
