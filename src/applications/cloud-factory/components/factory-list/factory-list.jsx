import { useHistory } from 'react-router-dom';
import getKpiCard from '../../helpers/kpi-card-creator';

export default function FactoryList(props) {
  const history = useHistory();
  const { factoryList } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {factoryList.map((factory) => {
        return getKpiCard(factory, 'minimized', {
          onNavigate: () =>
            history.push(`${history.location.pathname}factory-details/${factory.factoryId}`)
        });
      })}
    </div>
  );
}
