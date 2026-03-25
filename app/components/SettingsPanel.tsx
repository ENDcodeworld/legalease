'use client';

import { useState } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  ChevronDown,
  Check,
  Globe,
  Type,
  Palette,
  History,
  Eye
} from 'lucide-react';
import { useSettingsStore, persistSettings } from '../store/useSettingsStore';

export function SettingsPanel() {
  const {
    provider,
    apiKey,
    modelName,
    ollamaBaseUrl,
    ollamaModel,
    theme,
    fontSize,
    language,
    saveHistory,
    showSources,
    setProvider,
    setApiKey,
    setModelName,
    setOllamaBaseUrl,
    setOllamaModel,
    setTheme,
    setFontSize,
    setLanguage,
    setSaveHistory,
    setShowSources,
    reset,
  } = useSettingsStore();

  const [isOpen, setIsOpen] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(localApiKey);
    persistSettings();
    setIsOpen(false);
  };

  const providerModels = {
    openai: ['gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    ollama: [ollamaModel], // Ollama 模型需要从服务器获取
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="设置"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 w-96 max-h-[calc(100vh-5rem)] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">设置</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="保存"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={reset}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="重置"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* 模型提供商 */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4" />
                  AI 模型提供商
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['openai', 'anthropic', 'ollama'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProvider(p)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        provider === p
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p === 'openai' ? 'OpenAI' : p === 'anthropic' ? 'Anthropic' : 'Ollama'}
                    </button>
                  ))}
                </div>
              </div>

              {/* API Key */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  API Key
                  {provider === 'openai' && (
                    <span className="text-xs text-gray-500">(OpenAI)</span>
                  )}
                  {provider === 'anthropic' && (
                    <span className="text-xs text-gray-500">(Anthropic)</span>
                  )}
                </label>
                <input
                  type="password"
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  placeholder={`输入你的 ${provider === 'ollama' ? 'Ollama 不需要 API Key' : 'API Key'}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled={provider === 'ollama'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {provider === 'openai' && '从 https://platform.openai.com/api-keys 获取'}
                  {provider === 'anthropic' && '从 https://console.anthropic.com 获取'}
                  {provider === 'ollama' && '本地运行 Ollama，无需 API Key'}
                </p>
              </div>

              {/* 模型选择 */}
              {provider !== 'ollama' && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    模型名称
                  </label>
                  <div className="relative">
                    <select
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {providerModels[provider].map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Ollama 配置 */}
              {provider === 'ollama' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Ollama 服务器地址
                    </label>
                    <input
                      type="text"
                      value={ollamaBaseUrl}
                      onChange={(e) => setOllamaBaseUrl(e.target.value)}
                      placeholder="http://localhost:11434"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Ollama 模型名称
                    </label>
                    <input
                      type="text"
                      value={ollamaModel}
                      onChange={(e) => setOllamaModel(e.target.value)}
                      placeholder="llama2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      确保 Ollama 已运行并已拉取该模型
                    </p>
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-4">
                {/* 主题 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">主题</span>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {(['light', 'dark', 'auto'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          theme === t
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {t === 'light' ? '浅色' : t === 'dark' ? '深色' : '自动'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 字体大小 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">字体大小</span>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {(['small', 'medium', 'large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          fontSize === size
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 语言 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">语言</span>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    {(['zh-CN', 'en'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          language === lang
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {lang === 'zh-CN' ? '中文' : 'English'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 显示来源 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">显示来源</span>
                  </div>
                  <button
                    onClick={() => setShowSources(!showSources)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      showSources ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        showSources ? 'left-0.5' : 'left-0.5'
                      }`}
                      style={{ transform: showSources ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>

                {/* 保存历史 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">保存聊天历史</span>
                  </div>
                  <button
                    onClick={() => setSaveHistory(!saveHistory)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      saveHistory ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        saveHistory ? 'left-0.5' : 'left-0.5'
                      }`}
                      style={{ transform: saveHistory ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                </div>
              </div>

              {/* 保存提示 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  💡 设置会自动保存到浏览器本地存储。更换设备需要重新配置。
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
