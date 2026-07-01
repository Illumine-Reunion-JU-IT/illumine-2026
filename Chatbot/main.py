from pathlib import Path
from typing import Annotated, TypedDict

import frontmatter

from langchain_ollama import ChatOllama
from langchain_core.messages import (
    BaseMessage,
    HumanMessage,
    SystemMessage,
)
from langchain_core.tools import tool

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langgraph.checkpoint.memory import InMemorySaver


# ============================================================
# LLM
# ============================================================

llm = ChatOllama(
    model="qwen3:1.7b",
    temperature=0.2,
)


# ============================================================
# System Prompt
# ============================================================

SYSTEM_PROMPT = """
You are Illumine's AI assistant.

You have access to the retrieve_okf tool, which searches the official
Illumine knowledge base.

The knowledge base contains information about:

- Illumine
- OKF
- Jadavpur University (JU)
- Information Technology Department
- Faculty members and professors
- Academic information
- Events
- Documentation
- Features

Rules:

1. If the user's question is related to any of the above topics,
   ALWAYS use retrieve_okf before answering.

2. Never answer these questions from your own knowledge.

3. Base your answer ONLY on the retrieved documentation.

4. If the tool returns "No relevant document found.",
   politely tell the user that the requested information
   is unavailable in the knowledge base.

5. For unrelated questions, answer normally using your
   general knowledge.
"""


# ============================================================
# Knowledge Loader
# ============================================================

def load_okf() -> list[dict]:
    """
    Loads all markdown documents inside the knowledge folder.
    """

    docs = []

    for file in Path("knowledge").rglob("*.md"):
        post = frontmatter.load(file)

        docs.append(
            {
                "title": post.metadata.get("title", ""),
                "aliases": post.metadata.get("aliases", []),
                "tags": post.metadata.get("tags", []),
                "path": str(file),
            }
        )

    return docs


# ============================================================
# Retrieval Tool
# ============================================================

DOCS = load_okf()

@tool
def retrieve_okf(query: str) -> str:
    """
    Search the Illumine knowledge base and return the
    contents of the most relevant document.
    """

    docs = DOCS

    retrieval_prompt = f"""
You are a document retrieval assistant.

Available documents:

{docs}

User Query:
{query}

Instructions:

- Return ONLY one document title.
- Return exactly one title from the list.
- Do not explain anything.
- If nothing matches, return NONE.
"""

    response = llm.invoke(retrieval_prompt)

    title = (
        response.content
        .strip()
        .strip('"')
        .strip("'")
    )

    if title.upper() == "NONE":
        return "No relevant document found."

    for doc in docs:
        if doc["title"].lower() == title.lower():
            post = frontmatter.load(doc["path"])
            return post.content

    return "No relevant document found."


# ============================================================
# Graph State
# ============================================================

class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


# ============================================================
# Bind Tools
# ============================================================

llm_with_tools = llm.bind_tools([retrieve_okf])

# ============================================================
# Chat Node
# ============================================================

def chat_node(state: ChatState):
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"],
    ]

    response = llm_with_tools.invoke(messages)

    return {"messages": [response]}


# ============================================================
# Tool Node
# ============================================================

tool_node = ToolNode([retrieve_okf])


# ============================================================
# Routing Logic
# ============================================================

def tool_condition(state: ChatState):
    last_message = state["messages"][-1]

    if getattr(last_message, "tool_calls", None):
        return "tool_node"

    return "end"


# ============================================================
# Build Graph
# ============================================================

graph = StateGraph(ChatState)

graph.add_node("chat_node", chat_node)
graph.add_node("tool_node", tool_node)

graph.add_edge(START, "chat_node")

graph.add_conditional_edges(
    "chat_node",
    tool_condition,
    {
        "tool_node": "tool_node",
        "end": END,
    },
)

graph.add_edge("tool_node", "chat_node")


# ============================================================
# Compile Graph
# ============================================================

memory = InMemorySaver()

chatbot = graph.compile(
    checkpointer=memory
)

#Chat function to interact with the chatbot

def chat(query: str, thread_id: str = "default") -> str:
    result = chatbot.invoke(
        {
            "messages": [
                HumanMessage(content=query)
            ]
        },
        config={
            "configurable": {
                "thread_id": thread_id
            }
        }
    )

    return result["messages"][-1].content