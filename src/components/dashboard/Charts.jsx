import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/index';
import { useApp } from '../../context/AppContext';

function CustomTooltip({ active, payload, label, valueLabel }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 shadow-md text-xs">
      <p className="text-[#64748B] mb-1">Over {label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="font-medium text-[#1E293B]">
          {valueLabel}: <span style={{ color: entry.color }}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function RankChart() {
  const { state } = useApp();
  const data = state.rankHistory;
  const maxRank = Math.max(...data.map(d => d.rank)) + 20;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank Movement</CardTitle>
        <p className="text-xs text-[#64748B] mt-0.5">Lower is better</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="over"
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Over', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#64748B' }}
            />
            <YAxis
              reversed
              domain={[1, maxRank]}
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip valueLabel="Rank" />} />
            <Line
              type="monotone"
              dataKey="rank"
              stroke="#2563EB"
              strokeWidth={1.5}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    key={payload.over}
                    cx={cx}
                    cy={cy}
                    r={payload.simulated ? 4 : 3}
                    fill={payload.simulated ? '#2563EB' : '#1E293B'}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              }}
              activeDot={{ r: 5, strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1E293B]" /> Recorded</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#2563EB]" /> Simulated</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PointsChart() {
  const { state } = useApp();
  const data = state.rankHistory;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points Progression</CardTitle>
        <p className="text-xs text-[#64748B] mt-0.5">Cumulative team points by over</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="over"
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip valueLabel="Points" />} />
            <Area
              type="monotone"
              dataKey="points"
              stroke="#2563EB"
              strokeWidth={1.5}
              fill="url(#pointsGradient)"
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle
                    key={payload.over}
                    cx={cx}
                    cy={cy}
                    r={payload.simulated ? 4 : 2}
                    fill={payload.simulated ? '#2563EB' : '#1E293B'}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              }}
              activeDot={{ r: 5, strokeWidth: 1 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
