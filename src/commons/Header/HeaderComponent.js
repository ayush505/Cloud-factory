import React from 'react';
import { PageHeader } from 'antd';

export default function HeaderComponent(props) {
  const { data, children } = props;
  return <PageHeader {...data}>{children}</PageHeader>;
}
