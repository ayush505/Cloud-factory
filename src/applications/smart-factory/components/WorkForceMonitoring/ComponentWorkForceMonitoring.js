import React from 'react';
import DailyTrends from './DailyTrends';
import HeaderKpi from './HeaderKPI';
import Insights from './Insights';
import RealTimeLocation from './RealTimeLocation';
import IncidentCenter from './IncidentCenter';
import DailyAnalysis from './DailyAnalysis';
import './index.css';

export default function ComponentWorkForceMonitoring() {
  return (
    <>
      <HeaderKpi />
      <RealTimeLocation />
      <DailyTrends />
      <DailyAnalysis />
      <IncidentCenter />
      <Insights />
    </>
  );
}
