import React from 'react';
import { Selection } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Trash2, Ticket, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisSlipProps {
  selections: Selection[];
  onRemove: (matchId: string) => void;
  onClear: () => void;
  onGenerate: () => void;
}

export const AnalysisSlip: React.FC<AnalysisSlipProps> = ({ selections, onRemove, onClear, onGenerate }) => {
  const totalOdds = selections.reduce((acc, s) => acc * s.odd, 1);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Booking code copied to clipboard!');
  };

  return (
    <Card className="h-full flex flex-col border-primary/20 bg-primary/5 shadow-xl">
      <CardHeader className="flex-none bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Analysis Slip
          </CardTitle>
          {selections.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} className="text-primary-foreground/80 hover:text-white hover:bg-white/10 h-8">
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        {selections.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Ticket className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-sm font-medium">Your slip is empty</p>
            <p className="text-xs">Select matches to start your analysis</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {selections.map((s) => (
                  <div key={s.matchId} className="bg-background rounded-lg p-3 border border-border shadow-sm group">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold leading-tight line-clamp-1 flex-1 pr-2">{s.matchTitle}</span>
                      <button 
                        onClick={() => onRemove(s.matchId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {s.prediction === '1' ? 'Home Win' : s.prediction === 'X' ? 'Draw' : 'Away Win'}
                        </span>
                      </div>
                      <span className="text-sm font-black">@{s.odd.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex-none p-4 bg-background border-t space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Odds</span>
                <span className="text-2xl font-black text-primary">{totalOdds.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" 
                onClick={onGenerate}
              >
                Generate Booking Code
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};