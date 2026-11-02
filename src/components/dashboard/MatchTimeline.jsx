import { Card, CardHeader, CardTitle, CardContent } from '../ui/index';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const EVENT_ICONS = {
  boundary:  { label: 'Boundary', color: '#16A34A', bg: '#DCFCE7' },
  six:       { label: 'Six',      color: '#2563EB', bg: '#DBEAFE' },
  wicket:    { label: 'Wicket',   color: '#DC2626', bg: '#FEE2E2' },
  catch:     { label: 'Catch',    color: '#64748B', bg: '#F1F5F9' },
  dot_ball:  { label: 'Dot',      color: '#64748B', bg: '#F1F5F9' },
};

function EventBadge({ type }) {
  const cfg = EVENT_ICONS[type] || { label: type, color: '#64748B', bg: '#F1F5F9' };
  return (
    <span
      className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

export function MatchTimeline() {
  const { state, playerMap } = useApp();
  const events = [...state.matchEvents].reverse().slice(0, 12);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Match Timeline</CardTitle>
          <p className="text-xs text-[#64748B] mt-0.5">{state.matchEvents.length} events</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto">
          {events.map((evt) => {
            const player = playerMap[evt.player];
            return (
              <div
                key={evt.id}
                className={cn(
                  'flex items-start gap-3 px-5 py-3 text-sm',
                  evt.simulated && 'bg-[#DBEAFE]/20',
                )}
              >
                <span className="text-[10px] text-[#64748B] font-mono w-10 flex-shrink-0 mt-0.5">
                  {evt.over}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <EventBadge type={evt.type} />
                    {evt.simulated && (
                      <span className="text-[10px] text-[#2563EB] font-medium">Simulated</span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-snug">{evt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
