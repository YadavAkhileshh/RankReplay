import { TrendingUp, TrendingDown, Minus, Award, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/index';
import { useApp } from '../../context/AppContext';

function MetricCard({ title, value, subtitle, trend, icon: Icon }) {
  const trendColors = {
    up:   'text-[#DC2626]',
    down: 'text-[#16A34A]',
    flat: 'text-[#64748B]',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="py-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">{title}</p>
          <div className="w-7 h-7 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center">
            <Icon size={14} className="text-[#64748B]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-[#1E293B]">{value}</span>
          {trend && (
            <span className={`text-xs font-medium flex items-center gap-0.5 ${trendColors[trend.dir]}`}>
              {trend.dir === 'up'   && <TrendingUp size={11} />}
              {trend.dir === 'down' && <TrendingDown size={11} />}
              {trend.dir === 'flat' && <Minus size={11} />}
              {trend.label}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-[#64748B] mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export function MetricCards() {
  const { myCurrentRank, myPreviousRank, myCurrentPoints, rankChange, state } = useApp();
  const prevPoints = state.rankHistory[state.rankHistory.length - 2]?.points ?? 420;
  const pointsDelta = myCurrentPoints - prevPoints;

  const rankDir = rankChange > 0 ? 'up' : rankChange < 0 ? 'down' : 'flat';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Current Rank"
        value={`#${myCurrentRank}`}
        subtitle={`of 51 teams`}
        icon={Target}
      />
      <MetricCard
        title="Previous Rank"
        value={`#${myPreviousRank}`}
        subtitle="Last checkpoint"
        icon={Award}
      />
      <MetricCard
        title="Fantasy Points"
        value={myCurrentPoints.toFixed(1)}
        subtitle={`${pointsDelta >= 0 ? '+' : ''}${pointsDelta.toFixed(1)} from previous`}
        trend={{ dir: pointsDelta >= 0 ? 'down' : 'up', label: `${Math.abs(pointsDelta).toFixed(1)} pts` }}
        icon={Zap}
      />
      <MetricCard
        title="Rank Movement"
        value={rankChange > 0 ? `+${rankChange}` : String(rankChange)}
        subtitle={rankChange > 0 ? 'Positions dropped' : rankChange < 0 ? 'Positions gained' : 'Stable'}
        trend={{ dir: rankDir, label: rankChange > 0 ? 'Dropped' : rankChange < 0 ? 'Gained' : 'Stable' }}
        icon={TrendingUp}
      />
    </div>
  );
}
