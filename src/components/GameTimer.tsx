
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameTimerProps {
  gameTime: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  isDarkMode: boolean;
}

export const GameTimer = ({ gameTime, isPlaying, onPlayPause, onReset, isDarkMode }: GameTimerProps) => {
  const formatTime = (minutes: number) => {
    return `${minutes}'`;
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-lg mb-6 transition-all duration-300`}>
      <div className="flex items-center justify-center space-x-6">
        <div className={`text-6xl font-mono font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>
          {formatTime(gameTime)}
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
    </div>
  );
};
