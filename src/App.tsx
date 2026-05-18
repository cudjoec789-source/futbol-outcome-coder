import { useState, useEffect } from 'react';
import { MatchList } from './components/MatchList';
import { AnalysisSlip } from './components/AnalysisSlip';
import { HistoryList } from './components/HistoryList';
import { MOCK_MATCHES } from './mockData';
import { Selection, Booking } from './types';
import { Toaster, toast } from 'sonner';
import { Button } from './components/ui/button';
import { Search, History, LayoutDashboard, Menu, X, Trophy } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

function App() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [history, setHistory] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'matches' | 'history'>('matches');

  useEffect(() => {
    const saved = localStorage.getItem('booking-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleSelect = (selection: Selection) => {
    setSelections(prev => {
      const exists = prev.find(s => s.matchId === selection.matchId);
      if (exists) {
        if (exists.prediction === selection.prediction) {
          return prev.filter(s => s.matchId !== selection.matchId);
        }
        return prev.map(s => s.matchId === selection.matchId ? selection : s);
      }
      return [...prev, selection];
    });
  };

  const handleRemove = (matchId: string) => {
    setSelections(prev => prev.filter(s => s.matchId !== matchId));
  };

  const handleClear = () => {
    setSelections([]);
  };

  const generateBookingCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const totalOdds = selections.reduce((acc, s) => acc * s.odd, 1);
    
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      code,
      selections: [...selections],
      totalOdds,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [newBooking, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('booking-history', JSON.stringify(updatedHistory));
    
    toast.success('Booking Code Generated!', {
      description: `Your code: ${code}`,
      action: {
        label: 'Copy',
        onClick: () => navigator.clipboard.writeText(code),
      },
    });

    setSelections([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Toaster position="top-center" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-primary">
            <Trophy className="w-8 h-8 fill-primary" />
            <span>PITCH<span className="text-muted-foreground">PRO</span></span>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-4">
            <Button 
              variant={activeTab === 'matches' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('matches')}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'history' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('history')}
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
          </div>
          
          <div className="ml-auto md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <Button 
                    variant={activeTab === 'matches' ? 'default' : 'ghost'} 
                    className="justify-start"
                    onClick={() => { setActiveTab('matches') }}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'default' : 'ghost'} 
                    className="justify-start"
                    onClick={() => { setActiveTab('history') }}
                  >
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative h-[200px] md:h-[300px] overflow-hidden">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/9dddb901-aa42-48b0-99c0-b2ed88b9bf3d/stadium-hero-b3aff473-1779067386610.webp" 
          alt="Stadium" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="container max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg uppercase italic tracking-tighter">
              Analyze the Game. <br />
              <span className="text-primary">Master the Pitch.</span>
            </h1>
            <p className="text-white/80 max-w-md mt-2 text-sm md:text-base font-medium">
              Real-time match analysis tool for potential winners and booking code generation.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            {activeTab === 'matches' ? (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search leagues or teams..." 
                    className="w-full pl-10 pr-4 py-3 bg-card border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <MatchList 
                  matches={MOCK_MATCHES} 
                  onSelect={handleSelect} 
                  activeSelections={selections}
                />
              </>
            ) : (
              <HistoryList history={history} />
            )}
          </div>

          {/* Sidebar / Slip */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <AnalysisSlip 
              selections={selections}
              onRemove={handleRemove}
              onClear={handleClear}
              onGenerate={generateBookingCode}
            />
            
            <div className="mt-6 p-4 rounded-xl bg-secondary/20 border border-secondary/30 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-sm mb-1">Winning Tip</h3>
                <p className="text-xs text-muted-foreground">Always analyze home form and head-to-head records before making a final prediction.</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Trophy className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-black text-xl tracking-tighter text-muted-foreground mb-4">
            <Trophy className="w-6 h-6" />
            <span>PITCHPRO</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            © 2024 PitchPro Analysis Tool. For entertainment and informational purposes only. Gamble responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;