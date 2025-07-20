"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import { SupportTicketDialog } from "../components/ui/support-ticket-dialog"
import { useChat } from "@/hooks/useChat"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessage } from "@/components/chat/ChatMessage"
import { ChatInput } from "@/components/chat/ChatInput"
import { ChatWelcome } from "@/components/chat/ChatWelcome"
import { ChatLoading } from "@/components/chat/ChatLoading"
import { createSupportTicket } from '@/lib/api';

export default function SupportHub() {
  const {
    messages,
    input,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat()

  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [ticketDraft, setTicketDraft] = useState<{userMessage: string, aiResponse: string} | null>(null);

  const handleCreateTicket = (aiResponse: string) => {
    const userMessage = messages.slice().reverse().find(m => m.role === 'user')?.content || '';
    setTicketDraft({ userMessage, aiResponse });
    setShowTicketDialog(true);
  };

  const handleQuickMessage = (message: string) => {
    setInput(message)
  }

  const handleSubmitTicket = (userEmail: string, priority: string) => {
    if (!ticketDraft) return;
    createSupportTicket(ticketDraft.userMessage, ticketDraft.aiResponse, userEmail, priority)
      .then((ticket) => {
        alert(`Ticket created! ID: ${ticket.ticket_id}`);
        setShowTicketDialog(false);
        setTicketDraft(null);
      })
      .catch((err) => {
        alert('Failed to create ticket: ' + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Support Hub</h1>
              <p className="text-sm text-gray-600">Get instant help from our AI assistant</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="h-[600px] flex flex-col">
          <ChatHeader />

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {messages.length === 0 && (
              <ChatWelcome onQuickMessage={handleQuickMessage} />
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onCreateTicket={handleCreateTicket}
              />
            ))}

            {isLoading && <ChatLoading />}
          </CardContent>

          {/* Input Form */}
          <div className="border-t p-4">
            <ChatInput
              value={input}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              disabled={isLoading}
            />
          </div>
        </Card>
      </div>

      <SupportTicketDialog
        open={showTicketDialog}
        onOpenChange={setShowTicketDialog}
        initialMessage={ticketDraft?.aiResponse || ""}
        onSubmit={handleSubmitTicket}
      />
    </div>
  )
}
