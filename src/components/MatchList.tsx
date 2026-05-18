import React from 'react';
import { Match, Selection } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Clock, TrendingUp } from 'lucide-react';

interface MatchListProps {
  matches: Match[];
  onSelect: (selection: Selection) => void;
  activeSelections: Selection[];
}

export const MatchList: React.FC<MatchListProps> = ({ matches, onSelect, activeSelections }) => {
  const isSelected = (matchId: string, prediction: string) => {
    return activeSelections.some(s => s.matchId === matchId && s.prediction === prediction);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Hot Matches
        </h2>
        <Badge variant="outline">{matches.length} Matches Today</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="overflow-hidden border-muted hover:border-primary/50 transition-colors">
            <CardHeader className="bg-muted/30 py-2 px-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{match.league}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {match.time}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">
                    {match.homeTeam.logo}
                  </div>
                  <span className="text-sm font-bold text-center leading-tight">{match.homeTeam.name}</span>
                  <div className="flex gap-0.5">
                    {match.homeTeam.form.map((f, i) => (
                      <span key={i} className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] text-white ${f === 'W' ? 'bg-green-500' : f === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-2xl font-black text-muted-foreground italic">VS</div>

                <div className="flex flex-col items-center gap-2 w-1/3">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">
                    {match.awayTeam.logo}
                  </div>
                  <span className="text-sm font-bold text-center leading-tight">{match.awayTeam.name}</span>
                  <div className="flex gap-0.5">
                    {match.awayTeam.form.map((f, i) => (
                      <span key={i} className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] text-white ${f === 'W' ? 'bg-green-500' : f === 'D' ? 'bg-gray-400' : 'bg-red-500'}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={isSelected(match.id, '1') ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex flex-col h-auto py-2"
                  onClick={() => onSelect({ matchId: match.id, matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`, prediction: '1', odd: match.odds.home })}
                >
                  <span className="text-[10px] text-muted-foreground">Home</span>
                  <span className="font-bold">{match.odds.home}</span>
                </Button>
                <Button 
                  variant={isSelected(match.id, 'X') ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex flex-col h-auto py-2"
                  onClick={() => onSelect({ matchId: match.id, matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`, prediction: 'X', odd: match.odds.draw })}
                >
                  <span className="text-[10px] text-muted-foreground">Draw</span>
                  <span className="font-bold">{match.odds.draw}</span>
                </Button>
                <Button 
                  variant={isSelected(match.id, '2') ? 'default' : 'outline'} 
                  size="sm" 
                  className="flex flex-col h-auto py-2"
                  onClick={() => onSelect({ matchId: match.id, matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`, prediction: '2', odd: match.odds.away })}
                >
                  <span className="text-[10px] text-muted-foreground">Away</span>
                  <span className="font-bold">{match.odds.away}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};