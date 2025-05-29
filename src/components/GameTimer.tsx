
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface GameTimerProps {
  gameTime: number;
  gameSeconds: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onTimeChange: (time: number) => void;
  isDarkMode: boolean;
}

export const GameTimer = ({ gameTime, gameSeconds, isPlaying, onPlayPause, onReset, onTimeChange, isDarkMode }: GameTimerProps) => {
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    onTimeChange(value[0]);
  };

  const getTimeDisplayAndPeriod = (time: number) => {
    if (time <= 45) {
      return { display: time, period: '1º Tempo' };
    } else {
      return { display: time, period: '2º Tempo' };
    }
  };

  const { display, period } = getTimeDisplayAndPeriod(gameTime);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-lg mb-6 transition-all duration-300`}>
      {/* Timer Display */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="text-center">
          <div className={`text-6xl font-mono font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>
            {formatTime(display, gameSeconds)}
          </div>
          <div className={`text-sm font-medium mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {period}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onPlayPause}
            className={`${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-all duration-300 hover:scale-105`}
            size="lg"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50'} transition-all duration-300 hover:scale-105`}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <div className={`text-center text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Timeline do Jogo
        </div>
        
        <div className="relative">
          <Slider
            value={[gameTime]}
            onValueChange={handleTimeChange}
            max={90}
            min={0}
            step={1}
            className="w-full"
          />
          
          {/* Timeline markers */}
          <div className="flex justify-between mt-2 text-xs">
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>0'</div>
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
              45' <span className="text-yellow-600">(HT)</span>
            </div>
            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>90'</div>
          </div>
          
          {/* Half-time indicator */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className={`w-0.5 h-6 ${isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'}`}></div>
          </div>
        </div>

        {/* Quick time buttons */}
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            onClick={() => onTimeChange(0)}
            variant="outline"
            size="sm"
            className={`text-xs ${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            Início
          </Button>
          <Button
            onClick={() => onTimeChange(45)}
            variant="outline"
            size="sm"
            className={`text-xs ${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            Half Time
          </Button>
          <Button
            onClick={() => onTimeChange(90)}
            variant="outline"
            size="sm"
            className={`text-xs ${isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            Full Time
          </Button>
        </div>
      </div>
    </div>
  );
};
