
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

interface UserMenuProps {
  isDarkMode: boolean;
}

export const UserMenu = ({ isDarkMode }: UserMenuProps) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback className="bg-blue-500 text-white">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
        {user.user_metadata?.full_name || user.email}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className={`${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
};
