import { MetricCards } from '../components/dashboard/MetricCards';
import { RankChart, PointsChart } from '../components/dashboard/Charts';
import { MatchTimeline } from '../components/dashboard/MatchTimeline';
import { AiExplanationPanel } from '../components/dashboard/AiExplanation';
import { SimulationPanel } from '../components/simulation/SimulationPanel';

export function OverviewPage() {
  return (
    <div className="space-y-5">
      <MetricCards />
      <AiExplanationPanel />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RankChart />
        <PointsChart />
      </div>
      <MatchTimeline />
    </div>
  );
}
