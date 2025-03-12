import { v4 as uuidv4 } from 'uuid';
import { Metric } from '../components/metric';
import { LiveVideoButton, ViewDetailsButton } from '../components/common/buttons';
import { KpiCard } from '../components/cards/kpi-card';
import { CardHeader } from '../components/common/header';

export default function getKpiCard(factory, variant, otherProps) {
  let onNavigate = () => {};
  let onBack = () => {};
  let onRefresh = () => {};

  if (otherProps) {
    onNavigate = otherProps.onNavigate;
    onBack = otherProps.onBack;
    onRefresh = otherProps.onRefresh;
  }

  let contentProps = {
    metricNodes: getMetricNodes(factory)
  };

  switch (variant) {
    case 'minimized':
    case 'minimized-with-buttons':
      contentProps = {
        ...contentProps,
        viewDetailsButton: <ViewDetailsButton onClick={onNavigate} />,
        liveVideoButton: <LiveVideoButton />
      };
      break;
    case 'expanded':
    default:
      break;
  }

  return (
    <KpiCard
      key={uuidv4()}
      variant={variant}
      onBack={onBack}
      onRefresh={onRefresh}
      contentProps={contentProps}
      headerElement={
        <CardHeader
          leftText={factory.factoryName}
          onLinkClick={onNavigate}
          rightText={`Last updated ${factory.lastUpdatedAt}`}
        />
      }
    />
  );
}

function getMetricNodes(factory) {
  return factory.metrics.map((metricNode) => {
    return (
      <Metric
        key={uuidv4()}
        variant={metricNode.metricVariant}
        title={metricNode.metricName}
        leftText={metricNode.metricText}
        rightText={metricNode.metricChangeNumber}
      />
    );
  });
}
