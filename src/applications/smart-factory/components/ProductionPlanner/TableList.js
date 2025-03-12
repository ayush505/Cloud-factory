/* eslint-disable */
import React from 'react';
import { Table, InputNumber, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ContentCard } from '../styling';
const { Column } = Table;
const data = [
  {
    key: '1',
    Detail: 'Production Rate (units per hour)',
    Conversion: 'John',
    Slitting: 'Brown',
    Printing: 32,
    Doctoring: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    Detail: 'Changeover Time (minutes)',
    Conversion: 'con',
    Slitting: 'slit',
    Printing: 32,
    Doctoring: 'New York No. 2 Lake Park'
  }
];
export default function TableList(props) {
  return (
    <ContentCard
      title="Job Card"
      extra={
        <Button type="link" onClick={props.deletetable} style={{ padding: '0px' }}>
          <DeleteOutlined style={{ color: '#D0021B', fontSize: '20px' }} />
        </Button>
      }
    >
      <Table pagination={false} bordered="true" dataSource={data}>
        <Column title="" dataIndex="Detail" key="Detail" />
        <Column
          title="Conversion "
          dataIndex="Conversion"
          key="Conversion"
          render={(tags) => (
            <>
              <InputNumber />
            </>
          )}
        />
        <Column
          title="Slitting"
          dataIndex="Slitting"
          key="Slitting"
          render={(tags) => (
            <>
              <InputNumber />
            </>
          )}
        />
        <Column
          title="Printing"
          dataIndex="Printing"
          key="Printing"
          render={(tags) => (
            <>
              <InputNumber />
            </>
          )}
        />
        <Column
          title="Doctoring"
          dataIndex="Doctoring"
          key="Doctoring"
          render={(tags) => (
            <>
              <InputNumber />
            </>
          )}
        />
      </Table>
    </ContentCard>
  );
}
