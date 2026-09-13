import { TopicHighlight, PromptItem, MentalModel, WorkflowSnippet, LinkedInPost, RedditNewsItem, GithubRepoItem } from '../types';

export const LINKEDIN_URL = 'https://www.linkedin.com/company/buildwithmannat/';

export const INITIAL_GITHUB_REPOS: GithubRepoItem[] = [
  {
    id: 1,
    name: 'google-genai-sdk',
    fullName: 'googleapis/python-genai',
    owner: 'googleapis',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/6010059?v=4',
    description: 'The official Google GenAI SDK for Python, featuring Gemini 3.8 Flash, Live API, and structured schema outputs.',
    stars: 18450,
    forks: 2130,
    language: 'Python',
    topics: ['gemini', 'llm', 'google-ai', 'agentic-ai', 'python-sdk'],
    url: 'https://github.com/googleapis/python-genai',
    starsToday: 340,
    updatedAt: '2 hours ago',
    useCase: 'Production Gemini 3.8 integration & multimodal prompt orchestration'
  },
  {
    id: 2,
    name: 'vllm',
    fullName: 'vllm-project/vllm',
    owner: 'vllm-project',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/132431405?v=4',
    description: 'A high-throughput and memory-efficient LLM serving engine with PagedAttention and KV Cache optimization.',
    stars: 34200,
    forks: 5890,
    language: 'Python / C++',
    topics: ['llm-serving', 'kv-cache', 'paged-attention', 'vllm', 'inference'],
    url: 'https://github.com/vllm-project/vllm',
    starsToday: 820,
    updatedAt: '1 hour ago',
    useCase: 'Self-hosted zero-latency LLM inference server'
  },
  {
    id: 3,
    name: 'ollama',
    fullName: 'ollama/ollama',
    owner: 'ollama',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/144985060?v=4',
    description: 'Get up and running with Llama 3, DeepSeek, and open LLMs locally on macOS, Linux, and Windows.',
    stars: 114000,
    forks: 9840,
    language: 'Go / C++',
    topics: ['local-llm', 'llama', 'ai-inference', 'desktop-ai'],
    url: 'https://github.com/ollama/ollama',
    starsToday: 1450,
    updatedAt: 'Just now',
    useCase: 'Local developer environment LLM execution'
  },
  {
    id: 4,
    name: 'langchain',
    fullName: 'langchain-ai/langchain',
    owner: 'langchain-ai',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/126733545?v=4',
    description: 'Building applications with LLMs through composable abstractions and agentic tool integrations.',
    stars: 98200,
    forks: 16400,
    language: 'Python',
    topics: ['agents', 'rag', 'llm-framework', 'python', 'vector-db'],
    url: 'https://github.com/langchain-ai/langchain',
    starsToday: 620,
    updatedAt: '3 hours ago',
    useCase: 'Chaining multi-step prompts & memory stores'
  },
  {
    id: 5,
    name: 'dementor-rag',
    fullName: 'buildwithmannat/dementor-rag-engine',
    owner: 'buildwithmannat',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/60585742?v=4',
    description: 'Zero-latency vector hybrid search and AST document chunking engine designed for enterprise AI pipelines.',
    stars: 8950,
    forks: 940,
    language: 'TypeScript / Python',
    topics: ['rag-pipeline', 'vector-search', 'buildwithmannat', 'hybrid-retrieval'],
    url: 'https://github.com/buildwithmannat',
    starsToday: 410,
    updatedAt: '4 hours ago',
    useCase: 'High-precision document retrieval for enterprise apps'
  },
  {
    id: 6,
    name: 'open-webui',
    fullName: 'open-webui/open-webui',
    owner: 'open-webui',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/156972410?v=4',
    description: 'User-friendly WebUI for Ollama, OpenAI, and Gemini with RAG integration, web search, and voice interactions.',
    stars: 56700,
    forks: 6720,
    language: 'Svelte / Python',
    topics: ['webui', 'chat-interface', 'ollama', 'gemini-ui'],
    url: 'https://github.com/open-webui/open-webui',
    starsToday: 980,
    updatedAt: '5 hours ago',
    useCase: 'Turn-key ChatGPT alternative UI for team deployment'
  }
];

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: 'lp-1',
    author: 'Build with Mannat',
    authorTitle: 'AI Engineering & Founder Playbooks',
    content: `🚀 How we reduced LLM Latency by 74% using Key-Value (KV) Caching & Prompt Compression in Production!

Most AI developers assume GPU speed is the bottleneck. In reality, attention calculation scales quadractically O(N²) with prompt tokens during generation.

Here is the exact 3-step blueprint we use:
1. Prefill Phase: Cache Key & Value tensors across transformer attention layers.
2. Context Compaction: Trim redundant fluff from system prompts using AST chunking.
3. Strict Schema Output: Enforce Pydantic validation via the @google/genai SDK.

Check out the full interactive breakdown on our landing page! 👇`,
    timestamp: '2 hours ago',
    likesCount: 342,
    commentsCount: 48,
    repostsCount: 29,
    postUrl: 'https://www.linkedin.com/company/buildwithmannat/',
    mediaType: 'code',
    codeSnippet: `kv_cache[layer] = (K_tensor, V_tensor)\nAttn = softmax(Q_new @ K_cached.T / sqrt(d)) * V_cached`,
    tags: ['AIEngineering', 'LLMOptimization', 'BuildWithMannat', 'Python'],
    isPinned: true
  },
  {
    id: 'lp-2',
    author: 'Build with Mannat',
    authorTitle: 'AI Engineering & Founder Playbooks',
    content: `💡 5 ChatGPT System Prompts that saved our dev team 20+ hours of manual debugging this week.

Stop asking LLMs generic questions like "Why is my code failing?". Give them a Staff Principal Persona with strict constraints!

Prompts included in today's drop:
- Zero-Shot OpenAPI & Pydantic Schema Generator
- Async Race Condition Auditor
- RAG Chunking & Citation Synthesizer
- Founders' MVP Feature Scope Evaluator

Full prompt library is now open & free to copy on our site!`,
    timestamp: '1 day ago',
    likesCount: 890,
    commentsCount: 112,
    repostsCount: 94,
    postUrl: 'https://www.linkedin.com/company/buildwithmannat/',
    mediaType: 'article',
    tags: ['ChatGPT', 'PromptEngineering', 'SoftwareEngineering', 'Startups'],
    isPinned: false
  },
  {
    id: 'lp-3',
    author: 'Build with Mannat',
    authorTitle: 'AI Engineering & Founder Playbooks',
    content: `🤖 Building ReAct Agents in 2026: Why deterministic tool validation is mandatory.

When an LLM chooses a tool, it emits a function signature. If you execute that payload blindly without schema checking, bad things happen.

Always wrap tool outputs with validation wrappers and retry decorators! Here is our standard Python template:`,
    timestamp: '3 days ago',
    likesCount: 512,
    commentsCount: 64,
    repostsCount: 41,
    postUrl: 'https://www.linkedin.com/company/buildwithmannat/',
    mediaType: 'code',
    codeSnippet: `@retry_with_backoff(retries=3)\ndef safe_tool_executor(payload):\n  validated = ToolSchema.model_validate(payload)\n  return execute_action(validated)`,
    tags: ['Agents', 'Python', 'GeminiAPI', 'SystemDesign'],
    isPinned: false
  }
];

