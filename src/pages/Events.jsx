import { MatchTimeline } from '../components/dashboard/MatchTimeline';
import { SimulationPanel } from '../components/simulation/SimulationPanel';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/index';
import { SCORING_RULES } from '../engine/scoring';

function ScoringRulesCard() {
  const row = (label, value, danger = false) => (
    <div className="flex justify-between">
      <span className="text-[#64748B]">{label}</span>
      <span className={`font-medium ${danger ? 'text-[#DC2626]' : ''}`}>{value}</span>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scoring Rules</CardTitle>
        <p className="text-xs text-[#64748B] mt-0.5">Not official Dream11 scoring</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Batting</p>
            <div className="space-y-1.5 text-xs">
              {row('Per run',       `${SCORING_RULES.batting.run} pt`)}
              {row('Boundary (4)', `+${SCORING_RULES.batting.boundary4} pt`)}
              {row('Six',          `+${SCORING_RULES.batting.boundary6} pts`)}
              {row('Half century', `+${SCORING_RULES.batting.half_century} pts`)}
              {row('Century',      `+${SCORING_RULES.batting.century} pts`)}
              {row('Duck',         `${SCORING_RULES.batting.duck} pts`, true)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Bowling</p>
            <div className="space-y-1.5 text-xs">
              {row('Wicket',         `${SCORING_RULES.bowling.wicket} pts`)}
              {row('LBW / Bowled',   `+${SCORING_RULES.bowling.lbw_bonus} pts`)}
              {row('Maiden over',    `+${SCORING_RULES.bowling.maiden_over} pts`)}
              {row('Dot ball',       `+${SCORING_RULES.bowling.dot_ball} pt`)}
              {row('4-wicket haul',  `+${SCORING_RULES.bowling.four_wickets} pts`)}
              {row('5-wicket haul',  `+${SCORING_RULES.bowling.five_wickets} pts`)}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">Fielding & Multipliers</p>
            <div className="space-y-1.5 text-xs">
              {row('Catch',        `${SCORING_RULES.fielding.catch} pts`)}
              {row('Stumping',     `${SCORING_RULES.fielding.stumping} pts`)}
              {row('Run-out',      `${SCORING_RULES.fielding.run_out_direct} pts`)}
              <div className="flex justify-between border-t border-[#E2E8F0] pt-2 mt-2">
                <span className="text-[#64748B]">Captain</span>
                <span className="font-semibold">{SCORING_RULES.multipliers.captain}×</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Vice-Captain</span>
                <span className="font-semibold">{SCORING_RULES.multipliers.vice_captain}×</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EventsPage() {
  return (
    <div className="space-y-5">
      <SimulationPanel />
      <MatchTimeline />
      <ScoringRulesCard />
    </div>
  );
}
