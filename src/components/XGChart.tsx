
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameEvent } from '@/pages/Index';

interface XGChartProps {
  events: GameEvent[];
  isDarkMode: boolean;
}

export const XGChart = ({ events, isDarkMode }: XGChartProps) => {
  // Process events to create cumulative xG data
  const processChartData = () => {
    const data: any[] = [{ time: 0, home: 0, away: 0 }];
    let homeXG = 0;
    let awayXG = 0;

    events.forEach(event => {
      if (event.team === 'home') {
        homeXG += event.xgValue;
      } else {
        awayXG += event.xgValue;
      }

      // Add data point
      data.push({
        time: event.time,
        home: parseFloat(homeXG.toFixed(2)),
        away: parseFloat(awayXG.toFixed(2))
      });
    });

    return data;
  };

  const chartData = processChartData();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-lg transition-all duration-300`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Evolução do xG
      </h2>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="time" 
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'Tempo (min)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              label={{ value: 'xG', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDarkMode ? '#ffffff' : '#000000'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="home" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Casa"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="away" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Visitante"
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
