import { Message } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Bot, User, Ticket } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onCreateTicket?: (message: string) => void;
}

/**
 * Component for displaying individual chat messages
 */
export function ChatMessage({ message, onCreateTicket }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'order-1' : ''}`}>
        <div
          className={`p-3 rounded-lg ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content}
        </div>

        {!isUser && onCreateTicket && (
          <div className="mt-2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCreateTicket(message.content)}
              className="text-xs"
            >
              <Ticket className="h-3 w-3 mr-1" />
              Create Ticket
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
} 