// store/useSettingsStore.ts
'use client';

import { create } from 'zustand';

export type ModelProvider = 'openai' | 'anthropic' | 'ollama';

interface SettingsState {
  // 模型配置
  provider: ModelProvider;
  apiKey: string;
  modelName: string;
  
  // Ollama 配置
  ollamaBaseUrl: string;
  ollamaModel: string;
  
  // 应用设置
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  language: 'zh-CN' | 'en';
  
  // 行为设置
  saveHistory: boolean;
  maxHistoryItems: number;
  showSources: boolean;
  
  // 动作
  setProvider: (provider: ModelProvider) => void;
  setApiKey: (apiKey: string) => void;
  setModelName: (modelName: string) => void;
  setOllamaBaseUrl: (url: string) => void;
  setOllamaModel: (model: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setLanguage: (lang: 'zh-CN' | 'en') => void;
  setSaveHistory: (save: boolean) => void;
  setShowSources: (show: boolean) => void;
  
  // 重置
  reset: () => void;
}

const defaultState: SettingsState = {
  provider: 'openai',
  apiKey: '',
  modelName: 'gpt-4-turbo-preview',
  ollamaBaseUrl: 'http://localhost:11434',
  ollamaModel: 'llama2',
  theme: 'light',
  fontSize: 'medium',
  language: 'zh-CN',
  saveHistory: true,
  maxHistoryItems: 100,
  showSources: true,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  ...defaultState,
  
  setProvider: (provider) => set({ provider }),
  setApiKey: (apiKey) => set({ apiKey }),
  setModelName: (modelName) => set({ modelName }),
  setOllamaBaseUrl: (ollamaBaseUrl) => set({ ollamaBaseUrl }),
  setOllamaModel: (ollamaModel) => set({ ollamaModel }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setLanguage: (language) => set({ language }),
  setSaveHistory: (saveHistory) => set({ saveHistory }),
  setShowSources: (showSources) => set({ showSources }),
  
  reset: () => set(defaultState),
}));

// 本地存储持久化
export const persistSettings = () => {
  if (typeof window === 'undefined') return;
  
  const store = useSettingsStore.getState();
  const settings = {
    provider: store.provider,
    apiKey: store.apiKey,
    modelName: store.modelName,
    ollamaBaseUrl: store.ollamaBaseUrl,
    ollamaModel: store.ollamaModel,
    theme: store.theme,
    fontSize: store.fontSize,
    language: store.language,
    saveHistory: store.saveHistory,
    maxHistoryItems: store.maxHistoryItems,
    showSources: store.showSources,
  };
  
  localStorage.setItem('legalease-settings', JSON.stringify(settings));
};

export const loadSettings = () => {
  if (typeof window === 'undefined') return;
  
  const saved = localStorage.getItem('legalease-settings');
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      useSettingsStore.setState(settings);
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
  }
};
