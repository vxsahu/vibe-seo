export interface ContentStrategy {
  title_ideas: string[];
  meta_description: string;
  target_keywords: string[];
  categories: string[];
  tags: string[];
  outline: string[];
  first_paragraph: string;
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  strategy: ContentStrategy;
  sources: SearchSource[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}