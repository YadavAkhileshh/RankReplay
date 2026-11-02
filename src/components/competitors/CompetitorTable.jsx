import { useState } from 'react';
import { X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Select } from '../ui/index';
import { useApp } from '../../context/AppContext';
import { MY_TEAM } from '../../data/contestData';
import { calculatePlayerPoints, SCORING_RULES } from '../../engine/scoring';
import { cn } from '../../lib/utils';

function ComparisonModal({ competitor, onClose }) {
  const { playerMap, state } = useApp();
  const pStats = state.playerStats;

  const myPlayerIds  = new Set(MY_TEAM.players.map(p => p.playerId));
  const compPlayerIds = new Set(competitor.players.map(p => p.playerId));

  const shared    = [...myPlayerIds].filter(id =>  compPlayerIds.has(id));
  const onlyMine  = [...myPlayerIds].filter(id => !compPlayerIds.has(id));
  const onlyTheirs = [...compPlayerIds].filter(id => !myPlayerIds.has(id));

  const myCapName   = playerMap[MY_TEAM.captain]?.name    ?? MY_TEAM.captain;
  const myVCName    = playerMap[MY_TEAM.viceCaptain]?.name ?? MY_TEAM.viceCaptain;
  const compCapName = playerMap[competitor.captain]?.name  ?? competitor.captain;
  const compVCName  = playerMap[competitor.viceCaptain]?.name ?? competitor.viceCaptain;

  const pointsDiff = (competitor.points - competitor.myPoints).toFixed(1);

  const PlayerList = ({ ids, label, color }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>
        {label} ({ids.length})
      </p>
      {ids.length === 0 && <p className="text-xs text-[#64748B]">None</p>}
      <div className="space-y-1">
        {ids.map(id => {
          const p = playerMap[id];
          const stats = pStats[id] || {};
          const base = calculatePlayerPoints(stats, SCORING_RULES);
          return (
            <div key={id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F1F5F9] last:border-0">
              <span className="text-[#1E293B] font-medium">{p?.name ?? id}</span>
              <span className="text-[#64748B]">{base.toFixed(1)} pts</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-semibold text-[#1E293B]">
              vs. {competitor.teamName}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Rank #{competitor.rank} - {competitor.points.toFixed(1)} pts
              {' '}
              <span className={cn('font-medium', parseFloat(pointsDiff) > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]')}>
                ({parseFloat(pointsDiff) > 0 ? '+' : ''}{pointsDiff} vs yours)
              </span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#F1F5F9] transition-colors">
            <X size={16} className="text-[#64748B]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <p className="text-xs text-[#64748B] mb-2">Your Captain / VC</p>
              <p className="text-sm font-medium text-[#1E293B]">{myCapName} (C)</p>
              <p className="text-sm text-[#64748B]">{myVCName} (VC)</p>
            </div>
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <p className="text-xs text-[#64748B] mb-2">Their Captain / VC</p>
              <p className={cn('text-sm font-medium', competitor.captain !== MY_TEAM.captain ? 'text-[#DC2626]' : 'text-[#1E293B]')}>
                {compCapName} (C){competitor.captain !== MY_TEAM.captain && ' ←diff'}
              </p>
              <p className={cn('text-sm', competitor.viceCaptain !== MY_TEAM.viceCaptain ? 'text-[#DC2626]' : 'text-[#64748B]')}>
                {compVCName} (VC){competitor.viceCaptain !== MY_TEAM.viceCaptain && ' ←diff'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <PlayerList ids={shared}     label="Shared players"      color="#16A34A" />
            <PlayerList ids={onlyMine}   label="Only in your team"   color="#2563EB" />
            <PlayerList ids={onlyTheirs} label="Only in their team"  color="#64748B" />
          </div>
        </div>
      </div>
    </div>
  );
}

const FILTER_OPTIONS = [
  { value: 'all',   label: 'All competitors'     },
  { value: 'above', label: 'Teams that overtook me' },
  { value: 'below', label: 'Teams below me'      },
];

export function CompetitorTable() {
  const { state, playerMap, myCurrentRank } = useApp();
  const [filter, setFilter]         = useState('all');
  const [selectedComp, setSelectedComp] = useState(null);

  const allRanked = state.rankedTeams.filter(t => t.teamId !== MY_TEAM.id);

  const filtered = allRanked.filter(t => {
    if (filter === 'above') return t.rank < myCurrentRank;
    if (filter === 'below') return t.rank > myCurrentRank;
    return true;
  });

  return (
    <>
      {selectedComp && (
        <ComparisonModal
          competitor={{ ...selectedComp, myPoints: state.rankedTeams.find(t => t.teamId === MY_TEAM.id)?.points ?? 0 }}
          onClose={() => setSelectedComp(null)}
        />
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle>Competitor Analysis</CardTitle>
            <p className="text-xs text-[#64748B] mt-0.5">Click any row to compare teams</p>
          </div>
          <Select
            value={filter}
            onChange={setFilter}
            options={FILTER_OPTIONS}
            className="w-52"
          />
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 px-5 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-semibold text-[#64748B] uppercase tracking-wide">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Team</div>
            <div className="col-span-2 text-right">Points</div>
            <div className="col-span-3">Captain</div>
            <div className="col-span-2 text-right">vs Mine</div>
          </div>

          <div className="divide-y divide-[#E2E8F0] max-h-96 overflow-y-auto">
            {filtered.map((team) => {
              const myPoints = state.rankedTeams.find(t => t.teamId === MY_TEAM.id)?.points ?? 0;
              const diff     = team.points - myPoints;
              const capName  = playerMap[team.captain]?.name ?? team.captain;

              return (
                <button
                  key={team.teamId}
                  onClick={() => setSelectedComp(team)}
                  className="w-full grid grid-cols-12 gap-2 px-5 py-3 text-left hover:bg-[#F8FAFC] transition-colors text-sm items-center"
                >
                  <div className="col-span-1 text-[#64748B] font-mono text-xs">{team.rank}</div>
                  <div className="col-span-4 font-medium text-[#1E293B] truncate">{team.teamName}</div>
                  <div className="col-span-2 text-right font-medium text-[#1E293B]">{team.points.toFixed(1)}</div>
                  <div className="col-span-3 text-[#64748B] text-xs truncate">{capName} (C)</div>
                  <div className={cn('col-span-2 text-right text-xs font-medium', diff > 0 ? 'text-[#DC2626]' : diff < 0 ? 'text-[#16A34A]' : 'text-[#64748B]')}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-[#64748B]">
              No teams match this filter.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
