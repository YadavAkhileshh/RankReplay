
export const MATCH_INFO = {
  id: 'match-001',
  title: 'MI vs CSK - IPL 2026',
  venue: 'Wankhede Stadium, Mumbai',
  date: '2026-04-06',
  status: 'live',
  innings: 2,
  currentOver: '14.3',
  battingTeam: 'CSK',
  bowlingTeam: 'MI',
  score: { CSK: { runs: 132, wickets: 4 }, MI: { runs: 168, wickets: 6 } },
};

export const PLAYERS = [
  { id: 'p01', name: 'Rohit Sharma',     team: 'MI',  role: 'BAT',  credit: 10.0 },
  { id: 'p02', name: 'Ishan Kishan',     team: 'MI',  role: 'WK',   credit: 9.0  },
  { id: 'p03', name: 'Suryakumar Yadav', team: 'MI',  role: 'BAT',  credit: 10.5 },
  { id: 'p04', name: 'Tilak Varma',      team: 'MI',  role: 'BAT',  credit: 9.0  },
  { id: 'p05', name: 'Hardik Pandya',    team: 'MI',  role: 'ALL',  credit: 10.0 },
  { id: 'p06', name: 'Tim David',        team: 'MI',  role: 'BAT',  credit: 8.5  },
  { id: 'p07', name: 'Jasprit Bumrah',   team: 'MI',  role: 'BOWL', credit: 10.5 },
  { id: 'p08', name: 'Gerald Coetzee',   team: 'MI',  role: 'BOWL', credit: 8.0  },
  { id: 'p09', name: 'MS Dhoni',         team: 'CSK', role: 'WK',   credit: 10.0 },
  { id: 'p10', name: 'Ruturaj Gaikwad',  team: 'CSK', role: 'BAT',  credit: 9.5  },
  { id: 'p11', name: 'Devon Conway',     team: 'CSK', role: 'BAT',  credit: 9.0  },
  { id: 'p12', name: 'Moeen Ali',        team: 'CSK', role: 'ALL',  credit: 9.0  },
  { id: 'p13', name: 'Shivam Dube',      team: 'CSK', role: 'ALL',  credit: 9.0  },
  { id: 'p14', name: 'Ravindra Jadeja',  team: 'CSK', role: 'ALL',  credit: 9.5  },
  { id: 'p15', name: 'Deepak Chahar',    team: 'CSK', role: 'BOWL', credit: 8.5  },
  { id: 'p16', name: 'Tushar Deshpande', team: 'CSK', role: 'BOWL', credit: 8.0  },
  { id: 'p17', name: 'Naman Dhir',       team: 'MI',  role: 'ALL',  credit: 7.5  },
  { id: 'p18', name: 'Piyush Chawla',    team: 'MI',  role: 'BOWL', credit: 7.5  },
];


export const PLAYER_STATS_PREV = {
  p01: { runs: 45, fours: 5, sixes: 2, balls_faced: 28, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p02: { runs: 12, fours: 1, sixes: 0, balls_faced: 10, dismissed: true, wickets: 0, catches: 1, dot_balls: 0 },
  p03: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 0, catches: 1, dot_balls: 0 },
  p04: { runs: 18, fours: 2, sixes: 0, balls_faced: 16, dismissed: true, wickets: 0, catches: 0, dot_balls: 0 },
  p05: { runs: 22, fours: 1, sixes: 1, balls_faced: 14, dismissed: false, wickets: 1, catches: 1, dot_balls: 4, lbw_wickets: 0, bowled_wickets: 1 },
  p06: { runs: 38, fours: 2, sixes: 2, balls_faced: 20, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p07: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 3, catches: 0, dot_balls: 8, lbw_wickets: 1, bowled_wickets: 1 },
  p08: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 1, catches: 0, dot_balls: 3, lbw_wickets: 0, bowled_wickets: 0 },
  p09: { runs: 5,  fours: 0, sixes: 0, balls_faced: 8,  dismissed: false, wickets: 0, catches: 0, stumpings: 1, dot_balls: 0 },
  p10: { runs: 62, fours: 6, sixes: 2, balls_faced: 44, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p11: { runs: 31, fours: 3, sixes: 0, balls_faced: 24, dismissed: true, wickets: 0, catches: 0, dot_balls: 0 },
  p12: { runs: 10, fours: 1, sixes: 0, balls_faced: 9,  dismissed: false, wickets: 1, catches: 0, dot_balls: 5 },
  p13: { runs: 14, fours: 1, sixes: 1, balls_faced: 10, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p14: { runs: 8,  fours: 0, sixes: 0, balls_faced: 7,  dismissed: false, wickets: 2, catches: 1, dot_balls: 6 },
  p15: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 0, catches: 1, dot_balls: 4 },
  p16: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 1, catches: 0, dot_balls: 5 },
  p17: { runs: 4,  fours: 0, sixes: 0, balls_faced: 4,  dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p18: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 0, catches: 1, dot_balls: 3 },
};


