import tenderService from 'applications/biz-tender/apiServices';
import * as applicationService from './applicationService';
import * as signupService from './signupService';

const apiService = {
  ...applicationService,
  ...signupService,
  ...tenderService
};

export default apiService;