export const INITIAL_REDDIT_NEWS: RedditNewsItem[] = [
  {
    id: 'rn-1',
    title: 'Google releases new Gemini 3.8 Flash model updates with native multimodal reasoning & function calling',
    subreddit: 'r/ArtificialInteligence',
    author: 'ai_researcher_99',
    score: 1840,
    numComments: 312,
    permalink: 'https://www.reddit.com/r/ArtificialInteligence/comments/gemini_38_flash_update/',
    url: 'https://ai.google.dev/',
    createdUtc: Date.now() / 1000 - 3600 * 4,
    timeAgo: '4 hours ago',
    summary: 'Google announced major performance improvements to Gemini 3.8 Flash including faster token generation rates and improved structured JSON schema adherence.'
  },
  {
    id: 'rn-2',
    title: 'Show HN: Open Source local RAG agent with zero-latency KV cache acceleration',
    subreddit: 'r/LocalLLaMA',
    author: 'vector_dev',
    score: 2410,
    numComments: 420,
    permalink: 'https://www.reddit.com/r/LocalLLaMA/comments/open_source_rag_agent/',
    url: 'https://github.com/example/local-rag',
    createdUtc: Date.now() / 1000 - 3600 * 8,
    timeAgo: '8 hours ago',
    summary: 'A community open-source project demonstrates 5x throughput gains for local RAG indexing by utilizing GPU memory mapped KV caching.'
  },
  {
    id: 'rn-3',
    title: 'Paper Discussion: Autonomous multi-agent orchestration via asynchronous tool calling loops',
    subreddit: 'r/MachineLearning',
    author: 'prof_ml_2026',
    score: 1120,
    numComments: 185,
    permalink: 'https://www.reddit.com/r/MachineLearning/comments/multi_agent_paper/',
    url: 'https://arxiv.org/abs/2609.12345',
    createdUtc: Date.now() / 1000 - 3600 * 14,
    timeAgo: '14 hours ago',
    summary: 'Researchers publish empirical benchmarks proving that self-correcting agentic loops outperform standard single-prompt LLM chain-of-thought.'
  }
];

