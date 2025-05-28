
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PopoutButton = () => {
  const openInNewWindow = () => {
    const newWindow = window.open(window.location.href, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.focus();
    }
  };

  return (
    <Button
      onClick={openInNewWindow}
      variant="outline"
      size="sm"
      className="transition-all duration-300 hover:scale-105"
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      Abrir em nova janela
    </Button>
  );
};
