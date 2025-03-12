import { useHistory, useParams } from 'react-router-dom';
import { data } from '../data/dummy-data';
import { getKpiCard } from '../helpers';

export default function FactoryDetailPageContainer() {
  const history = useHistory();
  const { factoryId } = useParams();
  const factory = data.factories.find((f) => f.factoryId.toString() === factoryId);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {getKpiCard(factory, 'expanded', {
        onNavigate: () => history.go(0),
        onBack: () => history.goBack(-1)
      })}
    </div>
  );
}