export const TOPIC_HIGHLIGHTS: TopicHighlight[] = [
  {
    id: 'chatgpt-prompts',
    title: 'High-Signal ChatGPT & Claude Prompts',
    category: 'prompts',
    description: 'Precision-engineered system prompts for rapid code refactoring, bug diagnosis, API contract drafting, and strategic product decision-making.',
    iconName: 'MessageSquareCode',
    tag: '50+ Curated Prompts',
    featuredCode: `System: You are a Staff Principal Engineer. Review the following Python async snippet for deadlocks and race conditions...`,
    metrics: 'Used by 8,500+ Devs'
  },
  {
    id: 'llm-mental-models',
    title: 'Visual LLM Architecture Mental Models',
    category: 'visuals',
    description: 'Deconstruct complex AI concepts—KV Caching, RAG Pipelines, Context Window Management, and Multi-Agent Choreography—into crystal-clear visual mental models.',
    iconName: 'Network',
    tag: 'Visual Breakdown',
    featuredCode: `User Input -> Query Vectorizer -> HNSW Index Search -> Dynamic Context Injection -> LLM Reasoning`,
    metrics: '15+ Visual Frameworks'
  },
  {
    id: 'python-development',
    title: 'Production Python AI Blueprints',
    category: 'python',
    description: 'Clean, asynchronous Python code templates for Google Gemini SDK, function calling schemas, streaming responses, and resilient retry logic.',
    iconName: 'Code2',
    tag: 'Production Ready',
    featuredCode: `async def generate_structured_spec(prompt: str):\n  ai = GoogleGenAI(api_key=os.getenv("GEMINI_API_KEY"))\n  return await ai.models.generate_content(...)`,
    metrics: '100% Async & Typed'
  },
  {
    id: 'ai-workflows',
    title: 'Autonomous AI Agent Workflows',
    category: 'workflows',
    description: 'End-to-end architectural patterns for chaining specialized models, structured outputs, self-correcting code loops, and real-time tool use.',
    iconName: 'Workflow',
    tag: 'Agentic Systems',
    featuredCode: `Planner Agent -> Tool Executor -> Validator Loop -> Output Generator`,
    metrics: 'Enterprise Grade'
  }
];

