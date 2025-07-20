import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface ChatWelcomeProps {
  onQuickMessage: (message: string) => void;
}

/**
 * Component for chat welcome screen
 */
export function ChatWelcome({ onQuickMessage }: ChatWelcomeProps) {
  const quickMessages = [
    "How do I reset my password?",
    "What are your pricing plans?",
    "How do I contact support?",
    "Where can I find documentation?"
  ];

  return (
    <div className="text-center py-12">
      <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Welcome to Support Hub
      </h3>
      <p className="text-gray-600 mb-6">
        I'm here to help you with any questions about our products and services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
        {quickMessages.map((message, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuickMessage(message)}
            className="text-left justify-start"
          >
            {message}
          </Button>
        ))}
      </div>
    </div>
  );
} 