

import { z } from "zod"

// Simulated knowledge base - in a real app, this would come from a vector database
const knowledgeBase = [
  {
    id: 1,
    title: "Password Reset Guide",
    content:
      "To reset your password: 1) Go to the login page 2) Click 'Forgot Password' 3) Enter your email 4) Check your email for reset link 5) Follow the instructions in the email. Password must be at least 8 characters with uppercase, lowercase, and numbers.",
  },
  {
    id: 2,
    title: "Pricing Plans",
    content:
      "We offer three pricing plans: Basic ($9/month) - Up to 5 users, 10GB storage; Pro ($29/month) - Up to 25 users, 100GB storage, priority support; Enterprise ($99/month) - Unlimited users, 1TB storage, dedicated support, custom integrations.",
  },
  {
    id: 3,
    title: "Account Setup",
    content:
      "Setting up your account: 1) Sign up with email 2) Verify email address 3) Complete profile information 4) Choose your plan 5) Add team members if needed. You can upgrade or downgrade your plan anytime from the billing section.",
  },
  {
    id: 4,
    title: "API Documentation",
    content:
      "Our REST API supports GET, POST, PUT, DELETE operations. Authentication uses API keys. Rate limit is 1000 requests per hour for Basic, 5000 for Pro, unlimited for Enterprise. All responses are in JSON format. Base URL: https://api.example.com/v1/",
  },
  {
    id: 5,
    title: "Troubleshooting",
    content:
      "Common issues: 1) Login problems - Clear browser cache, check caps lock 2) Slow performance - Check internet connection, try different browser 3) File upload issues - Check file size (max 10MB), supported formats: PDF, DOC, JPG, PNG 4) Payment issues - Verify card details, check with bank",
  },
]

function searchKnowledgeBase(query: string) {
  const queryLower = query.toLowerCase()
  const results = knowledgeBase.filter(
    (doc) => doc.title.toLowerCase().includes(queryLower) || doc.content.toLowerCase().includes(queryLower),
  )
  return results.slice(0, 3) // Return top 3 matches
}

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  // Get the latest user message
  const userMessage = messages[messages.length - 1]?.content || "";

  // Forward the message to the FastAPI backend
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_message: userMessage }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to get response from backend" }), { status: 500 });
  }

  const data = await response.json();
  // Return the response in the expected format for the chat UI
  return new Response(
    JSON.stringify({ role: "assistant", content: data.response }),
    { headers: { "Content-Type": "application/json" } }
  );
}