export const PLAYER_STATS_CURRENT = {
  p01: { runs: 45, fours: 5, sixes: 2, balls_faced: 28, dismissed: true, wickets: 0, catches: 0, dot_balls: 0 },
  p02: { runs: 12, fours: 1, sixes: 0, balls_faced: 10, dismissed: true, wickets: 0, catches: 1, dot_balls: 0 },
  p03: { runs: 36, fours: 3, sixes: 2, balls_faced: 18, dismissed: false, wickets: 0, catches: 1, dot_balls: 0 },
  p04: { runs: 18, fours: 2, sixes: 0, balls_faced: 16, dismissed: true, wickets: 0, catches: 0, dot_balls: 0 },
  p05: { runs: 22, fours: 1, sixes: 1, balls_faced: 14, dismissed: false, wickets: 1, catches: 1, dot_balls: 4, lbw_wickets: 0, bowled_wickets: 1 },
  p06: { runs: 62, fours: 4, sixes: 4, balls_faced: 32, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p07: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 3, catches: 0, dot_balls: 8, lbw_wickets: 1, bowled_wickets: 1 },
  p08: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 1, catches: 0, dot_balls: 3, lbw_wickets: 0, bowled_wickets: 0 },
  p09: { runs: 22, fours: 1, sixes: 1, balls_faced: 18, dismissed: false, wickets: 0, catches: 0, stumpings: 1, dot_balls: 0 },
  p10: { runs: 74, fours: 7, sixes: 2, balls_faced: 52, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p11: { runs: 31, fours: 3, sixes: 0, balls_faced: 24, dismissed: true, wickets: 0, catches: 0, dot_balls: 0 },
  p12: { runs: 10, fours: 1, sixes: 0, balls_faced: 9,  dismissed: false, wickets: 1, catches: 0, dot_balls: 5 },
  p13: { runs: 28, fours: 2, sixes: 2, balls_faced: 16, dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p14: { runs: 8,  fours: 0, sixes: 0, balls_faced: 7,  dismissed: false, wickets: 2, catches: 1, dot_balls: 6 },
  p15: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 0, catches: 1, dot_balls: 4 },
  p16: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 1, catches: 0, dot_balls: 5 },
  p17: { runs: 4,  fours: 0, sixes: 0, balls_faced: 4,  dismissed: false, wickets: 0, catches: 0, dot_balls: 0 },
  p18: { runs: 0,  fours: 0, sixes: 0, balls_faced: 0,  dismissed: false, wickets: 0, catches: 1, dot_balls: 3 },
};


export const MY_TEAM = {
  id: 'team-user',
  name: 'Akhilesh XI',
  captain: 'p07',
  viceCaptain: 'p10',
  players: [
    { playerId: 'p01', role: 'normal' },
    { playerId: 'p03', role: 'normal' },
    { playerId: 'p05', role: 'normal' },
    { playerId: 'p06', role: 'normal' },
    { playerId: 'p07', role: 'captain' },
    { playerId: 'p08', role: 'normal' },
    { playerId: 'p09', role: 'normal' },
    { playerId: 'p10', role: 'vice_captain' },
    { playerId: 'p12', role: 'normal' },
    { playerId: 'p14', role: 'normal' },
    { playerId: 'p16', role: 'normal' },
  ],
};


const TEAM_NAMES = [
  'RoHit Fans XI', 'BumrahBrigade', 'SKY Rockets', 'ThalaForever',
  'MSDhoni Ultras', 'CSK Yellove', 'IPL Fanatics', 'SixMaster XI',
  'RunMachine', 'WicketWizards', 'FantasyKings', 'CricketPros',
  'AllRounder XI', 'PaceAttack', 'SpinMasters', 'BattingFirst',
  'PowerPlay XI', 'DeathOvers', 'FlyingStumps', 'GoldenArm',
  'SkyHigh XI', 'MumbaiManiacs', 'ChennaiChamps', 'WankhederWave',
  'ChepauckRoar', 'IPL Legends', 'T20 Warriors', 'SixHitters',
  'BoundaryKings', 'DotBallDevils', 'CaptainChoice', 'VCMasters',
  'StrikeRate XI', 'EconomyRate', 'MaidenOver XI', 'FullToss FC',
  'YorkerUnited', 'SlowBall XI', 'GoodLength XI', 'OffCutter XI',
  'LegsideFlick', 'CoverDrive XI', 'PullShot FC', 'SweepStroke XI',
  'LateSwing XI', 'ReverseSwing', 'BouncerKings', 'SlipCordon XI',
  'PointFielder', 'FineLeg FC',
];

