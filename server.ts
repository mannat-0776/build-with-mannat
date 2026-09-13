import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily or when key exists
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// In-memory store for LinkedIn posts
let linkedInPostsStore = [
  {
    id: 'lp-1',
    author: 'Build with Mannat',
    authorTitle: 'AI Engineering & Founder Playbooks',
    content: `🚀 How we reduced LLM Latency by 74% using Key-Value (KV) Caching & Prompt Compression in Production!\n\nMost AI developers assume GPU speed is the bottleneck. In reality, attention calculation scales quadractically O(N²) with prompt tokens during generation.\n\nHere is the exact 3-step blueprint we use:\n1. Prefill Phase: Cache Key & Value tensors across transformer attention layers.\n2. Context Compaction: Trim redundant fluff from system prompts using AST chunking.\n3. Strict Schema Output: Enforce Pydantic validation via the @google/genai SDK.\n\nCheck out the full interactive breakdown on our landing page! 👇`,
    timestamp: 'Just now',
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
    content: `💡 5 ChatGPT System Prompts that saved our dev team 20+ hours of manual debugging this week.\n\nStop asking LLMs generic questions like "Why is my code failing?". Give them a Staff Principal Persona with strict constraints!\n\nPrompts included in today's drop:\n- Zero-Shot OpenAPI & Pydantic Schema Generator\n- Async Race Condition Auditor\n- RAG Chunking & Citation Synthesizer\n- Founders' MVP Feature Scope Evaluator\n\nFull prompt library is now open & free to copy on our site!`,
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
    content: `🤖 Building ReAct Agents in 2026: Why deterministic tool validation is mandatory.\n\nWhen an LLM chooses a tool, it emits a function signature. If you execute that payload blindly without schema checking, bad things happen.\n\nAlways wrap tool outputs with validation wrappers and retry decorators! Here is our standard Python template:`,
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

// API Route: Get LinkedIn Posts
app.get("/api/linkedin/posts", (_req, res) => {
  res.json({
    success: true,
    posts: linkedInPostsStore,
    companyUrl: "https://www.linkedin.com/company/buildwithmannat/",
  });
});

// API Route: Post / Publish new LinkedIn Update to website
app.post("/api/linkedin/posts", (req, res) => {
  try {
    const { content, codeSnippet, tags, mediaType } = req.body;
    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: "Post content is required" });
      return;
    }

    const newPost = {
      id: `lp-${Date.now()}`,
      author: 'Build with Mannat',
      authorTitle: 'AI Engineering & Founder Playbooks',
      content: content.trim(),
      timestamp: 'Just now',
      likesCount: 1,
      commentsCount: 0,
      repostsCount: 0,
      postUrl: 'https://www.linkedin.com/company/buildwithmannat/',
      mediaType: mediaType || (codeSnippet ? 'code' : 'article'),
      codeSnippet: codeSnippet ? codeSnippet.trim() : undefined,
      tags: Array.isArray(tags) ? tags : ['BuildWithMannat', 'AIEngineering'],
      isPinned: false
    };

    linkedInPostsStore.unshift(newPost);
    res.json({ success: true, post: newPost, posts: linkedInPostsStore });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to publish LinkedIn post" });
  }
});

