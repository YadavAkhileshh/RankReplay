import { MessageSquare, AlertCircle, RefreshCw, ChevronRight, Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Spinner } from '../ui/index'
import { useApp } from '../../context/AppContext'
import { buildAnalysisPayload, explainRankMovement } from '../../engine/aiExplainer'

function ExplanationResult({ explanation }) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
        <p className="text-sm text-[#1E293B] leading-relaxed">{explanation.summary}</p>
      </div>

      {explanation.main_contributors?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
            Key players
          </p>
          <div className="space-y-2">
            {explanation.main_contributors.map((c, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg border border-[#E2E8F0] bg-white">
                <div className="w-5 h-5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 text-[10px] font-semibold text-[#64748B]">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1E293B]">{c.player}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{c.contribution}</p>
                  <p className="text-xs text-[#1E293B] mt-1 leading-snug">{c.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {explanation.evidence?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
            What the data shows
          </p>
          <ul className="space-y-1.5">
            {explanation.evidence.map((e, i) => (
              <li key={i} className="flex gap-2 text-xs text-[#1E293B]">
                <ChevronRight size={12} className="text-[#64748B] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {explanation.limitations && (
        <div className="flex gap-2 p-3 rounded-lg bg-[#FFFBEB] border border-[#FEF3C7]">
          <Info size={13} className="text-[#92400E] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#92400E] leading-snug">{explanation.limitations}</p>
        </div>
      )}
    </div>
  )
}

export function AiExplanationPanel() {
  const { state, myTeam, players, setAiLoading, setAiExplanation, setAiError } = useApp()
  const { aiExplanation, aiLoading, aiError, rankedTeams, playerStats, matchEvents } = state

  const handleExplain = async () => {
    setAiLoading(true)
    try {
      const payload = buildAnalysisPayload({
        myTeam,
        rankedTeams,
        playerStats: playerStats || {},
        players,
        events: matchEvents,
      })
      const result = await explainRankMovement(payload)
      setAiExplanation(result)
    } catch (err) {
      setAiError(err.message || 'Could not get an explanation.')
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={15} className="text-[#1E293B]" />
          <CardTitle>What changed your rank</CardTitle>
        </div>
        {aiExplanation && !aiLoading && (
          <Button variant="ghost" size="sm" onClick={handleExplain}>
            <RefreshCw size={12} />
            Refresh
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!aiExplanation && !aiLoading && !aiError && (
          <div className="flex flex-col items-center py-8 text-center gap-4">
            <p className="text-sm text-[#64748B]">
              Compare your team against the teams that overtook you.
            </p>
            <Button onClick={handleExplain} size="lg" id="btn-explain-rank">
              Explain my rank movement
            </Button>
          </div>
        )}

        {aiLoading && (
          <div className="flex flex-col items-center py-8 gap-3">
            <Spinner className="w-5 h-5" />
            <p className="text-sm text-[#64748B]">Analysing contest data…</p>
          </div>
        )}

        {aiError && (
          <div className="space-y-4">
            <div className="flex gap-2 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
              <AlertCircle size={14} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-[#DC2626]">Could not get an explanation</p>
                <p className="text-xs text-[#64748B] mt-0.5">{aiError}</p>
              </div>
            </div>
            <Button variant="secondary" onClick={handleExplain} size="sm">
              <RefreshCw size={12} />
              Try again
            </Button>
          </div>
        )}

        {aiExplanation && !aiLoading && (
          <ExplanationResult explanation={aiExplanation} />
        )}
      </CardContent>
    </Card>
  )
}
