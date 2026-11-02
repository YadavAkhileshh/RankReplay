export const SCORING_RULES = {
  batting: {
    run: 1,
    boundary4: 1,
    boundary6: 2,
    half_century: 8,
    century: 16,
    duck: -2,
  },
  bowling: {
    wicket: 25,
    lbw_bonus: 8,
    bowled_bonus: 8,
    maiden_over: 12,
    dot_ball: 0.5,
    four_wickets: 8,
    five_wickets: 16,
  },
  fielding: {
    catch: 8,
    stumping: 12,
    run_out_direct: 12,
    run_out_indirect: 6,
  },
  multipliers: {
    captain: 2,
    vice_captain: 1.5,
  },
}

export function calculatePlayerPoints(stats, rules = SCORING_RULES) {
  let points = 0

  if (stats.runs !== undefined) {
    points += stats.runs * rules.batting.run
    points += (stats.fours || 0) * rules.batting.boundary4
    points += (stats.sixes || 0) * rules.batting.boundary6
    if (stats.runs >= 100) points += rules.batting.century
    else if (stats.runs >= 50) points += rules.batting.half_century
    if (stats.runs === 0 && stats.balls_faced > 0 && stats.dismissed) {
      points += rules.batting.duck
    }
  }

  if (stats.wickets !== undefined) {
    points += stats.wickets * rules.bowling.wicket
    points += (stats.lbw_wickets || 0) * rules.bowling.lbw_bonus
    points += (stats.bowled_wickets || 0) * rules.bowling.bowled_bonus
    points += (stats.maiden_overs || 0) * rules.bowling.maiden_over
    points += (stats.dot_balls || 0) * rules.bowling.dot_ball
    if (stats.wickets >= 5) points += rules.bowling.five_wickets
    else if (stats.wickets >= 4) points += rules.bowling.four_wickets
  }

  points += (stats.catches || 0) * rules.fielding.catch
  points += (stats.stumpings || 0) * rules.fielding.stumping
  points += (stats.run_outs_direct || 0) * rules.fielding.run_out_direct
  points += (stats.run_outs_indirect || 0) * rules.fielding.run_out_indirect

  return Math.round(points * 10) / 10
}

export function applyMultiplier(basePoints, role, rules = SCORING_RULES) {
  if (role === 'captain') return basePoints * rules.multipliers.captain
  if (role === 'vice_captain') return basePoints * rules.multipliers.vice_captain
  return basePoints
}

export function calculateTeamPoints(teamPlayers, playerStatsMap, rules = SCORING_RULES) {
  let total = 0
  teamPlayers.forEach(({ playerId, role }) => {
    const stats = playerStatsMap[playerId]
    if (!stats) return
    const base = calculatePlayerPoints(stats, rules)
    total += applyMultiplier(base, role, rules)
  })
  return Math.round(total * 10) / 10
}

export function applyEventToStats(stats, eventType) {
  const updated = { ...stats }
  switch (eventType) {
    case 'boundary':
      updated.runs = (updated.runs || 0) + 4
      updated.fours = (updated.fours || 0) + 1
      updated.balls_faced = (updated.balls_faced || 0) + 1
      break
    case 'six':
      updated.runs = (updated.runs || 0) + 6
      updated.sixes = (updated.sixes || 0) + 1
      updated.balls_faced = (updated.balls_faced || 0) + 1
      break
    case 'wicket':
      updated.wickets = (updated.wickets || 0) + 1
      updated.balls_bowled = (updated.balls_bowled || 0) + 1
      updated.dot_balls = (updated.dot_balls || 0) + 1
      break
    case 'catch':
      updated.catches = (updated.catches || 0) + 1
      break
    case 'dot_ball':
      updated.dot_balls = (updated.dot_balls || 0) + 1
      updated.balls_bowled = (updated.balls_bowled || 0) + 1
      break
  }
  return updated
}

export function rankTeams(teams, playerStatsMap, rules = SCORING_RULES) {
  const scored = teams.map(team => ({
    teamId: team.id,
    teamName: team.name,
    captain: team.captain,
    viceCaptain: team.viceCaptain,
    players: team.players,
    points: calculateTeamPoints(team.players, playerStatsMap, rules),
  }))

  scored.sort((a, b) => b.points - a.points)

  return scored.map((t, i) => ({ ...t, rank: i + 1 }))
}