export const PROMPTS_LIBRARY: PromptItem[] = [
  {
    id: 'p1',
    title: 'Staff Engineer Code Audit & Refactoring',
    category: 'Developer Tools',
    description: 'Examines code for performance bottlenecks, edge-case memory leaks, anti-patterns, and type vulnerabilities.',
    promptText: `Act as a Staff Principal Engineer. Perform a comprehensive code review of the snippet provided below.

Focus Areas:
1. Architectural anti-patterns or logic flaws
2. Async concurrency / race condition risks
3. Memory leak vulnerabilities or unnecessary re-renders
4. Type safety and missing edge-case handling

Provide a 3-part response:
- Executive Summary of main issues
- Refactored production-grade code with comments
- Performance & memory impact explanation`,
    variables: ['code_language', 'source_code'],
    tips: 'Paste your full file or function along with expected throughput.',
    author: 'Mannat Walia',
    likes: 1240
  },
  {
    id: 'p2',
    title: 'Zero-Shot JSON Schema & API Contract Generator',
    category: 'System Architecture',
    description: 'Turns plain English requirements into clean, strict OpenAPI / TypeScript / Pydantic definitions.',
    promptText: `Given the following feature description, output a strict Pydantic model (Python 3.11+) and TypeScript interface pair.

Requirements:
- Ensure strict field validation (min/max lengths, regex constraints)
- Include JSDoc / docstrings for every field
- Use Enums for discrete status states
- Ensure compatibility with Gemini / OpenAI structured outputs schema

Feature Spec: {{feature_description}}`,
    variables: ['feature_description'],
    tips: 'Guarantees 100% schema validation accuracy when calling LLM APIs.',
    author: 'Mannat Walia',
    likes: 980
  },
  {
    id: 'p3',
    title: 'RAG Context Optimization & Chunking Strategy',
    category: 'Prompt Engineering',
    description: 'Instructs LLMs to synthesize fragmented vector search retrieved chunks into cohesive technical documents.',
    promptText: `You are an expert Information Retrieval Specialist. Synthesize the provided context chunks to answer the query accurately.

Rules:
1. Base your answer STRICTLY on the retrieved context below. Do not assume or hallucinate ungrounded facts.
2. If the context contains conflicting information, explicitly highlight the discrepancy.
3. Include inline citations [Chunk #] for every technical claim.
4. Structure the output with key takeaways first, followed by deep implementation details.

User Query: {{user_query}}
Retrieved Chunks:
{{context_chunks}}`,
    variables: ['user_query', 'context_chunks'],
    tips: 'Reduces hallucination rates by over 90% in Enterprise RAG systems.',
    author: 'Mannat Walia',
    likes: 1450
  },
  {
    id: 'p4',
    title: 'Founder Pitch & AI Feature Positioning',
    category: 'Founder Strategy',
    description: 'Helps tech founders frame their AI features clearly for technical customers and investors.',
    promptText: `You are a Y-Combinator Tech Founder Advisor. Evaluate this proposed AI product feature:

Feature Idea: {{product_idea}}
Target Customer: {{target_customer}}

Analyze:
1. Core Value Proposition: Why is an LLM necessary vs standard deterministic code?
2. Defensive Moat: How to avoid being rendered obsolete by base model updates?
3. User Experience Friction: Where is latency or accuracy going to cause drop-off?
4. Recommended 1-week MVP Scope: What is the absolute bare-minimum build?`,
    variables: ['product_idea', 'target_customer'],
    tips: 'Essential exercise before writing any agentic backend code.',
    author: 'Mannat Walia',
    likes: 1120
  }
];

