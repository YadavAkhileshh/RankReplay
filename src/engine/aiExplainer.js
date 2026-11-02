const GROQ_PROXY_URL = '/api/explain'

export function buildAnalysisPayload({ myTeam, rankedTeams, playerStats, players, events }) {
  const playerMap = Object.fromEntries(players.map(p => [p.id, p]))
  const myRanked = rankedTeams.find(t => t.teamId === myTeam.id)
  const myRank = myRanked?.rank ?? '?'
  const myPoints = myRanked?.points ?? 0

  const overtakers = rankedTeams.filter(t => t.teamId !== myTeam.id && t.rank < myRank)
  const topOvertakers = overtakers.slice(0, 5).map(t => ({
    name: t.teamName,
    rank: t.rank,
    points: t.points,
    captain: playerMap[t.captain]?.name ?? t.captain,
    viceCaptain: playerMap[t.viceCaptain]?.name ?? t.viceCaptain,
  }))

  const myPlayerBreakdown = myTeam.players.map(({ playerId, role }) => {
    const p = playerMap[playerId]
    const stats = playerStats[playerId] || {}
    return {
      name: p?.name ?? playerId,
      role,
      runs: stats.runs ?? 0,
      wickets: stats.wickets ?? 0,
      catches: stats.catches ?? 0,
    }
  })

  const topPerformers = Object.entries(playerStats)
    .map(([id, s]) => ({ name: playerMap[id]?.name ?? id, runs: s.runs || 0, wickets: s.wickets || 0, catches: s.catches || 0 }))
    .sort((a, b) => (b.runs + b.wickets * 25 + b.catches * 8) - (a.runs + a.wickets * 25 + a.catches * 8))
    .slice(0, 6)

  return {
    myTeam: {
      name: myTeam.name || 'Your Team',
      rank: myRank,
      points: myPoints,
      captain: playerMap[myTeam.captain]?.name ?? myTeam.captain,
      viceCaptain: playerMap[myTeam.viceCaptain]?.name ?? myTeam.viceCaptain,
      players: myPlayerBreakdown,
    },
    topOvertakers,
    topPerformers,
    recentEvents: events.slice(-5).map(e => e.desc),
  }
}

export async function explainRankMovement(payload) {
  const response = await fetch(GROQ_PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ analysis: payload }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`)
  }

  return data
}
