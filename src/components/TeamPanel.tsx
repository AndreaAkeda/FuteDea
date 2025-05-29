

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
    { type: 'possession', label: 'Ataque P', color: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'dangerous_shot', label: 'Finalização P', color: 'bg-red-500 hover:bg-red-600' },
    { type: 'shot_on_target', label: 'Chute Cert', color: 'bg-green-500 hover:bg-green-600' },
    { type: 'shot_off_target', label: 'Chute Fora', color: 'bg-gray-500 hover:bg-gray-600' },
    { type: 'corner', label: '🚩 Escanteio', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { type: 'dangerous_foul', label: '⚠️ Falta', color: 'bg-orange-500 hover:bg-orange-600' },
    { type: 'red_card', label: '🟥 Cartão Vermelho', color: 'bg-red-700 hover:bg-red-800' }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-1 sm:p-4 border shadow-lg transition-all duration-300`}>
      <div className="text-center mb-1 sm:mb-4">
        <h2 className={`text-xs sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
          {teamName}
        </h2>
        <div className={`text-sm sm:text-2xl font-bold ${team === 'home' ? 'text-blue-600' : 'text-red-600'}`}>
          xG: {stats.totalXG.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0.5 sm:gap-1 mb-1 sm:mb-4">
        {eventButtons.map((button) => (
          <Button
            key={button.type}
            onClick={() => onAddEvent(team, button.type)}
            className={`${button.color} text-white text-[10px] sm:text-xs py-0.5 sm:py-1 px-0.5 sm:px-1 h-4 sm:h-6 transition-all duration-300 hover:scale-105 active:scale-95`}
            size="sm"
          >
            {button.label}
          </Button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-1 sm:p-2 transition-colors duration-300`}>
        <div className="grid grid-cols-1 gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="truncate">No gol: <span className="font-bold text-green-600">{stats.shotsOnTarget}</span></div>
            <div className="truncate">Fora: <span className="font-bold text-red-600">{stats.shotsOffTarget}</span></div>
            <div className="truncate">Perig: <span className="font-bold text-orange-600">{stats.dangerousShots}</span></div>
            <div className="truncate">Escant: <span className="font-bold text-yellow-600">{stats.corners}</span></div>
            <div className="truncate">Faltas: <span className="font-bold text-purple-600">{stats.dangerousFouls}</span></div>
            <div className="truncate">Posses: <span className="font-bold text-blue-600">{stats.possession}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

