"""
Pydantic models for chat-related data structures
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ChatRequest(BaseModel):
    """Request model for chat messages"""
    user_message: str = Field(..., min_length=1, max_length=1000, description="The user's message")
    session_id: Optional[str] = Field(None, description="Optional session identifier for conversation context")

class ChatResponse(BaseModel):
    """Response model for chat messages"""
    response: str = Field(..., description="The AI assistant's response")
    ticket_created: bool = Field(default=False, description="Whether a support ticket was created")
    ticket_id: Optional[str] = Field(None, description="ID of the created support ticket")
    session_id: Optional[str] = Field(None, description="Session identifier")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Response timestamp")

class SupportTicketRequest(BaseModel):
    """Request model for creating support tickets"""
    user_message: str = Field(..., description="The original user message")
    ai_response: str = Field(..., description="The AI's response that triggered ticket creation")
    user_email: Optional[str] = Field(None, description="User's email address")
    priority: str = Field(default="medium", description="Ticket priority level")

class SupportTicketResponse(BaseModel):
    """Response model for support ticket creation"""
    ticket_id: str = Field(..., description="The created ticket ID")
    status: str = Field(..., description="Ticket status")
    priority: str = Field(..., description="Ticket priority")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Ticket creation timestamp") 