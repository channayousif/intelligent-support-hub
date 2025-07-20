import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  title?: string;
  status?: string;
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

/**
 * Component for chat interface header
 */
export function ChatHeader({ 
  title = "AI Support Assistant", 
  status = "Online",
  statusVariant = "secondary"
}: ChatHeaderProps) {
  return (
    <div className="border-b bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-blue-600" />
        <span className="font-semibold text-gray-900">{title}</span>
        <Badge variant={statusVariant} className="ml-auto">
          {status}
        </Badge>
      </div>
    </div>
  );
} 