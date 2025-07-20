"""
Chat service for handling AI agent interactions
"""
import logging
from typing import Optional
from agents import Runner
from ..agent.chat_agent import chat_agent
import time
import json
from pathlib import Path
from datetime import datetime
import os

logger = logging.getLogger(__name__)

# You need a way to store session contexts, e.g., in-memory dict for demo
session_contexts = {}

# Path to your service account credentials
GOOGLE_SHEETS_CREDENTIALS = os.getenv("GOOGLE_SHEETS_CREDENTIALS")
GOOGLE_SHEET_NAME = "SupportTickets"

# Remove Google Sheets constants and get_gsheet function
TICKETS_FILE = Path(__file__).parent / "support_tickets.jsonl"

class ChatService:
    """
    Service for handling chat interactions with the AI agent
    """
    
    def __init__(self):
        self.agent = chat_agent
    
    async def process_message(self, user_message: str, session_id: Optional[str] = None) -> dict:
        """
        Process a user message and return the AI response, maintaining context.
        """
        try:
            logger.info(f"Processing message for session {session_id}: {user_message[:50]}...")

            # Retrieve or initialize the context for this session
            if session_id not in session_contexts:
                session_contexts[session_id] = []
            context = session_contexts[session_id]

            # Append the new user message
            context.append({"role": "user", "content": user_message})

            # Run the agent with the full context
            agent_response = await Runner.run(chat_agent, context)

            # Append the agent's response to the context
            context.append({"role": "assistant", "content": agent_response.final_output})

            # Save updated context
            session_contexts[session_id] = context

            response_data = {
                "response": agent_response.final_output,
                "ticket_created": False,
                "ticket_id": None,
                "session_id": session_id
            }

            logger.info(f"Successfully processed message for session {session_id}")
            return response_data

        except Exception as e:
            logger.error(f"Error processing message for session {session_id}: {str(e)}")
            raise e
    
    async def create_support_ticket(self, user_message: str, ai_response: str) -> dict:
        """
        Create a support ticket in a local file as JSON lines.
        """
        logger.info(f"Creating support ticket for message: {user_message[:50]}...")

        # Prepare ticket data
        ticket_id = f"TICKET-{int(time.time())}"
        status = "created"
        priority = "medium"
        created_at = datetime.utcnow().isoformat()

        ticket_data = {
            "ticket_id": ticket_id,
            "user_message": user_message,
            "ai_response": ai_response,
            "status": status,
            "priority": priority,
            "created_at": created_at
        }

        # Write to local file as JSON lines
        try:
            with open(TICKETS_FILE, "a", encoding="utf-8") as f:
                f.write(json.dumps(ticket_data) + "\n")
        except Exception as e:
            logger.error(f"Failed to create ticket in local file: {str(e)}")
            raise

        return ticket_data

# Create a singleton instance
chat_service = ChatService() 