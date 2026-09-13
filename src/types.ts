/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TopicHighlight {
  id: string;
  title: string;
  category: 'prompts' | 'visuals' | 'python' | 'workflows';
  description: string;
  iconName: string;
  tag: string;
  featuredCode?: string;
  metrics?: string;
}

export interface PromptItem {
  id: string;
  title: string;
  category: 'Developer Tools' | 'System Architecture' | 'Refactoring & Debugging' | 'Prompt Engineering' | 'Founder Strategy';
  description: string;
  promptText: string;
  variables: string[];
  tips: string;
  author: string;
  likes: number;
}

export interface MentalModelStep {
  stepNumber: number;
  title: string;
  explanation: string;
  codeSnippet?: string;
}

export interface MentalModel {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  steps: MentalModelStep[];
  pythonExample: string;
  keyTakeaways: string[];
}

export interface WorkflowSnippet {
  id: string;
  title: string;
  language: string;
  description: string;
  tags: string[];
  code: string;
}

export interface LinkedInPost {
  id: string;
  author: string;
  authorTitle: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  postUrl: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'code' | 'article';
  codeSnippet?: string;
  tags: string[];
  isPinned?: boolean;
}

export interface RedditNewsItem {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  score: number;
  numComments: number;
  permalink: string;
  url: string;
  createdUtc: number;
  timeAgo: string;
  thumbnail?: string;
  selftext?: string;
  summary?: string;
}

export interface GithubRepoItem {
  id: number | string;
  name: string;
  fullName: string;
  owner: string;
  ownerAvatar: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  url: string;
  starsToday?: number;
  updatedAt: string;
  useCase?: string;
}

export interface LinkedInButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'compact' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  followerCount?: string;
  customText?: string;
  className?: string;
}
