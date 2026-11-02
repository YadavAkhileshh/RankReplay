import { Card, CardHeader, CardTitle, CardContent } from '../ui/index';
import { useApp } from '../../context/AppContext';
import { MY_TEAM, COMPETITOR_TEAMS } from '../../data/contestData';
import { calculatePlayerPoints, SCORING_RULES } from '../../engine/scoring';
import { cn } from '../../lib/utils';

function getRoleLabel(role) {
  const labels = { BAT: 'Bat', BOWL: 'Bowl', ALL: 'All', WK: 'WK' };
  return labels[role] || role;
}

function SelectionBar({ count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2563EB] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#64748B] w-8 text-right">{pct.toFixed(0)}%</span>
    </div>
  );
}

export function PlayerImpact() {
  const { players, state, playerMap, myTeam } = useApp();
  const { playerStats, rankedTeams } = state;

  const totalTeams  = rankedTeams.length;
  const myPlayerIds = new Set(myTeam.players.map(p => p.playerId));

  const allTeams = [{ ...myTeam, players: myTeam.players }, ...COMPETITOR_TEAMS];
  const selectionCount = {};
  const captainCount   = {};
  const vcCount        = {};

  allTeams.forEach(team => {
    team.players.forEach(({ playerId, role }) => {
      selectionCount[playerId] = (selectionCount[playerId] || 0) + 1;
      if (role === 'captain')      captainCount[playerId] = (captainCount[playerId] || 0) + 1;
      if (role === 'vice_captain') vcCount[playerId]      = (vcCount[playerId]      || 0) + 1;
    });
  });

  const rows = players.map(p => {
    const stats      = playerStats[p.id] || {};
    const base       = calculatePlayerPoints(stats, SCORING_RULES);
    const inMyTeam   = myPlayerIds.has(p.id);
    const myRole     = myTeam.players.find(mp => mp.playerId === p.id)?.role;
    const captainPts = base * 2;

    return {
      ...p,
      base,
      stats,
      inMyTeam,
      myRole,
      selected:  selectionCount[p.id] || 0,
      asCaptain: captainCount[p.id]   || 0,
      asVC:      vcCount[p.id]        || 0,
      captainPts,
    };
  }).sort((a, b) => b.base - a.base);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Impact</CardTitle>
        <p className="text-xs text-[#64748B] mt-0.5">
          Base points before captain/VC multiplier. Selection % across {totalTeams} teams.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-12 gap-2 px-5 py-2.5 bg-[#F8FAFC] border-y border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wide">
          <div className="col-span-3">Player</div>
          <div className="col-span-1 text-center">Role</div>
          <div className="col-span-2 text-center">Pts</div>
          <div className="col-span-2 text-center">2× C</div>
          <div className="col-span-4">Selection</div>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {rows.map(p => (
            <div
              key={p.id}
              className={cn(
                'grid grid-cols-12 gap-2 px-5 py-3 items-center text-sm',
                p.inMyTeam && 'bg-[#DBEAFE]/20',
              )}
            >
              <div className="col-span-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-medium text-[#1E293B] truncate text-xs">{p.name}</span>
                  {p.inMyTeam && (
                    <span className="text-[9px] font-semibold text-[#2563EB] bg-[#DBEAFE] border border-[#BFDBFE] px-1 py-0.5 rounded flex-shrink-0">
                      {p.myRole === 'captain' ? 'C' : p.myRole === 'vice_captain' ? 'VC' : '✓'}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#64748B]">{p.team}</span>
              </div>

              <div className="col-span-1 text-center">
                <span className="text-[10px] font-medium text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                  {getRoleLabel(p.role)}
                </span>
              </div>

              <div className="col-span-2 text-center">
                <span className="font-semibold text-[#1E293B] text-xs">{p.base.toFixed(1)}</span>
              </div>

              <div className="col-span-2 text-center">
                <span className="text-xs text-[#64748B]">{p.captainPts.toFixed(1)}</span>
              </div>

              <div className="col-span-4">
                <SelectionBar count={p.selected} total={totalTeams} />
                {(p.asCaptain > 0 || p.asVC > 0) && (
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    C: {p.asCaptain} · VC: {p.asVC}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
