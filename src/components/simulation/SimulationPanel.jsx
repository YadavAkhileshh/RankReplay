import { useState } from 'react'
import { RotateCcw, Play } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Select } from '../ui/index'
import { useApp } from '../../context/AppContext'

const EVENT_OPTIONS = [
  { value: 'boundary', label: 'Boundary (4 runs)' },
  { value: 'six',      label: 'Six (6 runs)'      },
  { value: 'wicket',   label: 'Wicket'             },
  { value: 'catch',    label: 'Catch'              },
  { value: 'dot_ball', label: 'Dot Ball'           },
]

export function SimulationPanel() {
  const { players, applyEvent, reset, state } = useApp()
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('boundary')
  const [lastApplied, setLastApplied] = useState(null)

  const playerOptions = players.map(p => ({
    value: p.id,
    label: `${p.name} (${p.team})`,
  }))

  const handleApply = () => {
    if (!selectedPlayer) return
    applyEvent(selectedPlayer, selectedEvent)
    const pName = players.find(p => p.id === selectedPlayer)?.name
    setLastApplied({ player: pName, event: selectedEvent })
  }

  const handleReset = () => {
    reset()
    setLastApplied(null)
  }

  const simulatedCount = state.matchEvents.filter(e => e.simulated).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Simulate event</CardTitle>
          <p className="text-xs text-[#64748B] mt-0.5">
            Apply an event to update stats and recalculate rankings
          </p>
        </div>
        {simulatedCount > 0 && (
          <span className="text-xs text-[#2563EB] font-medium bg-[#DBEAFE] border border-[#BFDBFE] px-2 py-0.5 rounded-md">
            {simulatedCount} applied
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            value={selectedPlayer}
            onChange={setSelectedPlayer}
            options={playerOptions}
            placeholder="Select player…"
            className="flex-1"
          />
          <Select
            value={selectedEvent}
            onChange={setSelectedEvent}
            options={EVENT_OPTIONS}
            className="sm:w-44"
          />
          <Button
            onClick={handleApply}
            disabled={!selectedPlayer}
            id="btn-apply-event"
          >
            <Play size={13} />
            Apply
          </Button>
        </div>

        {lastApplied && (
          <p className="text-xs text-[#16A34A] mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
            {lastApplied.player}, {lastApplied.event} applied, rankings updated
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <p className="text-xs text-[#64748B]">
            Not official Dream11 scoring.
          </p>
          <Button variant="secondary" size="sm" onClick={handleReset} id="btn-reset-demo">
            <RotateCcw size={12} />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
