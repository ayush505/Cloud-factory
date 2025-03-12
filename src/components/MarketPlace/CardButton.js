/* eslint-disable */
import { Button, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import actions from 'redux/actions';
import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';
const SButton = styled(Button)`
  bottom: 0px;
`;

export default function CardButton(props) {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const { isInstalled, app } = props;
  const { app_id, title, app_landing_url, active } = app;
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const updateCompleted = () => {
    setBtnLoading(false);
  };
  const handleInstallButton = async () => {
    if (!isUserLoggedIn) {
      history.push('/login');
    } else {
      setBtnLoading(true);
      if (active)
        dispatch(actions.installApplication(app_id, title, app_landing_url, updateCompleted));
      else dispatch(actions.intrestedApplication(app_id, title, updateCompleted));
    }
  };
  const handleUnInstallButton = () => {
    setBtnLoading(true);
    dispatch(actions.unInstallApplication(app_id, title, updateCompleted));
  };

  const menu = (
    <Menu
      items={[
        {
          key: 1,
          label: 'Uninstall',
          onClick: handleUnInstallButton
        }
      ]}
    />
  );
  // const DropdownMenu = () => (
  //   <Dropdown key="more" overlay={menu} placement="bottomLeft">
  //     <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
  //   </Dropdown>
  // );
  return (
    <>
      {/* {!isInstalled ? (
        <SButton onClick={handleInstallButton} loading={btnLoading} type="primary" ghost size='small'>
          {active ? 'Install' : 'Interested'}
        </SButton>
      ) : (
        <>
          <a href={app_landing_url} target="_blank" type="primary" ghost size='small'>
            <SButton>Open</SButton>
          </a>

          <DropdownMenu />
        </>
      )} */}
      {active ? (
        <Link to={app_landing_url} target="_blank">
          <SButton type="primary" ghost size="small">
            Open
          </SButton>
        </Link>
      ) : (
        <SButton
          onClick={handleInstallButton}
          loading={btnLoading}
          type="primary"
          ghost
          size="small"
        >
          Interested
        </SButton>
      )}
    </>
  );
}