function generateCompetitorTeams() {
  const playerPool = PLAYERS.map(p => p.id);
  const teams = [];

  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(seed) / 0x7fffffff;
  };

  for (let i = 0; i < 50; i++) {
    const shuffled = [...playerPool].sort(() => rand() - 0.5);
    const selected = shuffled.slice(0, 11);
    const capIdx = Math.floor(rand() * 11);
    let vcIdx = Math.floor(rand() * 10);
    if (vcIdx >= capIdx) vcIdx++;

    teams.push({
      id: `team-${String(i + 1).padStart(3, '0')}`,
      name: TEAM_NAMES[i],
      captain: selected[capIdx],
      viceCaptain: selected[vcIdx],
      players: selected.map((pid, idx) => ({
        playerId: pid,
        role: idx === capIdx ? 'captain' : idx === vcIdx ? 'vice_captain' : 'normal',
      })),
    });
  }
  return teams;
}

export const COMPETITOR_TEAMS = generateCompetitorTeams();


export const INITIAL_MATCH_EVENTS = [
  { id: 'evt-001', over: '1.3',  type: 'boundary',  player: 'p10', desc: 'Ruturaj Gaikwad drives Bumrah for 4' },
  { id: 'evt-002', over: '2.1',  type: 'wicket',    player: 'p07', desc: 'Bumrah bowls Conway for a duck, bowled' },
  { id: 'evt-003', over: '3.4',  type: 'six',       player: 'p10', desc: 'Gaikwad pulls Coetzee over mid-wicket for 6' },
  { id: 'evt-004', over: '4.2',  type: 'catch',     player: 'p05', desc: 'Pandya takes a sharp catch at cover off his own bowling' },
  { id: 'evt-005', over: '5.0',  type: 'wicket',    player: 'p07', desc: 'Bumrah traps Moeen Ali LBW, review fails' },
  { id: 'evt-006', over: '6.2',  type: 'boundary',  player: 'p01', desc: 'Rohit Sharma cuts Chahar for 4' },
  { id: 'evt-007', over: '7.1',  type: 'six',       player: 'p06', desc: 'Tim David launches Jadeja into the stands' },
  { id: 'evt-008', over: '8.3',  type: 'wicket',    player: 'p14', desc: 'Jadeja gets Rohit stumped off a quicker delivery' },
  { id: 'evt-009', over: '9.0',  type: 'dot_ball',  player: 'p07', desc: 'Bumrah bowls three dots to Dhoni in a row' },
  { id: 'evt-010', over: '10.2', type: 'boundary',  player: 'p13', desc: 'Shivam Dube flicks Pandya for 4' },
  { id: 'evt-011', over: '11.4', type: 'six',       player: 'p13', desc: 'Dube hammers Coetzee over long-on for 6' },
  { id: 'evt-012', over: '12.1', type: 'wicket',    player: 'p16', desc: 'Tushar Deshpande clean-bowls Tilak Varma' },
  { id: 'evt-013', over: '13.3', type: 'six',       player: 'p06', desc: 'Tim David deposits Jadeja into row Z' },
  { id: 'evt-014', over: '14.0', type: 'catch',     player: 'p14', desc: 'Jadeja takes a diving catch at mid-off' },
];


export const RANK_HISTORY = [
  { over: '1',  rank: 82,  points: 245 },
  { over: '2',  rank: 74,  points: 268 },
  { over: '3',  rank: 91,  points: 282 },
  { over: '4',  rank: 68,  points: 301 },
  { over: '5',  rank: 55,  points: 324 },
  { over: '6',  rank: 48,  points: 342 },
  { over: '7',  rank: 52,  points: 358 },
  { over: '8',  rank: 61,  points: 371 },
  { over: '9',  rank: 88,  points: 385 },
  { over: '10', rank: 124, points: 420 },
  { over: '11', rank: 156, points: 428 },
  { over: '12', rank: 213, points: 431 },
  { over: '13', rank: 298, points: 435 },
  { over: '14', rank: 381, points: 438 },
];

export const CONTEST_INFO = {
  name: 'IPL Mega Contest',
  totalTeams: 51,
  prizePool: '₹50 Lakh',
  entryFee: '₹49',
  type: 'Grand League',
};
