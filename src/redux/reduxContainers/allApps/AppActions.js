/* eslint-disable */
import TYPES from 'redux/actions/types';
import apiService from 'apiServices';
import { ShowSuccess } from 'commons/Notifications/Errors';
import { Button } from 'antd';
import { applicationActionAPI } from 'apiServices/applicationService';
import { showErrorForAction } from 'redux/actions/appUtils';
import { isLoggedIn } from 'commons/Utils';

export const fetchAllApps = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALL_APP_REQUEST });

      let installedApplicationsList = [];
      let otherApplicationsList = [];
      let categoriesList = [];

      let appsData = {};
      if (isLoggedIn()) {
        appsData = await apiService.fetchApplicationsListAPI();
        installedApplicationsList = [...appsData?.installed_application_list];
      } else {
        appsData = await apiService.fetchApplicationsListForUnAuthorisedUserAPI();
      }

      otherApplicationsList = [...appsData?.application_list];
      categoriesList = [...appsData?.category_list];

      dispatch({
        type: TYPES.ALL_APP_SUCCESS,
        categories: categoriesList || [],
        installedApplications: installedApplicationsList || [],
        otherApplications: otherApplicationsList || []
      });
    } catch (error) {
      dispatch({ type: TYPES.ALL_APP_ERROR });
      showErrorForAction(error);
    }
  };
};

export const fetchAllAppsByCategory = (category) => {
  return (dispatch) => {
    try {
      dispatch({ type: TYPES.ALL_APP_BY_CATEGORY_REQUEST });
      dispatch({
        type: TYPES.ALL_APP_BY_CATEGORY_SUCCESS,
        category
      });
    } catch (error) {
      dispatch({ type: TYPES.ALL_APP_BY_CATEGORY_ERROR });
      showErrorForAction(error);
    }
  };
};

export const installApplication = (appId, name, app_landing_url, callBack) => {
  return async (dispatch) => {
    try {
      const data = {
        type: 'activate',
        app_id: appId
      };
      await applicationActionAPI(data);
      dispatch({ type: TYPES.INSTALL_APP, appId });
      ShowSuccess({
        text: (
          <>
            <h3>{name} has been installed!</h3>
            <h4>You have successfully installed {name} app.</h4>
          </>
        ),
        buttonProp: (
          <a href={app_landing_url} target="_blank">
            {' '}
            <Button type="primary">Open</Button>
          </a>
        )
      });
      callBack();
    } catch (error) {
      callBack();
      throw error;
    }
  };
};

export const unInstallApplication = (appId, name, callBack) => {
  return async (dispatch) => {
    try {
      const data = {
        type: 'deactivate',
        app_id: appId
      };
      await applicationActionAPI(data);
      dispatch({ type: TYPES.UNINSTALL_APP, appId });
      ShowSuccess({
        text: (
          <>
            <h3>{name} has been uninstalled!</h3>
            <h4>You have successfully uninstalled {name} app.</h4>
          </>
        )
      });
      callBack();
    } catch (error) {
      callBack();
      throw error;
    }
  };
};

export const intrestedApplication = (appId, name, callBack) => {
  return async (dispatch) => {
    try {
      const data = {
        type: 'interest',
        app_id: appId
      };
      await applicationActionAPI(data);
      // dispatch({ type: TYPES.UNINSTALL_APP, appId });
      ShowSuccess({
        text: (
          <>
            <h4>You have interested for {name} app.</h4>
          </>
        )
      });
      callBack();
    } catch (error) {
      callBack();
      throw error;
    }
  };
};

export const updateSearchText = (value) => {
  return async (dispatch) => {
    dispatch({ type: TYPES.SEARCH_TEXT, searchText: value });
  };
};
