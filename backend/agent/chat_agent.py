import asyncio
import os

from openai import AsyncOpenAI

from agents import (
    Agent,
    Runner,
    function_tool,
    set_default_openai_api,
    set_default_openai_client,
    set_tracing_disabled,
)
from dotenv import load_dotenv
from dataclasses import dataclass
load_dotenv()
BASE_URL = os.getenv("BASE_URL") or ""
API_KEY = os.getenv("API_KEY") or ""
MODEL_NAME = os.getenv("MODEL_NAME") or ""

if not BASE_URL or not API_KEY or not MODEL_NAME:
    raise ValueError(
        "Please set EXAMPLE_BASE_URL, EXAMPLE_API_KEY, EXAMPLE_MODEL_NAME via env var or code."
    )


"""This example uses a custom provider for all requests by default. We do three things:
1. Create a custom client.
2. Set it as the default OpenAI client, and don't use it for tracing.
3. Set the default API as Chat Completions, as most LLM providers don't yet support Responses API.

Note that in this example, we disable tracing under the assumption that you don't have an API key
from platform.openai.com. If you do have one, you can either set the `OPENAI_API_KEY` env var
or call set_tracing_export_api_key() to set a tracing specific key.
"""

client = AsyncOpenAI(
    base_url=BASE_URL,
    api_key=API_KEY,
)
set_default_openai_client(client=client, use_for_tracing=False)
set_default_openai_api("chat_completions")
set_tracing_disabled(disabled=True)


@function_tool
def searchKnowledgeBase(query: str) -> str:
    """Search The company knowledge base for relevant documentation and information"""
    ## TODO Doc store logic
    return f"The information regarding \"{query}\" is found ok"

chat_agent = Agent(
    name="Chat_Agent",
    instructions=
    """Your primary role is to help users with their questions using the company's knowledge base. When a user asks a question:

    1. First, search the knowledge base for relevant information
    2. Provide helpful, accurate answers based on the knowledge base content
    3. If you can't find relevant information in the knowledge base, politely explain that you don't have that specific information and suggest creating a support ticket
    4. Be friendly, professional, and concise
    5. Always try to be helpful and guide users to the right solution

    If you cannot answer a question satisfactorily, encourage the user to create a support ticket for human assistance.`,
    """,
    model=MODEL_NAME,
    tools=[searchKnowledgeBase],
)

