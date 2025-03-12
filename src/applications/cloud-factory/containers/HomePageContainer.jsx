/* eslint-disable */
import { data } from '../data/dummy-data';
import { FactoryList } from '../components';

export default function HomePageContainer() {
  return <FactoryList factoryList={data.factories} />;
}
