import { Match } from './types';

export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    league: 'Premier League',
    homeTeam: { name: 'Arsenal', logo: '⚽', form: ['W', 'W', 'D', 'W', 'L'] },
    awayTeam: { name: 'Man City', logo: '🏆', form: ['W', 'D', 'W', 'W', 'W'] },
    time: '20:00',
    date: '2024-05-20',
    odds: { home: 2.45, draw: 3.40, away: 2.80, over25: 1.75, under25: 2.10 }
  },
  {
    id: '2',
    league: 'La Liga',
    homeTeam: { name: 'Real Madrid', logo: '👑', form: ['W', 'W', 'W', 'W', 'D'] },
    awayTeam: { name: 'Barcelona', logo: '🔵', form: ['W', 'L', 'W', 'D', 'W'] },
    time: '21:00',
    date: '2024-05-21',
    odds: { home: 1.95, draw: 3.60, away: 3.80, over25: 1.65, under25: 2.25 }
  },
  {
    id: '3',
    league: 'Champions League',
    homeTeam: { name: 'Bayern Munich', logo: '🔴', form: ['L', 'W', 'W', 'D', 'W'] },
    awayTeam: { name: 'PSG', logo: '🗼', form: ['W', 'W', 'L', 'W', 'W'] },
    time: '20:45',
    date: '2024-05-22',
    odds: { home: 2.10, draw: 3.50, away: 3.20, over25: 1.55, under25: 2.45 }
  },
  {
    id: '4',
    league: 'Serie A',
    homeTeam: { name: 'Inter Milan', logo: '🐍', form: ['W', 'W', 'W', 'W', 'W'] },
    awayTeam: { name: 'Juventus', logo: '🦓', form: ['D', 'D', 'W', 'L', 'W'] },
    time: '18:00',
    date: '2024-05-23',
    odds: { home: 1.85, draw: 3.30, away: 4.50, over25: 1.90, under25: 1.90 }
  },
  {
    id: '5',
    league: 'Bundesliga',
    homeTeam: { name: 'Dortmund', logo: '🐝', form: ['W', 'L', 'W', 'W', 'L'] },
    awayTeam: { name: 'Leverkusen', logo: '💊', form: ['W', 'W', 'W', 'W', 'W'] },
    time: '15:30',
    date: '2024-05-24',
    odds: { home: 2.60, draw: 3.70, away: 2.50, over25: 1.50, under25: 2.60 }
  }
];