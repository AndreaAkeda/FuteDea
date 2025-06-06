import { useState, useEffect } from 'react';
import { GameTimer } from '@/components/GameTimer';
import { TeamPanel } from '@/components/TeamPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { XGChart } from '@/components/XGChart';
import { TrendAlerts } from '@/components/TrendAlerts';
import { ExportPanel } from '@/components/ExportPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PopoutButton } from '@/components/PopoutButton';
import { GameInfoPanel } from '@/components/GameInfoPanel';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export interface GameEvent {
  id: string;
  team: 'home' | 'away';
  type: 'possession' | 'shot_on_target' | 'shot_off_target' | 'dangerous_shot' | 'corner' | 'dangerous_foul' | 'red_card';
  time: number;
  xgValue: number;
}

export interface TeamStats {
  possession: number;
  shotsOnTarget: number;
  shotsOffTarget: number;
  dangerousShots: number;
  corners: number;
  dangerousFouls: number;
  redCards: number;
  totalXG: number;
}

const Index = () => {
  const [gameTime, setGameTime] = useState(0);
  const [gameSeconds, setGameSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [homeTeamName, setHomeTeamName] = useState('Casa');
  const [awayTeamName, setAwayTeamName] = useState('Visitante');
  const { toast } = useToast();

  const [homeStats, setHomeStats] = useState<TeamStats>({
    possession: 0,
    shotsOnTarget: 0,
    shotsOffTarget: 0,
    dangerousShots: 0,
    corners: 0,
    dangerousFouls: 0,
    redCards: 0,
    totalXG: 0
  });

  const [awayStats, setAwayStats] = useState<TeamStats>({
    possession: 0,
    shotsOnTarget: 0,
    shotsOffTarget: 0,
    dangerousShots: 0,
    corners: 0,
    dangerousFouls: 0,
    redCards: 0,
    totalXG: 0
  });

  // Game timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setGameSeconds(prev => {
          if (prev >= 59) {
            setGameTime(prevTime => {
              const newTime = prevTime + 1;
              // Stop at 90 minutes
              if (newTime >= 90) {
                setIsPlaying(false);
                return 90;
              }
              return newTime;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // 1 second intervals
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Manual time change handler
  const handleTimeChange = (newTime: number) => {
    setGameTime(newTime);
    setGameSeconds(0);
    // Pause the game when manually changing time
    if (isPlaying) {
      setIsPlaying(false);
    }
    
    toast({
      title: "Tempo alterado",
      description: `Tempo ajustado para ${newTime}:00 ${newTime <= 45 ? '(1º Tempo)' : '(2º Tempo)'}`,
    });
  };

  // Calculate xG based on event type and game context
  const calculateXG = (eventType: string, time: number): number => {
    const baseValues = {
      'shot_on_target': 0.15,
      'dangerous_shot': 0.25,
      'shot_off_target': 0.05,
      'corner': 0.03,
      'dangerous_foul': 0.08,
      'possession': 0.01,
      'red_card': 0.0
    };
    
    // Time modifier (higher xG in final minutes)
    const timeModifier = time > 80 ? 1.2 : time > 70 ? 1.1 : 1.0;
    
    return (baseValues[eventType as keyof typeof baseValues] || 0) * timeModifier;
  };

  const addEvent = (team: 'home' | 'away', eventType: string) => {
    const xgValue = calculateXG(eventType, gameTime);
    const newEvent: GameEvent = {
      id: Date.now().toString(),
      team,
      type: eventType as GameEvent['type'],
      time: gameTime,
      xgValue
    };

    setEvents(prev => [...prev, newEvent]);

    // Update stats
    const updateStats = (stats: TeamStats): TeamStats => {
      const updated = { ...stats };
      
      switch (eventType) {
        case 'possession':
          updated.possession += 1;
          break;
        case 'shot_on_target':
          updated.shotsOnTarget += 1;
          break;
        case 'shot_off_target':
          updated.shotsOffTarget += 1;
          break;
        case 'dangerous_shot':
          updated.dangerousShots += 1;
          break;
        case 'corner':
          updated.corners += 1;
          break;
        case 'dangerous_foul':
          updated.dangerousFouls += 1;
          break;
        case 'red_card':
          updated.redCards += 1;
          break;
      }
      
      updated.totalXG += xgValue;
      return updated;
    };

    if (team === 'home') {
      setHomeStats(updateStats);
    } else {
      setAwayStats(updateStats);
    }

    toast({
      title: "Evento registrado",
      description: `${eventType.replace('_', ' ')} - ${team.toUpperCase()} - ${gameTime}:${gameSeconds.toString().padStart(2, '0')}`,
    });
  };

  const resetGame = () => {
    setGameTime(0);
    setGameSeconds(0);
    setIsPlaying(false);
    setEvents([]);
    setHomeStats({
      possession: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      dangerousShots: 0,
      corners: 0,
      dangerousFouls: 0,
      redCards: 0,
      totalXG: 0
    });
    setAwayStats({
      possession: 0,
      shotsOnTarget: 0,
      shotsOffTarget: 0,
      dangerousShots: 0,
      corners: 0,
      dangerousFouls: 0,
      redCards: 0,
      totalXG: 0
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
      <div className="container mx-auto p-2 sm:p-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ⚽ FutDea
                </h1>
                <span className={`text-sm font-medium px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  Versão - 1.2
                </span>
              </div>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Criado por Andrea com apoio do Trader Draco
              </p>
            </div>
            <PopoutButton />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={setIsDarkMode} />
            <ExportPanel events={events} homeStats={homeStats} awayStats={awayStats} />
          </div>
        </div>

        {/* Game Info Panel */}
        <GameInfoPanel isDarkMode={isDarkMode} />

        {/* Team Names */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Time da Casa
            </label>
            <Input
              value={homeTeamName}
              onChange={(e) => setHomeTeamName(e.target.value)}
              placeholder="Nome do time da casa"
              className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Time Visitante
            </label>
            <Input
              value={awayTeamName}
              onChange={(e) => setAwayTeamName(e.target.value)}
              placeholder="Nome do time visitante"
              className={isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
            />
          </div>
        </div>

        {/* Game Timer */}
        <GameTimer 
          gameTime={gameTime}
          gameSeconds={gameSeconds}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onReset={resetGame}
          onTimeChange={handleTimeChange}
          isDarkMode={isDarkMode}
        />

        {/* Main Game Area - Always three columns side by side */}
        <div className="mb-4 sm:mb-6">
          <div className="grid grid-cols-3 gap-1 sm:gap-4 lg:gap-6">
            {/* Home Team */}
            <TeamPanel
              team="home"
              teamName={homeTeamName}
              stats={homeStats}
              onAddEvent={addEvent}
              isDarkMode={isDarkMode}
            />

            {/* Stats Panel */}
            <StatsPanel
              homeStats={homeStats}
              awayStats={awayStats}
              isDarkMode={isDarkMode}
            />

            {/* Away Team */}
            <TeamPanel
              team="away"
              teamName={awayTeamName}
              stats={awayStats}
              onAddEvent={addEvent}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Charts and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <XGChart events={events} isDarkMode={isDarkMode} />
          <TrendAlerts 
            homeStats={homeStats} 
            awayStats={awayStats} 
            gameTime={gameTime}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
