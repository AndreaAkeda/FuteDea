
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface GameInfoPanelProps {
  isDarkMode: boolean;
}

export const GameInfoPanel = ({ isDarkMode }: GameInfoPanelProps) => {
  const [gameInfo, setGameInfo] = useState('');
  const [gameDate, setGameDate] = useState(new Date().toISOString().split('T')[0]);
  const [championship, setChampionship] = useState('');

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-4 border shadow-lg mb-4`}>
      <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Informações do Jogo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            Jogo
          </label>
          <Input
            value={gameInfo}
            onChange={(e) => setGameInfo(e.target.value)}
            placeholder="Ex: Rodada 15"
            className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            Data
          </label>
          <Input
            type="date"
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
            className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
            Campeonato
          </label>
          <Input
            value={championship}
            onChange={(e) => setChampionship(e.target.value)}
            placeholder="Ex: Brasileirão Série A"
            className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
          />
        </div>
      </div>
    </div>
  );
};