// Helper for human-readable time
function getTimeAgo(seconds: number): string {
  if (!seconds || isNaN(seconds)) return 'Recently';
  const diff = Math.floor(Date.now() / 1000 - seconds);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// API Route: Scrape / Fetch live Reddit AI news from multiple subreddits
app.get("/api/reddit/news", async (req, res) => {
  try {
    const subreddit = (req.query.subreddit as string) || 'ArtificialInteligence';
    const sort = (req.query.sort as string) || 'hot';
    
    // Whitelist allowed subreddits
    const allowedSubreddits = ['ArtificialInteligence', 'MachineLearning', 'LocalLLaMA', 'OpenAI', 'ChatGPT', 'singularity'];
    const targetSub = allowedSubreddits.includes(subreddit) ? subreddit : 'ArtificialInteligence';

    const redditUrl = `https://www.reddit.com/r/${targetSub}/${sort}.json?limit=25`;
    
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BuildWithMannatScraper/1.0',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Reddit API returned status ${response.status}`);
    }

    const data = await response.json();
    const children = data?.data?.children || [];

    const formattedNews = children
      .filter((child: any) => !child.data.over_18 && child.data.title && !child.data.stickied)
      .map((child: any) => {
        const d = child.data;
        let thumbnail = d.thumbnail;
        if (!thumbnail || thumbnail === 'self' || thumbnail === 'default' || thumbnail === 'nsfw') {
          thumbnail = undefined;
        }

        return {
          id: d.id,
          title: d.title,
          subreddit: `r/${d.subreddit}`,
          author: d.author,
          score: d.score,
          numComments: d.num_comments,
          permalink: `https://www.reddit.com${d.permalink}`,
          url: d.url.startsWith('https://www.reddit.com') ? `https://www.reddit.com${d.permalink}` : d.url,
          createdUtc: d.created_utc,
          timeAgo: getTimeAgo(d.created_utc),
          thumbnail: thumbnail,
          selftext: d.selftext ? d.selftext.slice(0, 300) + '...' : undefined,
        };
      })
      .slice(0, 15);

    res.json({
      success: true,
      subreddit: targetSub,
      news: formattedNews,
      count: formattedNews.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.warn("Reddit Scraping Warning, using fallback:", error.message);
    
    // Return rich fallback news if Reddit API blocks IP or rate limits
    const fallbackNews = [
      {
        id: 'fb-1',
        title: 'Gemini 3.8 Flash SDK Updates: High-Throughput Async Streaming & Function Calling Schemas',
        subreddit: `r/${req.query.subreddit || 'ArtificialInteligence'}`,
        author: 'ai_researcher',
        score: 1420,
        numComments: 284,
        permalink: 'https://www.reddit.com/r/ArtificialInteligence/',
        url: 'https://ai.google.dev/',
        createdUtc: Date.now() / 1000 - 3600 * 3,
        timeAgo: '3 hours ago',
        selftext: 'Google has deployed critical performance enhancements to the Gemini 3.8 Flash model family, introducing ultra-low latency structured responses.'
      },
      {
        id: 'fb-2',
        title: 'Show HN: Zero-latency KV cache memory compression for local RAG agents',
        subreddit: `r/${req.query.subreddit || 'LocalLLaMA'}`,
        author: 'vector_builder',
        score: 2190,
        numComments: 395,
        permalink: 'https://www.reddit.com/r/LocalLLaMA/',
        url: 'https://github.com/buildwithmannat',
        createdUtc: Date.now() / 1000 - 3600 * 7,
        timeAgo: '7 hours ago',
        selftext: 'New open-source benchmark shows 5x throughput boost when pinning transformer KV Cache tensors in GPU memory during long context generation.'
      },
      {
        id: 'fb-3',
        title: 'Empirical Study: Self-correcting ReAct tool loops reduce LLM failure rates by 88%',
        subreddit: `r/${req.query.subreddit || 'MachineLearning'}`,
        author: 'ml_paper_author',
        score: 980,
        numComments: 142,
        permalink: 'https://www.reddit.com/r/MachineLearning/',
        url: 'https://arxiv.org',
        createdUtc: Date.now() / 1000 - 3600 * 12,
        timeAgo: '12 hours ago',
        selftext: 'Researchers demonstrate that combining retry decorators with Pydantic JSON schema output wrappers prevents hallucination in autonomous AI workflows.'
      }
    ];

    res.json({
      success: true,
      subreddit: req.query.subreddit || 'ArtificialInteligence',
      news: fallbackNews,
      count: fallbackNews.length,
      isFallback: true,
      timestamp: new Date().toISOString()
    });
  }
});

// API Route: AI Summarizer for Reddit Posts using Gemini
app.post("/api/reddit/news/summarize", async (req, res) => {
  try {
    const { title, selftext } = req.body;
    if (!title) {
      res.status(400).json({ error: "News title is required" });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Summarize this AI Reddit news post in 2 concise, high-impact bullet points for AI engineers & tech founders:\nTitle: ${title}\nContent: ${selftext || 'N/A'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an executive AI tech editor for 'Build with Mannat'. Be extremely concise, punchy, and technical.",
        temperature: 0.5,
      },
    });

    res.json({ summary: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to summarize Reddit post" });
  }
});

// API Route: Live / Trending High-Star AI GitHub Repositories
app.get("/api/github/trending", async (req, res) => {
  try {
    const topic = (req.query.topic as string) || 'ai';
    const minStars = req.query.minStars ? parseInt(req.query.minStars as string, 10) : 1000;
    
    // Query GitHub API for top starred repos in AI / LLM / Agent domain
    const query = encodeURIComponent(`topic:${topic} stars:>${minStars}`);
    const githubUrl = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=15`;

    const response = await fetch(githubUrl, {
      headers: {
        'User-Agent': 'BuildWithMannat-App/1.0',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const items = data.items || [];

    const repos = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      owner: item.owner?.login || 'unknown',
      ownerAvatar: item.owner?.avatar_url || '',
      description: item.description || 'High performance open source AI repository.',
      stars: item.stargazers_count,
      forks: item.forks_count,
      language: item.language || 'Python',
      topics: item.topics ? item.topics.slice(0, 5) : ['ai', 'llm'],
      url: item.html_url,
      starsToday: Math.floor(Math.random() * 400) + 100,
      updatedAt: getTimeAgo(new Date(item.updated_at).getTime() / 1000),
      useCase: item.description ? item.description.slice(0, 90) + '...' : 'AI engineering workflow building'
    }));

    res.json({
      success: true,
      topic,
      repos,
      totalCount: data.total_count,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.warn("GitHub API error, serving fallback curated repos:", err.message);

    const fallbackRepos = [
      {
        id: 101,
        name: 'google-genai-sdk',
        fullName: 'googleapis/python-genai',
        owner: 'googleapis',
        ownerAvatar: 'https://avatars.githubusercontent.com/u/6010059?v=4',
        description: 'The official Google GenAI SDK for Python, featuring Gemini 3.8 Flash, Live API, and structured schema outputs.',
        stars: 18450,
        forks: 2130,
        language: 'Python',
        topics: ['gemini', 'llm', 'google-ai', 'agentic-ai'],
        url: 'https://github.com/googleapis/python-genai',
        starsToday: 340,
        updatedAt: '2 hours ago',
        useCase: 'Production Gemini 3.8 integration & multimodal prompt orchestration'
      },
      {
        id: 102,
        name: 'vllm',
        fullName: 'vllm-project/vllm',
        owner: 'vllm-project',
        ownerAvatar: 'https://avatars.githubusercontent.com/u/132431405?v=4',
        description: 'High-throughput memory-efficient LLM serving engine with PagedAttention.',
        stars: 34200,
        forks: 5890,
        language: 'Python',
        topics: ['llm-serving', 'kv-cache', 'inference'],
        url: 'https://github.com/vllm-project/vllm',
        starsToday: 820,
        updatedAt: '1 hour ago',
        useCase: 'Self-hosted zero-latency LLM inference server'
      },
      {
        id: 103,
        name: 'ollama',
        fullName: 'ollama/ollama',
        owner: 'ollama',
        ownerAvatar: 'https://avatars.githubusercontent.com/u/144985060?v=4',
        description: 'Get up and running with Llama 3, DeepSeek, and open LLMs locally.',
        stars: 114000,
        forks: 9840,
        language: 'Go',
        topics: ['local-llm', 'llama', 'ai-inference'],
        url: 'https://github.com/ollama/ollama',
        starsToday: 1450,
        updatedAt: 'Just now',
        useCase: 'Local developer environment LLM execution'
      },
      {
        id: 104,
        name: 'langchain',
        fullName: 'langchain-ai/langchain',
        owner: 'langchain-ai',
        ownerAvatar: 'https://avatars.githubusercontent.com/u/126733545?v=4',
        description: 'Building applications with LLMs through composable abstractions and tools.',
        stars: 98200,
        forks: 16400,
        language: 'Python',
        topics: ['agents', 'rag', 'llm-framework'],
        url: 'https://github.com/langchain-ai/langchain',
        starsToday: 620,
        updatedAt: '3 hours ago',
        useCase: 'Chaining multi-step prompts & memory stores'
      },
      {
        id: 105,
        name: 'open-webui',
        fullName: 'open-webui/open-webui',
        owner: 'open-webui',
        ownerAvatar: 'https://avatars.githubusercontent.com/u/156972410?v=4',
        description: 'User-friendly WebUI for Ollama, OpenAI, and Gemini with RAG integration.',
        stars: 56700,
        forks: 6720,
        language: 'Svelte',
        topics: ['webui', 'chat-interface', 'ollama'],
        url: 'https://github.com/open-webui/open-webui',
        starsToday: 980,
        updatedAt: '5 hours ago',
        useCase: 'Turn-key ChatGPT alternative UI for team deployment'
      }
    ];

    res.json({
      success: true,
      topic: req.query.topic || 'ai',
      repos: fallbackRepos,
      isFallback: true,
      timestamp: new Date().toISOString()
    });
  }
});

// API Route: Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    brand: "Build with Mannat",
    timestamp: new Date().toISOString(),
    linkedIn: "https://www.linkedin.com/company/buildwithmannat/"
  });
});

// API Route: Gemini Prompt Generator / Mental Model Explainer
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { userQuery, taskType } = req.body;

    if (!userQuery || typeof userQuery !== 'string') {
      res.status(400).json({ error: "userQuery is required" });
      return;
    }

    const ai = getGeminiClient();

    let systemInstruction = "You are Mannat, a Staff Principal AI Engineer and founder of 'Build with Mannat'. Your tone is direct, clear, highly technical, and production-oriented.";

    if (taskType === 'prompt') {
      systemInstruction += " Craft a world-class, battle-tested ChatGPT/Claude System Prompt based on the user request. Include clear role instructions, constraints, output schemas, and edge case rules.";
    } else if (taskType === 'mental_model') {
      systemInstruction += " Provide a visual, step-by-step mental model explanation of the requested LLM architecture or concept. Break down how data flows step-by-step and include key takeaways.";
    } else if (taskType === 'python_sdk') {
      systemInstruction += " Write clean, production-grade Python 3.11+ async code using the official @google/genai SDK (GoogleGenAI). Include error handling, type hints, and comments.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to process AI generation request.",
    });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
