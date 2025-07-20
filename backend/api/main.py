"""
FastAPI application with refactored structure for better separation of concerns
"""
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import logging

from ..models.chat_models import ChatRequest, ChatResponse, SupportTicketRequest, SupportTicketResponse
from ..services.chat_service import chat_service

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Intelligent Support Hub API",
    description="AI-powered support chatbot with ticket creation capabilities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify the backend is running.
    """
    return {"status": "ok", "service": "Intelligent Support Hub API"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint that uses the AI agent to generate a response.
    
    Args:
        request: ChatRequest containing the user message and optional session ID
        
    Returns:
        ChatResponse with the AI's response and metadata
    """
    try:
        logger.info(f"Received chat request: {request.user_message[:50]}...")
        
        # Process the message through the chat service
        response_data = await chat_service.process_message(
            user_message=request.user_message,
            session_id=request.session_id
        )
        
        # Create response using the Pydantic model
        response = ChatResponse(**response_data)
        
        logger.info(f"Successfully processed chat request")
        return response
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/ticket", response_model=SupportTicketResponse)
async def create_ticket_endpoint(request: SupportTicketRequest):
    """
    Create a support ticket when the AI cannot help.
    
    Args:
        request: SupportTicketRequest containing ticket details
        
    Returns:
        SupportTicketResponse with ticket information
    """
    try:
        logger.info(f"Creating support ticket for user: {request.user_email}")
        
        # Create ticket through the chat service
        ticket_data = await chat_service.create_support_ticket(
            user_message=request.user_message,
            ai_response=request.ai_response
        )
        
        # Create response using the Pydantic model
        response = SupportTicketResponse(**ticket_data)
        
        logger.info(f"Successfully created ticket: {response.ticket_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error creating ticket: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create ticket: {str(e)}")

@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload and process documents for the AI knowledge base.
    
    Args:
        file: The document file to upload
        
    Returns:
        JSON response with upload status
    """
    try:
        logger.info(f"Uploading document: {file.filename}")
        
        # TODO: Implement document processing logic
        # This would parse PDFs, extract text, and add to the AI's knowledge base
        
        upload_result = {
            "filename": file.filename,
            "status": "uploaded",
            "size": file.size,
            "content_type": file.content_type
        }
        
        logger.info(f"Successfully uploaded document: {file.filename}")
        return JSONResponse(content=upload_result)
        
    except Exception as e:
        logger.error(f"Error uploading document: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to upload document: {str(e)}")

@app.get("/")
async def root():
    """
    Root endpoint with API information.
    """
    return {
        "message": "Intelligent Support Hub API",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/chat",
            "ticket": "/ticket", 
            "upload": "/upload-document",
            "health": "/health"
        }
    }