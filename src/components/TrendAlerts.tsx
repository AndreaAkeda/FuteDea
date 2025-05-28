
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { TeamStats } from '@/pages/Index';

interface TrendAlertsProps {
  homeStats: TeamStats;
  awayStats: TeamStats;
  gameTime: number;
  isDarkMode: boolean;
}

export const TrendAlerts = ({ homeStats, awayStats, gameTime, isDarkMode }: TrendAlertsProps) => {
  const totalXG = homeStats.totalXG + awayStats.totalXG;
  const totalShots = homeStats.shotsOnTarget + homeStats.shotsOffTarget + awayStats.shotsOnTarget + awayStats.shotsOffTarget;
  
  const generateAlerts = () => {
    const alerts = [];

    // Over/Under trends based on xG and shots
    if (totalXG > 2.5 && gameTime < 70) {
      alerts.push({
        type: 'over',
        message: 'Alta probabilidade de OVER 2.5 gols',
        icon: TrendingUp,
        color: 'text-green-600'
      });
    } else if (totalXG < 1.0 && gameTime > 60) {
      alerts.push({
        type: 'under',
        message: 'Jogo favorecendo UNDER 2.5 gols',
        icon: TrendingDown,
        color: 'text-blue-600'
      });
    }

    // High attack intensity
    if (totalShots > 15 && gameTime < 80) {
      alerts.push({
        type: 'attack',
        message: 'Jogo com alta intensidade ofensiva',
        icon: AlertTriangle,
        color: 'text-orange-600'
      });
    }

    // Dominant team alert
    const xgDifference = Math.abs(homeStats.totalXG - awayStats.totalXG);
    if (xgDifference > 1.0) {
      const dominantTeam = homeStats.totalXG > awayStats.totalXG ? 'Casa' : 'Visitante';
      alerts.push({
        type: 'dominance',
        message: `${dominantTeam} dominando as chances`,
        icon: TrendingUp,
        color: homeStats.totalXG > awayStats.totalXG ? 'text-blue-600' : 'text-red-600'
      });
    }

    // Late game alerts
    if (gameTime > 80 && totalXG < 1.5) {
      alerts.push({
        type: 'late_game',
        message: 'Poucas chances criadas - possível empate',
        icon: AlertTriangle,
        color: 'text-yellow-600'
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-lg transition-all duration-300`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Alertas de Tendência
      </h2>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum alerta no momento</p>
            <p className="text-sm">Continue acompanhando o jogo</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 flex items-center space-x-3 transition-all duration-300 hover:scale-105`}
            >
              <alert.icon className={`h-6 w-6 ${alert.color}`} />
              <div>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {alert.message}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Baseado em xG: {totalXG.toFixed(2)} | Tempo: {gameTime}'
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              {totalXG.toFixed(1)}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>xG Total</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {totalShots}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Finalizações</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {gameTime}'
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tempo</div>
          </div>
        </div>
      </div>
    </div>
  );
};
