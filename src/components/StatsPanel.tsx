import { TeamStats } from '@/pages/Index';

interface StatsPanelProps {
  homeStats: TeamStats;
  awayStats: TeamStats;
  isDarkMode: boolean;
}

export const StatsPanel = ({ homeStats, awayStats, isDarkMode }: StatsPanelProps) => {
  const totalShots = homeStats.shotsOnTarget + homeStats.shotsOffTarget + awayStats.shotsOnTarget + awayStats.shotsOffTarget;
  const totalXG = homeStats.totalXG + awayStats.totalXG;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg p-1 sm:p-6 border shadow-lg transition-all duration-300`}>
      <h2 className={`text-xs sm:text-2xl font-bold text-center mb-1 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Stats
      </h2>

      <div className="space-y-1 sm:space-y-4">
        {/* xG Comparison */}
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-red-50'} rounded-lg p-1 sm:p-4 transition-colors duration-300`}>
          <h3 className={`text-[10px] sm:text-lg font-semibold mb-1 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>xG</h3>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-sm sm:text-2xl font-bold text-blue-600">{homeStats.totalXG.toFixed(2)}</div>
              <div className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Casa</div>
            </div>
            <div className={`text-xs sm:text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>VS</div>
            <div className="text-center">
              <div className="text-sm sm:text-2xl font-bold text-red-600">{awayStats.totalXG.toFixed(2)}</div>
              <div className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Visit</div>
            </div>
          </div>
        </div>

        {/* Shots Comparison */}
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-1 sm:p-4 transition-colors duration-300`}>
          <h3 className={`text-[10px] sm:text-lg font-semibold mb-1 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Chutes</h3>
          <div className="space-y-0.5 sm:space-y-2">
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gol:</span>
              <span className="font-bold text-[10px] sm:text-sm">{homeStats.shotsOnTarget} - {awayStats.shotsOnTarget}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fora:</span>
              <span className="font-bold text-[10px] sm:text-sm">{homeStats.shotsOffTarget} - {awayStats.shotsOffTarget}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total:</span>
              <span className="font-bold text-green-600 text-[10px] sm:text-sm">{totalShots}</span>
            </div>
          </div>
        </div>

        {/* Other Stats */}
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-1 sm:p-4 transition-colors duration-300`}>
          <h3 className={`text-[10px] sm:text-lg font-semibold mb-1 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Outros</h3>
          <div className="space-y-0.5 sm:space-y-2">
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Escant:</span>
              <span className="font-bold text-[10px] sm:text-sm">{homeStats.corners} - {awayStats.corners}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Faltas:</span>
              <span className="font-bold text-[10px] sm:text-sm">{homeStats.dangerousFouls} - {awayStats.dangerousFouls}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>xG:</span>
              <span className="font-bold text-purple-600 text-[10px] sm:text-sm">{totalXG.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
