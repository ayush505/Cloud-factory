import { useParams } from 'react-router-dom';

export default function MachineDetailPageContainer() {
  const { machineId } = useParams();
  return <div>{machineId}</div>;
}
