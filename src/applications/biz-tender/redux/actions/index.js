import * as DetailActions from '../reduxContainers/details/DetailActions';
import * as TenderActions from '../reduxContainers/tender/TenderActions';

const actions = {
  ...DetailActions,
  ...TenderActions
};

export default actions;
