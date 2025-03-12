import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AppCard from './AppCard';

const StyledHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #3d4961;
  margin-bottom: 30px;
`;
export default function AppComponents() {
  const allApps = useSelector((state) => state.allApps) || [];
  const { loading, installedApplications, otherApplications, selectedCategory, searchText } =
    allApps;

  const [installedApps, setInstalledApps] = useState([]);
  const [otherApps, setOtherApps] = useState([]);

  useEffect(() => {
    if (selectedCategory === '' || selectedCategory === 'All') {
      setInstalledApps(installedApplications);
      setOtherApps(otherApplications);
    } else {
      const installedApplicationsList = installedApplications.filter((app) =>
        app.category.includes(selectedCategory)
      );
      const otherApplicationsList = otherApplications.filter((app) =>
        app.category.includes(selectedCategory)
      );
      setInstalledApps(installedApplicationsList);
      setOtherApps(otherApplicationsList);
    }
  }, [loading, selectedCategory, otherApplications.length, installedApplications.length]);

  const onSearch = (value) => {
    if (!value) {
      setInstalledApps(installedApplications);
      setOtherApps(otherApplications);
    } else {
      const installedApplicationsList = installedApplications.filter((app) =>
        app.title.toLowerCase().includes(value.toLowerCase())
      );
      const otherApplicationsList = otherApplications.filter((app) =>
        app.title.toLowerCase().includes(value.toLowerCase())
      );
      setInstalledApps(installedApplicationsList);
      setOtherApps(otherApplicationsList);
    }
  };

  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);
  return (
    <div>
      {!!installedApps.length && (
        <>
          <StyledHeader>My Apps ({installedApps.length})</StyledHeader>
          <Row>
            {installedApps.map((app) => (
              <Col key={app.id} xs={24} sm={12} lg={8} xxl={{ span: 6 }}>
                <AppCard app={app} isInstalled />
              </Col>
            ))}
          </Row>
        </>
      )}
      <StyledHeader>
        {installedApps.length ? 'Other' : 'All'} Apps ({otherApps.length})
      </StyledHeader>
      <Row gutter={[0, 30]}>
        {otherApps.map((app) => (
          <Col key={app.id} xs={24} md={12} lg={10} xl={8} xxl={6}>
            <AppCard app={app} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