export const MENTAL_MODELS: MentalModel[] = [
  {
    id: 'rag-pipeline',
    title: 'Retrieval-Augmented Generation (RAG)',
    subtitle: 'Connecting Static LLMs to Live Enterprise Knowledge',
    summary: 'RAG bridges the gap between pre-trained LLM weights and private internal data by fetching relevant vector embeddings before prompt execution.',
    complexity: 'Intermediate',
    category: 'Architecture',
    steps: [
      {
        stepNumber: 1,
        title: 'Document Ingestion & Chunking',
        explanation: 'Raw PDFs, docs, and DB records are chunked into semantic snippets (500-1000 tokens) with overlap.',
        codeSnippet: `chunks = text_splitter.split_text(raw_document, chunk_size=800, chunk_overlap=150)`
      },
      {
        stepNumber: 2,
        title: 'Vector Embedding Generation',
        explanation: 'Each text chunk passes through an embedding model (e.g. text-embedding-004) to produce dense floating-point vector representations.',
        codeSnippet: `vectors = embedding_model.embed_documents(chunks)`
      },
      {
        stepNumber: 3,
        title: 'Similarity Search (ANN Query)',
        explanation: 'User query is embedded and searched against a vector index using Cosine or HNSW distance metrics.',
        codeSnippet: `top_matches = vector_db.search(query_vector, top_k=5)`
      },
      {
        stepNumber: 4,
        title: 'Context Injection & Generation',
        explanation: 'Top context matches are appended into the system prompt instructions before generating final response.',
        codeSnippet: `final_prompt = f"Context: {top_matches}\\nQuestion: {query}"`
      }
    ],
    pythonExample: `from google import genai
import numpy as np

# Quick RAG Conceptual Pipeline in Python
def simulate_rag_query(user_query: str, vector_store: list):
    query_vec = get_embedding(user_query)
    relevant_chunks = [item['text'] for item in sorted(vector_store, key=lambda x: cosine_sim(x['vec'], query_vec))[:3]]
    
    ai = genai.Client()
    response = ai.models.generate_content(
        model="gemini-3.8-flash",
        contents=f"Context:\\n{relevant_chunks}\\n\\nQuery: {user_query}"
    )
    return response.text`,
    keyTakeaways: [
      'Reduces model hallucination by grounding in verified data sources',
      'Keeps sensitive data out of model fine-tuning weights',
      'Requires optimal chunk size and semantic search reranking for best results'
    ]
  },
  {
    id: 'kv-cache',
    title: 'Key-Value (KV) Caching in Transformers',
    subtitle: 'Unlocking 10x Latency Reduction in Token Generation',
    summary: 'During auto-regressive generation, pre-computed Key and Value matrices of past prompt tokens are stored in GPU memory to prevent redundant matrix multiplications.',
    complexity: 'Advanced',
    category: 'Performance',
    steps: [
      {
        stepNumber: 1,
        title: 'Prefill Phase (Prompt Processing)',
        explanation: 'All prompt tokens are processed in parallel. Key and Value projections for all layers are computed and stored in the KV Cache tensor.',
        codeSnippet: `kv_cache[layer] = (K_tensor, V_tensor)`
      },
      {
        stepNumber: 2,
        title: 'Decode Phase (Token by Token)',
        explanation: 'When generating new token N+1, attention is computed only between new Query N+1 and cached Keys/Values of all previous N tokens.',
        codeSnippet: `Q_new = token_N1 @ W_Q; Attn = softmax(Q_new @ K_cached.T / sqrt(d))`
      },
      {
        stepNumber: 3,
        title: 'Memory vs Latency Tradeoff',
        explanation: 'KV Cache saves massive FLOPs but scales linearly with batch size, context length, and layer depth.',
        codeSnippet: `memory_bytes = 2 * 2 * num_layers * num_heads * head_dim * seq_len * batch_size`
      }
    ],
    pythonExample: `# Conceptual KV Cache tensor shape calculation in PyTorch / Python
def calculate_kv_cache_memory(batch_size=1, seq_len=8192, num_layers=32, num_heads=32, head_dim=128):
    # 2 for Key and Value, 2 for 16-bit float (bfloat16)
    bytes_per_token = 2 * 2 * num_layers * num_heads * head_dim
    total_gigabytes = (bytes_per_token * seq_len * batch_size) / (1024 ** 3)
    return f"KV Cache Memory Footprint: {total_gigabytes:.2f} GB"`,
    keyTakeaways: [
      'Eliminates O(N²) re-computation during generation phase',
      'Enables high-throughput streaming for real-time AI apps',
      'Memory bandwidth, not compute FLOPs, becomes the primary bottleneck'
    ]
  },
  {
    id: 'agentic-loop',
    title: 'ReAct Agentic Reasoning & Tool Execution Loop',
    subtitle: 'Reason -> Action -> Observation -> Solution Loop',
    summary: 'How autonomous AI agents dynamically plan, select function tools, evaluate observation returns, and iterate toward problem resolution.',
    complexity: 'Intermediate',
    category: 'Agents',
    steps: [
      {
        stepNumber: 1,
        title: 'Thought Generation',
        explanation: 'Model analyzes current task state and decides if external tool input is required.',
        codeSnippet: `Thought: To calculate ROI, I need current stock data for AAPL.`
      },
      {
        stepNumber: 2,
        title: 'Tool Invocation',
        explanation: 'Model emits structured function payload (e.g. get_stock_price(symbol="AAPL")).',
        codeSnippet: `Action: call_tool("get_stock_price", {"symbol": "AAPL"})`
      },
      {
        stepNumber: 3,
        title: 'Observation Feeding',
        explanation: 'System executes python API call and returns output to agent context window.',
        codeSnippet: `Observation: {"price": 235.50, "currency": "USD"}`
      },
      {
        stepNumber: 4,
        title: 'Final Synthesis',
        explanation: 'Agent evaluates observation and answers original user query.',
        codeSnippet: `Final Answer: AAPL is currently trading at $235.50...`
      }
    ],
    pythonExample: `from google import genai
from google.genai import types

def weather_tool(city: str) -> str:
    return f"Weather in {city}: 22°C, Sunny"

# Agent Tool Loop Setup
def run_agent_workflow():
    ai = genai.Client()
    response = ai.models.generate_content(
        model="gemini-3.8-flash",
        contents="What is the weather in Paris right now?",
        config=types.GenerateContentConfig(
            tools=[weather_tool]
        )
    )
    return response`,
    keyTakeaways: [
      'Empowers LLMs to perform real-world side effects securely',
      'Requires strict function schema validation and error handling',
      'Self-correcting loops reduce agent execution failure rates'
    ]
  }
];

