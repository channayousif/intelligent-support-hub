/**
 * API client for communicating with the FastAPI backend
 */

export interface ChatRequest {
  user_message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  ticket_created: boolean;
  ticket_id?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8000") {
    this.baseUrl = baseUrl;
  }

  /**
   * Send a chat message to the backend
   */
  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw new Error('Failed to get response from backend');
    }
  }

  /**
   * Upload a document to the backend
   */
  async uploadDocument(file: File): Promise<{ filename: string; status: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/upload-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload API error:', error);
      throw new Error('Failed to upload document');
    }
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw new Error('Backend is not available');
    }
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

/**
 * Sends a request to create a support ticket.
 * @param userMessage The original user message.
 * @param aiResponse The AI's response that triggered ticket creation.
 * @param userEmail (Optional) The user's email.
 * @param priority (Optional) Ticket priority.
 */
export async function createSupportTicket(
  userMessage: string,
  aiResponse: string,
  userEmail?: string,
  priority: string = "medium"
) {
  const response = await fetch('/api/ticket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_message: userMessage,
      ai_response: aiResponse,
      user_email: userEmail,
      priority,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create support ticket');
  }
  return response.json();
} 