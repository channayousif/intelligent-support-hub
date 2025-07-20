# Intelligent Support Hub

AI-Powered Content Creator Plugin for WordPress

---

## Overview

**Intelligent Support Hub** is a full-stack AI-powered support and content creation platform designed to integrate with WordPress. It features a modern Next.js frontend, a FastAPI backend, and a local file-based ticketing system. The platform leverages OpenAI Agents for conversational AI and provides seamless support ticket creation for unresolved queries.

---

## Features
- Conversational AI assistant powered by OpenAI Agents
- Multi-turn chat with context retention
- Support ticket creation (with dialog for user input)
- Local file-based ticket storage (no external dependencies)
- Admin analytics dashboard (mocked)
- Modern, responsive UI (React, Tailwind CSS)
- Easy integration with WordPress workflows

---

## Architecture

- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** FastAPI (Python 3.10+)
- **AI Agent:** OpenAI Agents SDK
- **Ticket Storage:** Local file (`support_tickets.jsonl`)

```
[User] ⇄ [Next.js Frontend] ⇄ [FastAPI Backend] ⇄ [OpenAI Agent / Ticket File]
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **Python** (3.10+)
- **pip** (for Python dependencies)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd intelligent-support-hub
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt  # Or use pyproject.toml/uv/poetry as appropriate
```

### 4. Environment Variables
- **Frontend:** (if needed, e.g., for API base URL)
- **Backend:**
  - `OPENAI_API_KEY` (for OpenAI Agents)
  - `BASE_URL`, `MODEL_NAME` (see `backend/agent/chat_agent.py`)

### 5. Run the Development Servers
- **Backend:**
  ```bash
  cd backend
  uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
  ```
- **Frontend:**
  ```bash
  npm run dev
  # Open http://localhost:3000
  ```

---

## API Endpoints

### Backend (FastAPI)
- `POST /chat` — Chat with the AI agent
- `POST /ticket` — Create a support ticket
- `GET /health` — Health check
- `POST /upload-document` — (Stub) Upload document for knowledge base

### Frontend (Next.js)
- `/` — Main chat interface
- `/admin` — Admin dashboard (mocked)
- `/analytics` — Analytics (mocked)

---

## Ticket Storage
- Tickets are stored as JSON lines in `backend/services/support_tickets.jsonl`.
- Each line is a JSON object with fields: `ticket_id`, `user_message`, `ai_response`, `status`, `priority`, `created_at`.
- This is for demo/dev use. For production, consider a database or external ticketing system.

---

## Development Workflow
- **Frontend:** Edit files in `src/`, use React/Next.js conventions.
- **Backend:** Edit files in `backend/`, use FastAPI and Python best practices.
- **AI Agent:** Configure in `backend/agent/chat_agent.py`.
- **Testing:** Add unit tests for new features (see `/tests` if present).
- **Linting:**
  - Frontend: `npm run lint`
  - Backend: Use `flake8`, `black`, or your preferred Python linter/formatter.

---

## Contribution Guidelines
- Fork the repo and create a feature branch.
- Write clear, well-documented code (TypeScript for frontend, Python for backend).
- Use async/await, proper error handling, and descriptive variable names.
- Add JSDoc/docstrings to all functions.
- Suggest or add unit tests for new features.
- Open a pull request with a clear description of your changes.

---

## License
MIT (or specify your license here)

---

## Credits
- Built with [Next.js](https://nextjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [OpenAI Agents](https://openai.com/).