export const PYTHON_WORKFLOWS: WorkflowSnippet[] = [
  {
    id: 'w1',
    title: 'Google Gemini SDK Asynchronous Client Boilerplate',
    language: 'python',
    description: 'Clean, asynchronous Python script setup using the official @google/genai SDK with streaming and error handling.',
    tags: ['Gemini API', 'AsyncIO', 'Python 3.11+'],
    code: `import os
import asyncio
from google import genai

async def main():
    # Initialize the modern Gemini Client
    ai = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    prompt = "Explain quantum computing in 3 simple developer bullet points."

    print(f"🤖 Prompt: {prompt}\\n")

    # Async streaming response
    response_stream = await ai.aio.models.generate_content_stream(
        model="gemini-3.8-flash",
        contents=prompt
    )

    async for chunk in response_stream:
        print(chunk.text, end="", flush=True)

if __name__ == "__main__":
    asyncio.run(main())`
  },
  {
    id: 'w2',
    title: 'Structured Output Extraction with Pydantic & Gemini',
    language: 'python',
    description: 'Enforce strict Pydantic JSON schemas to extract structured data from unstructured tech articles.',
    tags: ['Structured Output', 'Pydantic', 'Type Safety'],
    code: `from pydantic import BaseModel, Field
from google import genai
from google.genai import types

class TechArticleSummary(BaseModel):
    title: str = Field(description="Headline of the article")
    key_technologies: list[str] = Field(description="Mentioned AI frameworks or tools")
    sentiment: str = Field(description="Bullish, Bearish, or Neutral")
    complexity_score: int = Field(description="Rating from 1 (simple) to 10 (hard)")

ai = genai.Client()

response = ai.models.generate_content(
    model="gemini-3.8-flash",
    contents="Synthesize: OpenAI announced new reasoning models with web search grounding.",
    config=types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=TechArticleSummary
    )
)

# Parse response into typed Pydantic object
summary = TechArticleSummary.model_validate_json(response.text)
print(f"Parsed Object: {summary.title} ({summary.sentiment})")`
  },
  {
    id: 'w3',
    title: 'Resilient Retry & Exponential Backoff Wrapper',
    language: 'python',
    description: 'Production decorator for handling API rate limits (429) and transient network drops safely.',
    tags: ['Reliability', 'Decorator', 'Production'],
    code: `import time
import functools
from google.genai.errors import APIError

def retry_with_backoff(retries=3, backoff_in_seconds=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            x = 0
            while True:
                try:
                    return func(*args, **kwargs)
                except APIError as e:
                    if x == retries:
                        raise e
                    sleep_time = backoff_in_seconds * (2 ** x)
                    print(f"⚠️ API error: {e}. Retrying in {sleep_time}s...")
                    time.sleep(sleep_time)
                    x += 1
        return wrapper
    return decorator`
  }
];
