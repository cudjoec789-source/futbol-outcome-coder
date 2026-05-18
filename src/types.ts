export interface Team {
  name: string;
  logo: string;
  form: string[]; // e.g. ['W', 'D', 'L', 'W', 'W']
}

export interface Match {
  id: string;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
  odds: {
    home: number;
    draw: number;
    away: number;
    over25: number;
    under25: number;
  };
}

export interface Selection {
  matchId: string;
  matchTitle: string;
  prediction: string; // e.g. 'Home Win', 'Over 2.5'
  odd: number;
}

export interface Booking {
  id: string;
  code: string;
  selections: Selection[];
  totalOdds: number;
  createdAt: string;
}