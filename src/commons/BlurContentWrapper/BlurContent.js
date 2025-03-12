import { Table } from 'antd';
import React from 'react';
import styled from 'styled-components';

const BlurText = styled.span`
  text-shadow: 0 0 5px rgb(0 0 0 / 50%);
  color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  word-break: break-all;
`;
/*eslint-disable*/
export default function BlurContent(props) {
  const { children, type, hideText = true, hideFirstColOfTable = true, isLoggedIn = false } = props;

  const unSubscribedContent = 'This Information is for unsubscribed user';
  if (isLoggedIn) return children;
  else {
    let content = '';
    if (type === 'table') {
      const tableDetail = children.props;
      const dataSource = [];
      tableDetail?.dataSource?.map((data) => {
        const tempObj = {};
        tableDetail.columns.map((column, index) => {
          if (index === 0 && !hideFirstColOfTable)
            return (tempObj[column.dataIndex] = data[column.dataIndex]);
          column['ellipsis'] = true;
          return (tempObj[column.dataIndex] = <BlurText>{unSubscribedContent}</BlurText>);
        });
        dataSource.push(tempObj);
      });
      content = <Table {...tableDetail} dataSource={dataSource} tableLayout="fixed" />;
    } else {
      content = (
        <>
          {Array.isArray(props.children) ? (
            props.children.map((entry, index) => (
              <BlurText key={index}>{unSubscribedContent}</BlurText>
            ))
          ) : (
            <BlurText>{hideText ? unSubscribedContent : children}</BlurText>
          )}
        </>
      );
    }
    return <>{content}</>;
  }
}
