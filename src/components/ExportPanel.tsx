
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameEvent, TeamStats } from '@/pages/Index';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  events: GameEvent[];
  homeStats: TeamStats;
  awayStats: TeamStats;
}

export const ExportPanel = ({ events, homeStats, awayStats }: ExportPanelProps) => {
  const { toast } = useToast();

  const exportToCSV = () => {
    const headers = ['Tempo', 'Time', 'Evento', 'xG'];
    const rows = events.map(event => [
      event.time,
      event.team === 'home' ? 'Casa' : 'Visitante',
      event.type.replace('_', ' '),
      event.xgValue.toFixed(3)
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partida_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Exportação realizada",
      description: "Dados exportados em formato CSV",
    });
  };

  const exportToPDF = () => {
    // Simplified PDF export - would typically use a library like jsPDF
    const reportData = {
      date: new Date().toLocaleDateString('pt-BR'),
      homeStats,
      awayStats,
      events: events.length,
      totalXG: (homeStats.totalXG + awayStats.totalXG).toFixed(2)
    };

    console.log('PDF Export Data:', reportData);
    
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Export PDF será implementado em breve. Dados salvos no console.",
    });
  };

  return (
    <div className="flex space-x-2">
      <Button
        onClick={exportToCSV}
        variant="outline"
        size="sm"
        className="transition-all duration-300 hover:scale-105"
      >
        <Download className="h-4 w-4 mr-2" />
        CSV
      </Button>
      
      <Button
        onClick={exportToPDF}
        variant="outline"
        size="sm"
        className="transition-all duration-300 hover:scale-105"
      >
        <FileText className="h-4 w-4 mr-2" />
        PDF
      </Button>
    </div>
  );
};
