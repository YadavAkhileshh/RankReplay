import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
  PLAYER_STATS_CURRENT,
  MY_TEAM,
  COMPETITOR_TEAMS,
  INITIAL_MATCH_EVENTS,
  PLAYERS,
  RANK_HISTORY,
  CONTEST_INFO,
  MATCH_INFO,
} from '../data/contestData';
import { rankTeams, applyEventToStats } from '../engine/scoring';

const STORAGE_KEY = 'rankreplay_state_v2'

function computeRankings(playerStats) {
  const allTeams = [MY_TEAM, ...COMPETITOR_TEAMS];
  return rankTeams(allTeams, playerStats);
}

function buildInitialState() {
  const rankedTeams = computeRankings(PLAYER_STATS_CURRENT);
  return {
    playerStats: PLAYER_STATS_CURRENT,
    matchEvents: INITIAL_MATCH_EVENTS,
    rankHistory: RANK_HISTORY,
    rankedTeams,
    appliedEventIds: new Set(),
    eventCounter: INITIAL_MATCH_EVENTS.length,
    aiExplanation: null,
    aiLoading: false,
    aiError: null,
    simulationTarget: null,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'APPLY_EVENT': {
      const { eventId, playerId, eventType, over } = action.payload;
      if (state.appliedEventIds.has(eventId)) return state;

      const playerMap = PLAYERS.find(p => p.id === playerId);
      const oldStats = state.playerStats[playerId] || {};
      const newStats = applyEventToStats(oldStats, eventType);
      const newPlayerStats = { ...state.playerStats, [playerId]: newStats };
      const newRankedTeams = computeRankings(newPlayerStats);
      const myRanked = newRankedTeams.find(t => t.teamId === MY_TEAM.id);

      const eventDescMap = {
        boundary: `${playerMap?.name ?? playerId} hits a boundary (4 runs)`,
        six: `${playerMap?.name ?? playerId} launches a six`,
        wicket: `${playerMap?.name ?? playerId} takes a wicket`,
        catch: `${playerMap?.name ?? playerId} takes a catch`,
        dot_ball: `${playerMap?.name ?? playerId} bowls a dot ball`,
      };

      const newEvent = {
        id: eventId,
        over: over || `${14 + Math.floor(state.eventCounter / 6)}.${state.eventCounter % 6}`,
        type: eventType,
        player: playerId,
        desc: eventDescMap[eventType] || `Event applied`,
        simulated: true,
      };

      const lastHistory = state.rankHistory[state.rankHistory.length - 1] || {};
      const newRankHistoryEntry = {
        over: newEvent.over.split('.')[0],
        rank: myRanked?.rank ?? lastHistory.rank,
        points: myRanked?.points ?? lastHistory.points,
        simulated: true,
      };

      const newApplied = new Set(state.appliedEventIds);
      newApplied.add(eventId);

      return {
        ...state,
        playerStats: newPlayerStats,
        rankedTeams: newRankedTeams,
        matchEvents: [...state.matchEvents, newEvent],
        rankHistory: [...state.rankHistory, newRankHistoryEntry],
        appliedEventIds: newApplied,
        eventCounter: state.eventCounter + 1,
        aiExplanation: null,
      };
    }

    case 'RESET': {
      const rankedTeams = computeRankings(PLAYER_STATS_CURRENT);
      return {
        ...buildInitialState(),
        rankedTeams,
      };
    }

    case 'SET_AI_LOADING':
      return { ...state, aiLoading: action.payload, aiError: null };

    case 'SET_AI_EXPLANATION':
      return { ...state, aiExplanation: action.payload, aiLoading: false, aiError: null };

    case 'SET_AI_ERROR':
      return { ...state, aiError: action.payload, aiLoading: false };

    case 'SET_SIMULATION_TARGET':
      return { ...state, simulationTarget: action.payload };

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const saved = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      parsed.appliedEventIds = new Set(parsed.appliedEventIds || [])
      return parsed;
    } catch {
      return null;
    }
  })();

  const [state, dispatch] = useReducer(reducer, saved ?? buildInitialState());

  useEffect(() => {
    try {
      const toSave = {
        ...state,
        appliedEventIds: [...state.appliedEventIds],
        aiExplanation: null,
        aiLoading: false,
        aiError: null,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {}
  }, [state]);

  const applyEvent = useCallback((playerId, eventType) => {
    const eventId = `sim-evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    dispatch({ type: 'APPLY_EVENT', payload: { eventId, playerId, eventType } });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }, []);

  const setAiLoading = useCallback((v) => dispatch({ type: 'SET_AI_LOADING', payload: v }), []);
  const setAiExplanation = useCallback((v) => dispatch({ type: 'SET_AI_EXPLANATION', payload: v }), []);
  const setAiError = useCallback((v) => dispatch({ type: 'SET_AI_ERROR', payload: v }), []);
  const setSimulationTarget = useCallback((v) => dispatch({ type: 'SET_SIMULATION_TARGET', payload: v }), []);

  const myRanked = state.rankedTeams.find(t => t.teamId === MY_TEAM.id);
  const myCurrentRank = myRanked?.rank ?? '-';
  const myCurrentPoints = myRanked?.points ?? 0;
  const prevHistory = state.rankHistory[state.rankHistory.length - 2] || RANK_HISTORY[RANK_HISTORY.length - 2] || {};
  const myPreviousRank = prevHistory.rank ?? 124;
  const rankChange = myCurrentRank - myPreviousRank;

  const playerMap = Object.fromEntries(PLAYERS.map(p => [p.id, p]));

  return (
    <AppContext.Provider value={{
      state,
      myRanked,
      myCurrentRank,
      myCurrentPoints,
      myPreviousRank,
      rankChange,
      playerMap,
      myTeam: MY_TEAM,
      contestInfo: CONTEST_INFO,
      matchInfo: MATCH_INFO,
      players: PLAYERS,
      applyEvent,
      reset,
      setAiLoading,
      setAiExplanation,
      setAiError,
      setSimulationTarget,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
