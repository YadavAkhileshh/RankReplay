import { CompetitorTable } from '../components/competitors/CompetitorTable';
import { PlayerImpact } from '../components/players/PlayerImpact';

export function CompetitorsPage() {
  return (
    <div className="space-y-5">
      <CompetitorTable />
      <PlayerImpact />
    </div>
  );
}
