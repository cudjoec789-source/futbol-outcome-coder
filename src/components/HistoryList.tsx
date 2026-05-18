import React from 'react';
import { Booking } from '../types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Copy, History as HistoryIcon, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface HistoryListProps {
  history: Booking[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Booking code copied!');
  };

  if (history.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed rounded-xl border-muted">
        <HistoryIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-20" />
        <p className="text-muted-foreground">No analysis history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <HistoryIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Recent Analyses</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((booking) => (
          <Card key={booking.id} className="border-muted bg-card/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(booking.createdAt).toLocaleDateString()}
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase block font-bold">Total Odds</span>
                  <span className="text-lg font-black text-primary">{booking.totalOdds.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-2 rounded flex justify-between items-center mb-3">
                <span className="font-mono font-black text-xl tracking-widest">{booking.code}</span>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(booking.code)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Selections ({booking.selections.length})</span>
                <div className="flex flex-wrap gap-1">
                  {booking.selections.map((s, idx) => (
                    <span key={idx} className="text-[9px] bg-secondary/30 px-1.5 py-0.5 rounded font-medium">
                      {s.prediction}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};