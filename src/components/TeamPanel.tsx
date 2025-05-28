
import { Button } from '@/components/ui/button';
import { TeamStats } from '@/pages/Index';

interface TeamPanelProps {
  team: 'home' | 'away';
  teamName: string;
  stats: TeamStats;
  onAddEvent: (team: 'home' | 'away', eventType: string) => void;
  isDarkMode: boolean;
}

export const TeamPanel = ({ team, teamName, stats, onAddEvent, isDarkMode }: TeamPanelProps) => {
  const eventButtons = [
    { type: 'possession', label: '⚡ Posse Ofensiva', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'dangerous_shot', label: '🎯 Chute Perigoso', color: 'bg-red-500 hover:bg-red-600' },
    { type: 'shot_on_target', label: '✅ Chute Certeiro', color: 'bg-green-500 hover:bg-green-600' },
    { type: 'shot_off_target', label: '❌ Chute pra Fora', color: 'bg-gray-500 hover:bg-gray-600' },
    { type: 'corner', label: '🚩 Escanteio', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { type: 'dangerous_foul', label: '⚠️ Falta Perigosa', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-3 sm:p-6 border shadow-lg transition-all duration-300`}>
      <div className="text-center mb-3 sm:mb-6">
        <h2 className={`text-lg sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          {teamName}
        </h2>
        <div className={`text-xl sm:text-3xl font-bold ${team === 'home' ? 'text-blue-600' : 'text-red-600'}`}>
          xG: {stats.totalXG.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mb-4 sm:mb-6">
        {eventButtons.map((button) => (
          <Button
            key={button.type}
            onClick={() => onAddEvent(team, button.type)}
            className={`${button.color} text-white text-xs sm:text-sm py-2 px-2 h-8 sm:h-10 transition-all duration-300 hover:scale-105 active:scale-95`}
            size="sm"
          >
            {button.label}
          </Button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3 transition-colors duration-300`}>
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div>Chutes no gol: <span className="font-bold text-green-600">{stats.shotsOnTarget}</span></div>
            <div>Chutes pra fora: <span className="font-bold text-red-600">{stats.shotsOffTarget}</span></div>
            <div>Perigosos: <span className="font-bold text-orange-600">{stats.dangerousShots}</span></div>
          </div>
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div>Escanteios: <span className="font-bold text-yellow-600">{stats.corners}</span></div>
            <div>Faltas: <span className="font-bold text-purple-600">{stats.dangerousFouls}</span></div>
            <div>Posses: <span className="font-bold text-blue-600">{stats.possession}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
