import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/index';
import { useApp } from '../context/AppContext';
import { MY_TEAM } from '../data/contestData';
import { calculatePlayerPoints, applyMultiplier, SCORING_RULES } from '../engine/scoring';
import { MetricCards } from '../components/dashboard/MetricCards';
import { SimulationPanel } from '../components/simulation/SimulationPanel';
import { cn } from '../lib/utils';

const ROLE_COLORS = {
  BAT:  { bg: '#DBEAFE', text: '#2563EB' },
  BOWL: { bg: '#FEE2E2', text: '#DC2626' },
  ALL:  { bg: '#DCFCE7', text: '#16A34A' },
  WK:   { bg: '#FEF9C3', text: '#854D0E' },
};

export function ContestPage() {
  const { playerMap, state, myCurrentRank, myCurrentPoints, contestInfo } = useApp();
  const { playerStats } = state;

  const teamPlayers = MY_TEAM.players.map(({ playerId, role }) => {
    const p = playerMap[playerId];
    const stats = playerStats[playerId] || {};
    const base = calculatePlayerPoints(stats, SCORING_RULES);
    const total = applyMultiplier(base, role, SCORING_RULES);
    return { ...p, role, base, total, stats };
  }).sort((a, b) => b.total - a.total);

  const roleColors = (role) => ROLE_COLORS[role] || { bg: '#F1F5F9', text: '#64748B' };

  return (
    <div className="space-y-5">
      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Contest Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Contest',     value: contestInfo.name        },
              { label: 'Prize Pool',  value: contestInfo.prizePool   },
              { label: 'Entry Fee',   value: contestInfo.entryFee    },
              { label: 'Type',        value: contestInfo.type        },
              { label: 'Total Teams', value: contestInfo.totalTeams  },
              { label: 'Your Rank',   value: `#${myCurrentRank}`     },
              { label: 'Your Points', value: `${myCurrentPoints.toFixed(1)}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm py-1.5 border-b border-[#F1F5F9] last:border-0">
                <span className="text-[#64748B]">{label}</span>
                <span className="font-medium text-[#1E293B]">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Team - {MY_TEAM.name}</CardTitle>
              <p className="text-xs text-[#64748B] mt-0.5">
                C: {playerMap[MY_TEAM.captain]?.name} · VC: {playerMap[MY_TEAM.viceCaptain]?.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#64748B]">Total</p>
              <p className="text-lg font-semibold text-[#1E293B]">{myCurrentPoints.toFixed(1)}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-11 gap-1 px-5 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wide">
              <div className="col-span-4">Player</div>
              <div className="col-span-1 text-center">Role</div>
              <div className="col-span-2 text-center">Runs/Wkts</div>
              <div className="col-span-2 text-center">Base Pts</div>
              <div className="col-span-2 text-center">Final</div>
            </div>
            <div className="divide-y divide-[#E2E8F0]">
              {teamPlayers.map(p => {
                const rc = roleColors(p.role);
                const isCapOrVC = p.role === 'captain' || p.role === 'vice_captain';
                return (
                  <div
                    key={p.id}
                    className={cn('grid grid-cols-11 gap-1 px-5 py-3 items-center text-sm', isCapOrVC && 'bg-[#FFFBEB]/40')}
                  >
                    <div className="col-span-4 flex items-center gap-2 min-w-0">
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[#1E293B] text-xs truncate">{p.name}</span>
                        <span className="text-[10px] text-[#64748B]">{p.team}</span>
                      </div>
                      {p.role === 'captain' && (
                        <span className="text-[10px] font-bold text-[#854D0E] bg-[#FEF9C3] border border-[#FEF08A] px-1.5 py-0.5 rounded flex-shrink-0">C</span>
                      )}
                      {p.role === 'vice_captain' && (
                        <span className="text-[10px] font-bold text-[#2563EB] bg-[#DBEAFE] border border-[#BFDBFE] px-1.5 py-0.5 rounded flex-shrink-0">VC</span>
                      )}
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="text-[10px] font-medium px-1 py-0.5 rounded" style={{ backgroundColor: rc.bg, color: rc.text }}>
                        {p.role}
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-xs text-[#64748B]">
                      {p.stats.runs !== undefined && <span>{p.stats.runs}r</span>}
                      {p.stats.wickets !== undefined && p.stats.wickets > 0 && <span className="ml-1">{p.stats.wickets}w</span>}
                    </div>
                    <div className="col-span-2 text-center text-xs text-[#64748B]">{p.base.toFixed(1)}</div>
                    <div className="col-span-2 text-center text-xs font-semibold text-[#1E293B]">{p.total.toFixed(1)}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <SimulationPanel />
    </div>
  );
}
