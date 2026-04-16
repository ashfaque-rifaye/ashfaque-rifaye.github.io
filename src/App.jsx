import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Brain,
  Briefcase,
  Award,
  MessageSquare,
  ExternalLink,
  Mail,
  Linkedin,
  ChevronRight,
  Cpu,
  Globe,
  Sparkles,
  Sun,
  Moon,
  Send,
  BarChart2,
  Menu,
  X,
  Bot,
  User,
  Loader2,
  Download,
  FileText,
  File,
  Star,
  Quote,
  ThumbsUp,
  TrendingUp,
  Zap,
  Target,
  CheckCircle,
  ShieldCheck,
  MapPin,
  ScrollText,
  Trophy,
  Palette,
  Code2,
  Github
} from 'lucide-react';

const Portfolio = () => {
  // --- CONFIGURATION ---
  // HuggingFace Spaces Endpoints with Bearer Token Authentication
  const llmEndpoints = [
    'https://ashfaque94-inference-gateway-4.hf.space',
    'https://ashfaque94-inference-gateway-5.hf.space'
  ];
  const gatewayApiKey = import.meta.env.VITE_GATEWAY_API_KEY || "";
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

  // Log configuration on load (for debugging)
  useEffect(() => {
    console.log('[Config] LLM Endpoints:', llmEndpoints);
    console.log('[Config] Gateway API Key:', gatewayApiKey ? `✓ Set (${gatewayApiKey.substring(0, 6)}...)` : '✗ Missing - Chat will fail');
    if (!gatewayApiKey) {
      console.error('[Config] ❌ GATEWAY_API_KEY not found in .env file!');
    }
  }, []);

  // --- CODESANDBOX PROJECTS (Interactive Demos) ---
  // To add a CodeSandbox embed, provide the sandbox ID from the URL: https://codesandbox.io/s/[SANDBOX_ID]
  // Get the embed URL from: Share Button → Embed
  const CODESANDBOX_PROJECTS = [
    {
      id: 'att-helios',
      title: 'AT&T Helios: Zero Friction Convergence',
      description: 'AI-fueled seamless one-click bundle experience. Won "Best in Show" at AT&T Innovation Jam 2025.',
      sandboxId: '', // TODO: Add sandbox ID from https://codesandbox.io when available
      tags: ['React', 'AI/ML', 'UX Design', 'Hackathon Winner']
    },
    {
      id: 'travel-personalization',
      title: 'Hyper-Personalized International Travel',
      description: 'AI-driven predictive modeling for personalized travel plans. AT&T Hackathon 1st Place Winner 2025.',
      sandboxId: '', // TODO: Add sandbox ID from https://codesandbox.io when available
      tags: ['AI/ML', 'Predictive Analytics', 'Hackathon 1st Place']
    },
    {
      id: 'genai-virtual-assistant',
      title: 'GenAI Virtual Assistant (CCAI/Dialogflow)',
      description: 'Production conversational AI handling 1.5M+ monthly customer interactions across omnichannel (chat, voice, WhatsApp, RCS).',
      sandboxId: '', // TODO: Add sandbox ID from https://codesandbox.io when available
      tags: ['Google CCAI', 'Dialogflow CX', 'Production AI', 'Omnichannel']
    }
  ];

  const RESUME_CONTEXT = `
You are Ashfaque Rifaye's AI assistant. Answer in EXACTLY 1-3 SHORT lines with emojis.

RULES:
- MAX 150 characters per response
- Use ONLY: 🚀 💡 🎯 ⭐ 📊 $
- Format metrics as [1.5M+] not sentences
- NO long explanations - facts only
- Template: EMOJI Point [metric] | EMOJI Point [metric]

DATA SHORTCUTS:
- AI/ML: RAG, CCAI, Dialogflow, 1.5M+ users, 55% containment, $4.2M saved
- AT&T: Virtual Assistant PM, 9 years, GenAI expert, 350+ intents
- Skills: Python, SQL, Power BI, React, SAFe, Product Ownership
- Awards: AT&T Best in Show 2025, Hackathon 1st Place 2025
- Certs: SAFe 6, Azure AI, CSPO

EXAMPLE ANSWER:
🚀 GenAI Virtual Assistant [1.5M+ monthly] | 💡 RAG-powered CCAI system | 📊 $4.2M annual savings

DO NOT explain. DO NOT elaborate. FACTS ONLY.
  `;

  // Truncate and format response
  const truncateResponse = (text, maxChars = 200) => {
    if (text.length > maxChars) {
      return text.substring(0, maxChars).trim() + '...';
    }
    return text;
  };

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  const [colorMode, setColorMode] = useState('dark'); // 'dark' | 'light' | 'high-contrast' | 'warm'
  const isDark = colorMode === 'dark' || colorMode === 'high-contrast';
  const [typedText, setTypedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Ashfaque's AI Twin. Ask me anything about his experience, skills, or projects! ✨", model: 'System' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatEndRef = useRef(null);
  const chatSessionTurns = useRef(0);
  const chatOpenTime = useRef(null);

  const suggestedQuestions = [
    "AI/ML experience?",
    "AT&T projects?",
    "Hackathon wins?",
    "Key certifications?"
  ];

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const fullText = "Delivering Scalable AI Solutions & Digital Transformation.";

  // --- ANALYTICS ENGINE (Google Analytics 4) ---
  useEffect(() => {
    // 1. Inject GA Script dynamically
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);

  const trackEvent = (eventName, params = {}) => {
    console.log(`[Analytics] ${eventName}:`, params);
    if (window.gtag && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
      window.gtag('event', eventName, params);
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }

    trackEvent('page_view', { page_title: 'Portfolio Home' });

    // Scroll depth tracking
    const scrollDepthFired = new Set();
    const handleScroll = () => {
      const scrollPct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      [25, 50, 75, 90].forEach(threshold => {
        if (scrollPct >= threshold && !scrollDepthFired.has(threshold)) {
          scrollDepthFired.add(threshold);
          trackEvent('scroll_depth', { percent: threshold, section: document.title });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // --- HANDLERS ---
  const handleColorModeChange = (mode) => {
    setColorMode(mode);
    trackEvent('toggle_theme', { mode });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close mobile menu on selection
    trackEvent('view_section', { section_name: tab });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', { method: 'email_client' });
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:ashfaque_rifaye@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownload = (format) => {
    trackEvent('resume_download', {
      file_name: 'Ashfaque_Resume',
      file_extension: format,
      download_timestamp: new Date().toISOString(),
      referrer_section: activeTab
    });
    // Also fire GA4 standard file_download event for built-in report compatibility
    trackEvent('file_download', {
      file_name: 'Ashfaque_Resume',
      file_extension: format
    });
    const link = document.createElement('a');
    link.href = '/Ashfaque_Rifaye_Resume.pdf';
    link.download = 'Ashfaque_Rifaye_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadOptions(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    if (!gatewayApiKey) {
      setChatHistory(prev => [...prev, { 
        role: 'model', 
        text: '❌ Configuration Error: GATEWAY_API_KEY not found in environment variables. Please check your .env file.' 
      }]);
      return;
    }

    const userMessage = chatInput;
    setChatInput('');
    chatSessionTurns.current += 1;
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage, model: 'You' }]);
    setIsChatLoading(true);

    // Classify topic from message for topic analytics
    const topicKeywords = {
      'AI/ML': ['ai', 'ml', 'machine learning', 'chatbot', 'nlp', 'llm', 'dialogflow', 'genai', 'rag', 'ccai'],
      'AT&T': ['att', 'at&t', 'helios', 'virtual assistant', 'telecom'],
      'Hackathon': ['hackathon', 'hack', 'innovation jam', 'award', 'win'],
      'Certifications': ['cert', 'certification', 'safe', 'azure', 'cspo', 'credential'],
      'Skills': ['skill', 'python', 'sql', 'react', 'power bi', 'tech stack'],
      'Experience': ['experience', 'years', 'career', 'job', 'work', 'role'],
    };
    const lowerMsg = userMessage.toLowerCase();
    const detectedTopic = Object.entries(topicKeywords).find(([, kws]) => kws.some(kw => lowerMsg.includes(kw)))?.[0] || 'General';

    trackEvent('chat_message_sent', {
      query_length: userMessage.length,
      topic: detectedTopic,
      turn_number: chatSessionTurns.current,
      session_duration_sec: chatOpenTime.current ? Math.round((Date.now() - chatOpenTime.current) / 1000) : 0
    });

    let success = false;
    let lastError = null;

    // Try each endpoint with the Bearer token
    for (const endpoint of llmEndpoints) {
      try {
        const url = `${endpoint}/v1/chat/completions`;
        console.log(`[Chat] Trying endpoint: ${endpoint}`);
        console.log(`[Chat] Auth: Bearer ${gatewayApiKey.substring(0, 10)}...`);
        
        // ✅ CORRECT: Only Authorization header with Bearer token
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gatewayApiKey}`
        };
        
        const payload = {
          model: 'google/gemini-2.0-flash',
          messages: [
            { role: 'system', content: RESUME_CONTEXT },
            ...chatHistory.map(msg => ({
              role: msg.role === 'model' ? 'assistant' : 'user',
              content: msg.text
            })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 1024
        };

        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        console.log(`[Chat] Response Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
          
          // Truncate response to 200 chars max
          const truncatedResponse = truncateResponse(aiResponse, 200);
          
          // Extract model info from response or use provider info
          const model = data.model || data.provider || 'Unknown Model';
          
          console.log(`[Chat] ✅ SUCCESS - Response received from ${endpoint}`);
          setChatHistory(prev => [...prev, { role: 'model', text: truncatedResponse, model: model }]);
          trackEvent('chat_response_received', {
            model_used: model,
            response_length: truncatedResponse.length,
            endpoint_index: llmEndpoints.indexOf(endpoint),
            turn_number: chatSessionTurns.current
          });
          success = true;
          break;
        } else {
          const errorBody = await response.text().catch(() => 'No response body');
          console.error(`[Chat] ❌ Status ${response.status}:`, errorBody);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

      } catch (error) {
        lastError = error;
        console.warn(`[Chat] ❌ Endpoint failed (${endpoint}): ${error.message}`);
      }
    }

    if (!success) {
      const errorMsg = lastError?.message || 'All endpoints failed';
      console.error(`[Chat] ❌ All endpoints exhausted. Final error: ${errorMsg}`);
      setChatHistory(prev => [...prev, { 
        role: 'model', 
        text: `Connection Failed: ${errorMsg}. Please check browser console (F12) for detailed logs.` 
      }]);
      trackEvent('chat_error', {
        error_message: errorMsg.substring(0, 100),
        endpoints_tried: llmEndpoints.length,
        turn_number: chatSessionTurns.current
      });
    }

    setIsChatLoading(false);
  };

  // --- THEME CLASSES ---
  const bgClass = colorMode === 'warm' ? 'bg-amber-50' : colorMode === 'high-contrast' ? 'bg-black' : isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textClass = colorMode === 'warm' ? 'text-amber-900' : colorMode === 'high-contrast' ? 'text-white' : isDark ? 'text-slate-200' : 'text-slate-800';
  const cardBgClass = colorMode === 'high-contrast'
    ? 'bg-gray-900 backdrop-blur-sm border-gray-600'
    : colorMode === 'warm'
    ? 'bg-white/90 backdrop-blur-sm border-amber-200 shadow-md'
    : isDark
    ? 'bg-slate-900/50 backdrop-blur-sm border-white/5'
    : 'bg-white/70 backdrop-blur-sm border-slate-200 shadow-sm';
  const headingClass = colorMode === 'warm' ? 'text-amber-950' : colorMode === 'high-contrast' ? 'text-white' : isDark ? 'text-white' : 'text-slate-900';
  const subTextClass = colorMode === 'warm' ? 'text-amber-700' : colorMode === 'high-contrast' ? 'text-gray-300' : isDark ? 'text-slate-400' : 'text-slate-600';
  const accentTextClass = colorMode === 'warm' ? 'text-amber-600' : colorMode === 'high-contrast' ? 'text-yellow-400' : isDark ? 'text-indigo-400' : 'text-indigo-600';

  // --- SKILL ICONS ---
  const skills = [
    { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
    { name: 'Dialogflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Confluence', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg' },
  ];

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-indigo-500/30 transition-colors duration-500`}>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse ${!isDark && 'opacity-30'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse delay-1000 ${!isDark && 'opacity-30'}`}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* --- STICKY HEADER --- */}
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">

            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleTabChange('overview')}>
              <div className={`p-2 rounded-xl border transition-colors ${isDark ? 'border-indigo-500/30 bg-indigo-500/10 group-hover:bg-indigo-500/20' : 'border-indigo-200 bg-indigo-50 group-hover:bg-indigo-100'}`}>
                <Terminal size={22} className={accentTextClass} />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-lg md:text-xl font-bold ${headingClass} tracking-tight leading-none`}>Ashfaque Rifaye</h1>
                <p className={`text-[10px] md:text-xs ${subTextClass} font-mono uppercase tracking-wide mt-0.5`}>Tech BA | AI PM</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-3">
              <nav className={`flex items-center space-x-1 p-1 rounded-full border ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                {['overview', 'experience', 'works', 'awards', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : `${subTextClass} hover:${headingClass} hover:bg-black/5 dark:hover:bg-white/5`
                      }`}
                  >
                    {tab === 'awards' ? 'Awards' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>

              {/* Color Mode Dropdown */}
              <div className="relative group">
                <button
                  className={`p-1.5 rounded-full border transition-all flex items-center ${isDark ? 'bg-slate-800 border-white/10 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
                  aria-label="Select Color Mode"
                >
                  {colorMode === 'dark' && <Moon size={14} className="text-indigo-400" />}
                  {colorMode === 'light' && <Sun size={14} className="text-amber-500" />}
                  {colorMode === 'high-contrast' && <span className="text-xs font-bold text-yellow-400">HC</span>}
                  {colorMode === 'warm' && <span className="text-sm leading-none">🔥</span>}
                </button>
                {/* Hover Tooltip with Mode Name */}
                <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDark ? 'bg-slate-800 text-white border border-white/10' : 'bg-slate-700 text-white border border-white/20'}`}>
                  {colorMode === 'dark' ? 'Dark' : colorMode === 'light' ? 'Light' : colorMode === 'high-contrast' ? 'High Contrast' : 'Warm'}
                </span>
                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-2xl border overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className={`px-3 py-2 text-[10px] font-mono uppercase tracking-widest ${subTextClass}`}>Display Mode</div>
                  {[
                    { id: 'dark', icon: <Moon size={14} className="text-indigo-400" />, label: 'Dark', desc: 'Deep navy' },
                    { id: 'light', icon: <Sun size={14} className="text-amber-500" />, label: 'Light', desc: 'Clean white' },
                    { id: 'high-contrast', icon: <span className="text-xs font-black text-yellow-400 w-3.5 text-center">HC</span>, label: 'High Contrast', desc: 'WCAG AAA' },
                    { id: 'warm', icon: <span className="text-sm leading-none">🔥</span>, label: 'Warm', desc: 'Sepia / eye-friendly' }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => handleColorModeChange(mode.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${colorMode === mode.id ? 'bg-indigo-600 text-white' : `${textClass} hover:bg-indigo-500/10`}`}
                    >
                      <span className="flex-shrink-0 w-4 flex justify-center">{mode.icon}</span>
                      <span className="text-sm font-semibold">{mode.label}</span>
                      {colorMode !== mode.id && <span className={`text-xs ml-auto ${subTextClass}`}>{mode.desc}</span>}
                      {colorMode === mode.id && <CheckCircle size={14} className="ml-auto text-white/80" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-3">
              <div className="relative group">
                <button className={`p-1.5 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-white/10 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'}`}>
                  {colorMode === 'dark' && <Moon size={14} className="text-indigo-400" />}
                  {colorMode === 'light' && <Sun size={14} className="text-amber-500" />}
                  {colorMode === 'high-contrast' && <span className="text-xs font-bold text-yellow-400">HC</span>}
                  {colorMode === 'warm' && <span className="text-sm">🔥</span>}
                </button>
                {/* Hover Tooltip with Mode Name */}
                <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDark ? 'bg-slate-800 text-white border border-white/10' : 'bg-slate-700 text-white border border-white/20'}`}>
                  {colorMode === 'dark' ? 'Dark' : colorMode === 'light' ? 'Light' : colorMode === 'high-contrast' ? 'High Contrast' : 'Warm'}
                </span>
                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-full mt-2 w-44 rounded-xl shadow-2xl border overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                  {[
                    { id: 'dark', icon: <Moon size={12} className="text-indigo-400" />, label: 'Dark' },
                    { id: 'light', icon: <Sun size={12} className="text-amber-500" />, label: 'Light' },
                    { id: 'high-contrast', icon: <span className="text-xs font-bold text-yellow-400">HC</span>, label: 'High Contrast' },
                    { id: 'warm', icon: <span className="text-xs">🔥</span>, label: 'Warm' }
                  ].map(mode => (
                    <button key={mode.id} onClick={() => handleColorModeChange(mode.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${colorMode === mode.id ? 'bg-indigo-600 text-white' : `${textClass} hover:bg-indigo-500/10`}`}>
                      <span className="flex-shrink-0 w-3.5 flex justify-center">{mode.icon}</span>
                      {mode.label}
                      {colorMode === mode.id && <CheckCircle size={12} className="ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${headingClass} hover:bg-white/10`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className={`md:hidden absolute left-0 right-0 top-full p-4 border-b shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 z-40 ${isDark ? 'bg-slate-950/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
              <nav className="flex flex-col space-y-1">
                {['overview', 'experience', 'works', 'awards', 'contact'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 font-medium ${activeTab === tab ? 'bg-indigo-600 text-white' : `${textClass} hover:bg-white/5`
                      }`}
                  >
                    {tab === 'awards' ? 'Awards & Testimonials' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8">

          {/* --- OVERVIEW PAGE (BENTO GRID) --- */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* 1. HERO SECTION (2x2) */}
              <div className={`md:col-span-2 md:row-span-2 ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-white'} rounded-3xl p-6 md:p-8 border ${isDark ? 'border-white/5' : 'border-slate-200'} shadow-xl relative overflow-hidden group`}>

                {/* BRAIN ICON - Opacity reduced to 5% */}
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                  <Brain size={120} />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-6">
                      <div className="relative shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-indigo-500 shadow-lg overflow-hidden bg-indigo-500/20">
                          <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <defs>
                              <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e40af"/>
                                <stop offset="100%" stopColor="#3b82f6"/>
                              </linearGradient>
                            </defs>
                            {/* Background */}
                            <circle cx="40" cy="40" r="40" fill="url(#avatarBg)"/>
                            {/* Suit jacket */}
                            <path d="M6 80 L6 61 C6 53 17 48 27 46 L35.5 44 L40 53 L44.5 44 L53 46 C63 48 74 53 74 61 L74 80Z" fill="#1e3a8a"/>
                            {/* White shirt collar */}
                            <polygon points="35.5,44 40,53 44.5,44 42,42.5 40,51 38,42.5" fill="white"/>
                            {/* Tie */}
                            <polygon points="38.5,42.5 41.5,42.5 40.8,53 40,55.5 39.2,53" fill="#dc2626"/>
                            {/* Neck */}
                            <rect x="34.5" y="37" width="11" height="10" rx="2" fill="#f8c460"/>
                            {/* Head */}
                            <ellipse cx="40" cy="29" rx="16" ry="18" fill="#f8c460"/>
                            {/* Short dark hair */}
                            <path d="M24 25 C24 14 30 9 40 9 C50 9 56 14 56 25 C54 18 48 14 40 14 C32 14 26 18 24 25Z" fill="#2d1a0e"/>
                            <rect x="24" y="14" width="32" height="13" fill="#2d1a0e"/>
                            {/* Hair sides (close-crop sideburns) */}
                            <rect x="24" y="19" width="3" height="13" rx="1.5" fill="#2d1a0e"/>
                            <rect x="53" y="19" width="3" height="13" rx="1.5" fill="#2d1a0e"/>
                            {/* Ears */}
                            <ellipse cx="24" cy="30" rx="3.5" ry="4.5" fill="#f8c460"/>
                            <ellipse cx="56" cy="30" rx="3.5" ry="4.5" fill="#f8c460"/>
                            <ellipse cx="24" cy="30" rx="1.8" ry="2.5" fill="#e0a830"/>
                            <ellipse cx="56" cy="30" rx="1.8" ry="2.5" fill="#e0a830"/>
                            {/* Thick masculine eyebrows */}
                            <rect x="27.5" y="22.5" width="9" height="2" rx="1" fill="#2d1a0e"/>
                            <rect x="43.5" y="22.5" width="9" height="2" rx="1" fill="#2d1a0e"/>
                            {/* Eye whites */}
                            <ellipse cx="32" cy="28.5" rx="4" ry="3.2" fill="white"/>
                            <ellipse cx="48" cy="28.5" rx="4" ry="3.2" fill="white"/>
                            {/* Irises */}
                            <circle cx="32.5" cy="28.5" r="2.4" fill="#3d2b1f"/>
                            <circle cx="48.5" cy="28.5" r="2.4" fill="#3d2b1f"/>
                            {/* Pupils */}
                            <circle cx="32.5" cy="28.5" r="1.2" fill="#0f0a07"/>
                            <circle cx="48.5" cy="28.5" r="1.2" fill="#0f0a07"/>
                            {/* Eye highlights */}
                            <circle cx="33.5" cy="27.5" r="0.9" fill="white" opacity="0.65"/>
                            <circle cx="49.5" cy="27.5" r="0.9" fill="white" opacity="0.65"/>
                            {/* Nose */}
                            <path d="M37.5 34.5 C37.5 37 38.8 38 40 38 C41.2 38 42.5 37 42.5 34.5" stroke="#d4940a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                            {/* Smile */}
                            <path d="M33.5 41 Q40 45.5 46.5 41" stroke="#b87010" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                            {/* Short beard / stubble shadow */}
                            <ellipse cx="40" cy="42.5" rx="10" ry="3.5" fill="#b87010" opacity="0.22"/>
                            <ellipse cx="33" cy="40" rx="5" ry="2.5" fill="#b87010" opacity="0.18"/>
                            <ellipse cx="47" cy="40" rx="5" ry="2.5" fill="#b87010" opacity="0.18"/>
                          </svg>
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                          <div className="w-full h-full rounded-full animate-ping bg-emerald-400 opacity-75 absolute"></div>
                        </div>
                      </div>

                      {/* RESUME & OPEN TO WORK STACK */}
                      <div className="flex flex-col gap-3 w-full sm:w-auto sm:items-end">
                        <div className="flex flex-wrap items-center gap-3">
                          {/* RESUME BUTTON (LEFT) */}
                          <div className="relative">
                            <button
                              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/50`}
                            >
                              <Download size={16} /> Resume
                            </button>

                            {showDownloadOptions && (
                              <div className={`absolute left-0 top-full mt-2 w-44 rounded-xl shadow-xl border overflow-hidden z-20 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                                <button onClick={() => handleDownload('PDF')} className={`w-full text-left px-4 py-3 text-xs flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors ${subTextClass}`}>
                                  <FileText size={14} /> Download PDF
                                </button>
                                <button onClick={() => handleDownload('Word')} className={`w-full text-left px-4 py-3 text-xs flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors ${subTextClass}`}>
                                  <File size={14} /> Download Word
                                </button>
                              </div>
                            )}
                          </div>

                          {/* OPEN TO WORK BADGE (RIGHT) */}
                          <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Open to Work</span>
                          </div>
                        </div>

                        {/* LOCATION INFO IN HERO */}
                        <div className={`flex flex-col items-start sm:items-end text-left sm:text-right mt-1`}>
                          <div className={`flex items-center gap-1.5 text-sm font-bold ${headingClass}`}>
                            <MapPin size={16} className={accentTextClass} /> Chennai, IND
                          </div>
                          <p className={`text-[10px] ${subTextClass} mt-0.5 opacity-80`}>Open to: BLR, HYD, DXB, Remote</p>
                        </div>
                      </div>
                    </div>

                    <h2 className={`text-2xl md:text-5xl font-bold ${headingClass} leading-tight`}>
                      Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Intelligent Products</span> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">AI Era</span>.
                    </h2>
                  </div>

                  <div className={`font-mono ${accentTextClass} h-6 text-sm md:text-base`}>
                    &gt; {typedText}<span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>

              {/* 2. EXPERIENCE TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <Briefcase size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>9+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Years Experience</span>
                </div>
              </div>

              {/* 3. CERTIFICATIONS TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>4+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Global Certifications</span>
                </div>
              </div>

              {/* 4. REVENUE TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>$4.2M+</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Annual Cost Savings</span>
                </div>
              </div>

              {/* 5. AWARDS TILE (1x1) */}
              <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl w-fit ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                    <Award size={24} />
                  </div>
                </div>
                <div>
                  <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>5</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Industry Awards</span>
                </div>
              </div>

              {/* 6. SKILLS SECTION (2 cols) */}
              <div className={`md:col-span-2 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                <h3 className={`text-xl font-bold ${headingClass} mb-6 flex items-center`}>
                  <Cpu className={`mr-2 ${accentTextClass}`} /> Core Competencies
                </h3>

                <div className="mb-8">
                  <h4 className={`text-xs font-bold ${subTextClass} mb-4 uppercase tracking-wider`}>Tech Stack</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.name} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all hover:scale-105 ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:shadow-md'}`}>
                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 mb-2" />
                        <span className={`text-[10px] font-medium ${subTextClass}`}>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}><Target size={16} className="text-indigo-500" /> Product Strategy</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Product Ownership', 'Strategy Roadmap', 'SAFe Agile', 'Scrum', 'Data Driven', 'KPI Frameworks'].map(skill => (
                        <span key={skill} className={`px-2 py-1 rounded-lg text-[10px] font-medium border cursor-default ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}><Bot size={16} className="text-emerald-500" /> AI & Tech</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Generative AI', 'RAG', 'Google CCAI', 'Dialogflow', 'LLMs', 'NLP', 'Genesys CX', 'Power BI'].map(skill => (
                        <span key={skill} className={`px-2 py-1 rounded-lg text-[10px] font-medium border cursor-default ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. ABOUT ME (2 cols) */}
              <div className={`md:col-span-2 rounded-3xl p-8 border flex flex-col justify-between ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <div>
                  <h3 className={`text-xl font-bold ${headingClass} mb-4`}>About Me</h3>
                  <p className={`${subTextClass} leading-relaxed mb-4`}>
                    I'm a <strong>Technical Business Analyst / AI Product Manager</strong> with 9 years of experience delivering AI-driven digital solutions, virtual assistants, and enterprise-scale automation for telecom and consumer platforms.
                    I specialize in bridging the gap between business strategy and technical execution, particularly in the <strong>Telecom, Retail/E-Commerce, and Customer Experience Domains</strong>. Recognized for combining technical depth and business acumen to translate strategy into scalable digital experiences.
                  </p>
                </div>
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h4 className={`text-sm font-semibold ${headingClass} mb-2`}>Education</h4>
                  <p className={`text-sm ${subTextClass}`}>B.E. Mechanical Engineering — Distinction (CGPA: 8.596)</p>
                  <p className={`text-xs ${subTextClass} opacity-70`}>Velammal Engineering College, Anna University (2012–2016)</p>
                </div>
              </div>

              {/* 8. CERTIFICATIONS (Full Width) */}
              <div className={`md:col-span-4 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <h3 className={`text-lg font-bold ${headingClass}`}>Professional Certifications</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "SAFe 6 LPM", desc: "Lean Portfolio Manager", year: "2024", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { name: "SAFe 6 Agilist", desc: "SA & PO/PM", year: "2023", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { name: "CSPO", desc: "Certified Scrum PO", year: "2022", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { name: "Azure AI", desc: "AI Fundamentals", year: "2023", color: "text-cyan-500", bg: "bg-cyan-500/10" }
                  ].map((cert, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border transition-all hover:scale-105 ${isDark ? 'bg-slate-800/50 border-white/5 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-md'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg ${cert.bg} ${cert.color}`}>
                          <CheckCircle size={18} />
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-1 rounded ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>{cert.year}</span>
                      </div>
                      <h4 className={`font-bold text-sm ${headingClass} mb-1`}>{cert.name}</h4>
                      <p className={`text-xs ${subTextClass}`}>{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ANALYTICS BADGE (ADMIN ONLY) */}
              {isAdmin && (
                <div className={`md:col-span-4 rounded-3xl p-6 flex items-center justify-center gap-2 shadow-lg ${isDark ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-indigo-600 text-white'}`}>
                  <BarChart2 size={24} className="text-white/80" />
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-mono">Analytics Ready</p>
                    <p className="text-sm font-bold text-white">Track Visits</p>
                  </div>
                </div>
              )}

              {/* AI STACK TILE */}
              <div className={`md:col-span-4 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="text-violet-500" size={24} />
                  <div>
                    <h3 className={`text-lg font-bold ${headingClass}`}>AI Stack & Models</h3>
                    <p className={`text-xs ${subTextClass} mt-0.5`}>Tools and models I actively use and experiment with</p>
                  </div>
                </div>

                {/* Tools Row */}
                <div className="mb-5">
                  <p className={`text-[10px] font-mono uppercase tracking-widest ${subTextClass} mb-3`}>Platforms & Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Lovable', icon: '🎨' },
                      { name: 'GitHub Copilot', icon: '⚙️' },
                      { name: 'Emergent', icon: '🧠' },
                      { name: 'Gemma', icon: '🤖' },
                      { name: 'Microsoft Copilot', icon: '🔮' },
                      { name: 'Perplexity AI', icon: '🔍' },
                      { name: 'MixPanel', icon: '📊' },
                      { name: 'Hugging Face', icon: '🤗' }
                    ].map((tool) => (
                      <span key={tool.name} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all hover:scale-105 cursor-default ${
                        isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-50 border-violet-200 text-violet-700'
                      }`}>
                        <span>{tool.icon}</span>{tool.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Models Grid */}
                <div>
                  <p className={`text-[10px] font-mono uppercase tracking-widest ${subTextClass} mb-3`}>LLMs & AI Models</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        name: 'Claude', org: 'Anthropic', color: 'slate',
                        models: ['Opus', 'Sonnet', 'Haiku']
                      },
                      {
                        name: 'ChatGPT', org: 'OpenAI', color: 'green',
                        models: ['GPT-3.5', 'GPT-4', 'GPT-4o', 'o1', 'GPT-5 ✨', 'GPT-5.4 ⭐']
                      },
                      {
                        name: 'Gemini', org: 'Google', color: 'blue',
                        models: ['1.5 Pro', '1.5 Flash', '2.0', '3.0 🚀']
                      },
                      {
                        name: 'Video & OSS', org: 'Specialized', color: 'purple',
                        models: ['Higgsfield AI', 'Runway', 'Pika', 'Deepseek']
                      }
                    ].map((group) => (
                      <div key={group.name} className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-bold ${headingClass}`}>{group.name}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>{group.org}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {group.models.map(m => (
                            <span key={m} className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isDark ? 'bg-white/5 text-slate-300' : 'bg-white border border-slate-200 text-slate-600'
                            }`}>{m}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- EXPERIENCE PAGE --- */}
          {activeTab === 'experience' && (
            <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in duration-300 max-w-4xl mx-auto py-4">
              <h2 className={`text-3xl font-bold ${headingClass} mb-6`}>Professional Experience</h2>

              {/* AT&T */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>AT&T Communications Services India</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>AI Technical Business Solution Analyst (PM), Consumer Technology & Experience</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-3 py-1.5 rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>Aug 2022 - Present</span>
                </div>

                <div className="mb-6">
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                  <ul className="space-y-4">
                    {[
                      "Led E2E product ownership of AT&T's GenAI-powered Virtual Assistant (Google CCAI/Dialogflow), scaling omnichannel deployment across chat, voice, WhatsApp, and RCS to serve 1.5M+ monthly customer interactions across consumer LOB.",
                      "Drove AI-powered automation through E2E conversation design, managing 350+ intents, 1,200+ training phrases, and RAG-powered knowledge retrieval — achieving 55% containment rate, reducing live-agent escalations by 28%, saving an estimated $4.2M annually.",
                      "Architected B2B integration ecosystem connecting AI layer with telephony infrastructure and backend CRMs via REST APIs, reducing average handle time by 32 seconds per interaction.",
                      "Delivered comprehensive technical documentation including process flow charts, data flow diagrams, and BRDs aligned to enterprise AI strategy, supporting 12-person cross-functional team across engineering, UX, and operations.",
                      "Managed Agile delivery in SAFe framework, owning backlog grooming and sprint planning for 2 development squads (18 developers); maintained 95% sprint commitment reliability via Jira/Confluence.",
                      "Built KPI performance dashboards (Power BI, SQL) monitoring 15+ metrics including containment, CSAT, intent recognition accuracy (92%), and fallback rates — improving NPS by 8 points.",
                      "Collaborated with US stakeholders including Product Owners, Enterprise Architects, and Business SMEs to align AI roadmap with CX objectives, securing $2.5M budget for FY25 enhancements."
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                        <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>AI Innovation</h4>
                  <ul className="space-y-3">
                    {[
                      "Architected a Retrieval-Augmented Generation (RAG) system to automate knowledge retrieval for Chatbots.",
                      "Rapid prototyped with AI for features and use cases to demonstrate to business and stakeholders.",
                      "Established automated human-in-the-loop feedback systems where low-confidence AI responses were flagged for manual review.",
                      "Monitored token usage and API costs to balance performance; collaborated with engineers to optimize API response times for GenAI features."
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start text-sm ${subTextClass} leading-relaxed`}>
                        <Sparkles size={14} className={`mt-1 mr-3 text-violet-400 shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verizon */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Verizon Data Services</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>Consultant — Digital & Assisted Sales, Verizon Consumer Group</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-3 py-1.5 rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>Mar 2020 - Aug 2022</span>
                </div>

                <div className="mb-6">
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                  <ul className="space-y-4">
                    {[
                      "Delivered actionable insights through funnel analysis, A/B testing, and market research across 3 LOBs (Retail, Consumer, B2B), informing BRDs/PRDs for 15+ features in Verizon's digital ecosystem.",
                      "Led cross-functional delivery with UX, Data Science, and Product teams; achieved 94% on-time delivery and $1.5M+ incremental revenue in FY21.",
                      "Managed E2E execution across retail, consumer, and B2B platforms, coordinating 8-12 stakeholders including Scrum Masters, RTEs, and engineering in SAFe Agile framework.",
                      "Facilitated Agile ceremonies for 4 concurrent workstreams, maintaining <4% sprint spillover."
                    ].map((item, i) => (
                      <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                        <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>High-Impact Projects</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: "Hum+ Wi-Fi Plan", metric: "$100K+ ARR, 23% attach rate" },
                      { name: "Omni Universal Cart", metric: "11% order growth, 13% less abandonment" },
                      { name: "Split Fulfillment", metric: "+2.1 day delivery, +3 CSAT points" },
                      { name: "ETF Redesign", metric: "22% fewer service inquiries" },
                      { name: "3-Year Device Payment", metric: "$320K pilot revenue, 14% upgrade rate" }
                    ].map((proj, i) => (
                      <div key={i} className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <p className={`text-sm font-semibold ${headingClass}`}>{proj.name}</p>
                        <p className={`text-xs ${accentTextClass} mt-1`}>{proj.metric}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infosys */}
              <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className={`text-2xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Infosys</h3>
                    <p className={`text-sm ${accentTextClass} font-medium`}>Senior Software Engineer</p>
                  </div>
                  <span className={`self-start md:self-center text-xs font-mono py-1 px-3 rounded-lg w-fit ${isDark ? 'bg-slate-800' : 'bg-slate-100'} ${subTextClass}`}>May 2016 - Feb 2020</span>
                </div>
                <h4 className={`text-xs uppercase tracking-wide font-bold mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Key Responsibilities & Achievements</h4>
                <ul className="space-y-4">
                  {[
                    "Modernized legacy Work Statement Requirement Database (WSRD) serving 1,200+ maintenance engineers across 5 Boeing facilities, integrating multiple REST APIs from disparate data sources to centralize aircraft maintenance work statements.",
                    "Led full-stack development featuring data encapsulation, API orchestration, master data management, and task workflow automation; delivered 6 major releases across 18-month timeline.",
                    "Coordinated cross-functional teams (UX designers, backend/frontend engineers, DBAs) to identify and mitigate 40+ critical risks, ensuring 99.2% system uptime post-launch.",
                    "Resolved production incidents through rapid troubleshooting and root cause analysis, reducing average downtime by 40% (8h to 4.8h) and increasing data processing throughput by 30% (12K to 15.6K records/day).",
                    "Improved maintenance scheduling efficiency by 25%, enabling faster aircraft turnaround and saving an estimated $2.8M annually in operational delays.",
                    "Leveraged Java 8, React, Angular, Spring Boot, PostgreSQL, Oracle, Python to deliver robust and scalable solutions."
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start text-sm md:text-base ${subTextClass} leading-relaxed`}>
                      <ChevronRight size={18} className={`mt-0.5 mr-3 ${accentTextClass} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* --- WORKS PAGE --- */}
          {activeTab === 'works' && (
            <div className="animate-in fade-in zoom-in duration-300 py-4">
              <div className="mb-8">
                <h2 className={`text-3xl font-bold ${headingClass}`}>Featured Projects & Hackathons</h2>
                <p className={`${subTextClass} mt-2`}>Delivering business value through AI, automation, and innovation.</p>
              </div>

              {/* Hackathon Projects - Featured */}
              <div className="mb-8">
                <h3 className={`text-lg font-bold ${headingClass} mb-4 flex items-center gap-2`}><Trophy size={20} className="text-amber-500" /> Award-Winning Hackathon Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* AT&T Helios */}
                  <div className={`rounded-3xl p-8 border relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-amber-900/15 to-slate-900 border-amber-500/20' : 'bg-amber-50/50 border-amber-200'}`}>
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-lg text-[10px] font-bold ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>Best in Show</div>
                    <Zap className="text-amber-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>AT&T Helios — Zero Friction Convergence</h3>
                    <p className={`text-sm ${subTextClass} mb-4 leading-relaxed`}>Solved the fragmented bundle experience at AT&T by creating a seamless one-click workflow. Customers can add mobile devices, phone plans, wireless plans, and fiber plans in a single cart flow — including trade-in, BYOD, and multi-bundle options — instead of navigating each step manually.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">AI-Fueled</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">One-Click Bundle</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">CX Innovation</span>
                    </div>
                  </div>

                  {/* Hyper-Personalized Travel */}
                  <div className={`rounded-3xl p-8 border relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-violet-900/15 to-slate-900 border-violet-500/20' : 'bg-violet-50/50 border-violet-200'}`}>
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-lg text-[10px] font-bold ${isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-700'}`}>1st Place + Most Impactful</div>
                    <Globe className="text-violet-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Hyper-Personalized International Travel</h3>
                    <p className={`text-sm ${subTextClass} mb-4 leading-relaxed`}>Leveraged AI-driven predictive modeling to deliver hyper-personalized experiences by analyzing customer travel patterns and media preferences. Simplified plan activation through mobile apps and websites with interactive tools for plan comparison, coverage checks, and troubleshooting support.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">AI Predictive Modeling</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">Travel CX</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">Personalization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CodeSandbox Interactive Demos */}
              <div className="mb-8">
                <h3 className={`text-lg font-bold ${headingClass} mb-4 flex items-center gap-2`}><Code2 size={20} className="text-cyan-500" /> Live Interactive Demos</h3>
                <p className={`${subTextClass} mb-6 text-sm`}>Explore interactive prototypes and live projects below. Click into each demo to interact with the interface.</p>
                <div className="grid grid-cols-1 gap-6">
                  {CODESANDBOX_PROJECTS.map(project => (
                    <div key={project.id} className={`rounded-3xl overflow-hidden border ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white/70 border-slate-200'}`}>
                      <div className="p-6 border-b" style={{background: isDark ? 'linear-gradient(135deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)' : 'linear-gradient(135deg, rgb(248,250,252) 0%, rgb(241,245,249) 100%)'}}>
                        <div className="flex items-start justify-between mb-3">
                          <h4 className={`text-lg font-bold ${headingClass}`}>{project.title}</h4>
                          {project.sandboxId ? (
                            <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">Live</span>
                          ) : (
                            <span className="text-[10px] px-2 py-1 rounded bg-slate-500/20 text-slate-400 border border-slate-500/20">Coming Soon</span>
                          )}
                        </div>
                        <p className={`text-sm ${subTextClass} mb-4`}>{project.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="text-[9px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{tag}</span>
                          ))}
                        </div>
                      </div>
                      {project.sandboxId ? (
                        <iframe
                          src={`https://codesandbox.io/embed/${project.sandboxId}?view=preview&theme=${isDark ? 'dark' : 'light'}`}
                          style={{
                            width: '100%',
                            height: '500px',
                            border: 0,
                            borderRadius: 0,
                            overflow: 'hidden'
                          }}
                          title={project.title}
                          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; magnetometer; microphone; midi; payment; usb; xr-spatial-tracking"
                          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        />
                      ) : (
                        <div className={`p-12 text-center ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                          <Code2 size={48} className={`mx-auto mb-4 opacity-30 ${isDark ? 'text-white' : 'text-slate-400'}`} />
                          <p className={`${headingClass} font-semibold mb-2`}>Sandbox Coming Soon</p>
                          <p className={`text-sm ${subTextClass}`}>This interactive demo will be available soon. Check back later!</p>
                          <p className={`text-xs ${subTextClass} mt-4 font-mono`}>Awaiting CodeSandbox URL</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* AT&T Key Projects */}
              <div className="mb-8">
                <h3 className={`text-lg font-bold ${headingClass} mb-4 flex items-center gap-2`}><Brain size={20} className="text-indigo-500" /> AT&T — Key Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-indigo-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                    <MessageSquare className="text-indigo-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>GenAI Virtual Assistant</h3>
                    <p className={`text-sm ${subTextClass} mb-4`}>RAG-powered CCAI implementation serving 1.5M+ monthly users. 350+ intents, 55% containment, $4.2M annual savings.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Dialogflow</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">RAG</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">CCAI</span>
                    </div>
                  </div>
                  <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-emerald-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                    <Sparkles className="text-emerald-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Retail Hyper-Personalization</h3>
                    <p className={`text-sm ${subTextClass} mb-4`}>15% uplift in product recommendation CTR through AI-driven personalization and data analytics across retail channels.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Analytics</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">AI/ML</span>
                    </div>
                  </div>
                  <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-green-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                    <TrendingUp className="text-green-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>AI Performance Analytics Suite</h3>
                    <p className={`text-sm ${subTextClass} mb-4`}>Real-time monitoring across 6 channels. Power BI dashboards tracking 15+ KPIs including CSAT, containment, and NPS.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">Power BI</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">SQL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verizon Key Projects */}
              <div className="mb-8">
                <h3 className={`text-lg font-bold ${headingClass} mb-4 flex items-center gap-2`}><Target size={20} className="text-blue-500" /> Verizon — High-Impact Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-blue-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                    <Zap className="text-blue-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Omni Universal Cart</h3>
                    <p className={`text-sm ${subTextClass} mb-4`}>11% order fulfillment growth and 13% reduced cart abandonment through unified omnichannel cart experience.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Omnichannel</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">E-Commerce</span>
                    </div>
                  </div>
                  <div className={`rounded-3xl p-8 border ${isDark ? 'bg-gradient-to-br from-cyan-900/10 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                    <BarChart2 className="text-cyan-400 mb-4" size={32} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Hum+ Wi-Fi Plan</h3>
                    <p className={`text-sm ${subTextClass} mb-4`}>$100K+ ARR with 23% attach rate. Revenue-generating add-on through strategic planning and digital sales optimization.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Strategy</span>
                      <span className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Revenue</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal GitHub Projects */}
              <div>
                <h3 className={`text-lg font-bold ${headingClass} mb-2 flex items-center gap-2`}><Code2 size={20} className="text-purple-500" /> Personal Projects & Experiments</h3>
                <p className={`text-sm ${subTextClass} mb-4`}>Independent builds, AI experiments, and personal side projects from <a href="https://github.com/ashfaque-rifaye" target="_blank" rel="noreferrer" onClick={() => trackEvent('social_link_click', { platform: 'GitHub', location: 'works_section' })} className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">github.com/ashfaque-rifaye</a></p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      name: 'AI for Bharat Hackathon',
                      lang: 'Python',
                      desc: 'Hackathon submission exploring AI-driven solutions addressing India-specific challenges. Built end-to-end with Python-based ML pipeline and a conversational interface.',
                      tags: ['Python', 'AI/ML', 'NLP'],
                      color: 'indigo'
                    },
                    {
                      name: 'AI Mock Interview',
                      lang: 'React',
                      desc: 'AI-powered mock interview platform that simulates real interview scenarios, evaluates responses using LLMs, and provides structured feedback to help candidates prepare.',
                      tags: ['LLM', 'Interview AI', 'React'],
                      color: 'violet'
                    },
                    {
                      name: 'Productivity Hub',
                      lang: 'Python',
                      desc: 'Multi-agent productivity system hosted on Google Cloud, orchestrating specialized AI agents for task management, research, scheduling, and knowledge retrieval.',
                      tags: ['Multi-Agent', 'GCP', 'Python'],
                      color: 'emerald'
                    },
                    {
                      name: 'Job Automater',
                      lang: 'Python',
                      desc: 'Automated job application assistant that parses listings, matches requirements against a profile, and streamlines the application process using scripted AI workflows.',
                      tags: ['Automation', 'Python', 'AI'],
                      color: 'amber'
                    },
                    {
                      name: 'PC Builder 101',
                      lang: 'React',
                      desc: 'End-to-end PC configuration and buying guide app. Users select components with compatibility checks and get region-specific purchase links with realistic build previews.',
                      tags: ['React', 'E-Commerce', 'UX'],
                      color: 'blue'
                    },
                    {
                      name: 'Health Wise Monitoring',
                      lang: 'React',
                      desc: 'Personal health dashboard application designed for continuous wellness tracking, surfacing trends across vitals and activity data for proactive health insights.',
                      tags: ['Health Tech', 'Dashboard', 'Analytics'],
                      color: 'rose'
                    }
                  ].map((proj, idx) => {
                    const colors = {
                      indigo: isDark ? 'from-indigo-900/15 to-slate-900 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200',
                      violet: isDark ? 'from-violet-900/15 to-slate-900 border-violet-500/20' : 'bg-violet-50 border-violet-200',
                      emerald: isDark ? 'from-emerald-900/15 to-slate-900 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200',
                      amber: isDark ? 'from-amber-900/15 to-slate-900 border-amber-500/20' : 'bg-amber-50 border-amber-200',
                      blue: isDark ? 'from-blue-900/15 to-slate-900 border-blue-500/20' : 'bg-blue-50 border-blue-200',
                      rose: isDark ? 'from-rose-900/15 to-slate-900 border-rose-500/20' : 'bg-rose-50 border-rose-200',
                    };
                    const tagColors = {
                      indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
                      violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                      emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                      amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                      rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                    };
                    return (
                      <div key={idx} className={`rounded-2xl p-6 border ${isDark ? `bg-gradient-to-br ${colors[proj.color]}` : colors[proj.color]}`}>
                        <div className="flex items-start justify-between mb-3">
                          <Code2 size={22} className={`${isDark ? `text-${proj.color}-400` : `text-${proj.color}-600`} shrink-0`} />
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-500 border border-slate-200'}`}>{proj.lang}</span>
                        </div>
                        <h4 className={`font-bold ${headingClass} mb-2 text-sm`}>{proj.name}</h4>
                        <p className={`text-xs ${subTextClass} leading-relaxed mb-3`}>{proj.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map(t => (
                            <span key={t} className={`text-[10px] px-2 py-0.5 rounded border ${tagColors[proj.color]}`}>{t}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* --- AWARDS PAGE --- */}
          {activeTab === 'awards' && (
            <div className="animate-in fade-in zoom-in duration-300 py-4 max-w-4xl mx-auto">
              <h2 className={`text-3xl font-bold ${headingClass} mb-6`}>Honors & Recommendations</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* AWARD 1 - Helios */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-amber-900/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                  <Trophy className="text-amber-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Best in Show / All Around Award (2025)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-amber-500 mb-2`}>AT&T Innovation Jam</p>
                  <p className={`text-sm ${subTextClass}`}>"AT&T Helios — Zero Friction Convergence: Transforming the AT&T Bundle Experience into an AI-Fueled Seamless, One-Click Growth Engine."</p>
                </div>

                {/* AWARD 2 - Hackathon 1st */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-amber-900/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                  <Trophy className="text-amber-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Hackathon 1st Place Winner (2025)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-amber-500 mb-2`}>AT&T Hackathon</p>
                  <p className={`text-sm ${subTextClass}`}>"Hyper-Personalization of International Travel Experience" — AI-driven predictive modeling for personalized customer travel plans.</p>
                </div>

                {/* AWARD 3 - Most Impactful */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-violet-900/10 border-violet-500/20' : 'bg-violet-50 border-violet-200'}`}>
                  <Star className="text-violet-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Most Impactful Business Solution (2025)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-violet-500 mb-2`}>AT&T Hackathon</p>
                  <p className={`text-sm ${subTextClass}`}>Awarded for presenting the most impactful business solution idea at AT&T's annual hackathon.</p>
                </div>

                {/* AWARD 4 - Connection Award */}
                <div className={`rounded-3xl p-6 border ${isDark ? 'bg-indigo-900/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-200'}`}>
                  <Award className="text-indigo-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Connection Award (2023)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-indigo-500 mb-2`}>AT&T CTX Team</p>
                  <p className={`text-sm ${subTextClass}`}>Recognized with the Virtual Assistant Team for outstanding contribution by AT&T CTX team.</p>
                </div>

                {/* AWARD 5 - Verizon */}
                <div className={`md:col-span-2 rounded-3xl p-6 border ${isDark ? 'bg-blue-900/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                  <Award className="text-blue-500 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-1`}>Spotlight Award for Customer Excellence (2021)</h3>
                  <p className={`text-xs font-mono uppercase tracking-wide text-blue-500 mb-2`}>Verizon GTS Team</p>
                  <p className={`text-sm ${subTextClass}`}>Awarded for Customer Excellence and driving revenue impact across Verizon's consumer digital platforms.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-dashed border-slate-700/50">
                <h3 className={`text-xl font-bold ${headingClass} mb-6`}>Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommendation 1 */}
                  <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                    <Quote className={`mb-6 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={32} />
                    <p className={`text-base ${subTextClass} mb-6 italic leading-relaxed`}>
                      "Ashfaque brought the best of innovation, product development and teamwork to our hackathon. He and his team won the Best in Show Award... His creative thinking enabled us to take a novel approach to improving an important aspect of customer experience."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>LM</div>
                      <div>
                        <h4 className={`text-sm font-bold ${headingClass}`}>Lynn Morgan</h4>
                        <p className={`text-xs ${subTextClass}`}>Senior Leader</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation 2 (Placeholder) */}
                  <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                    <Quote className={`mb-6 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={32} />
                    <p className={`text-base ${subTextClass} mb-6 italic leading-relaxed`}>
                      "Ashfaque is a fantastic Product Owner who truly understands how to bridge the gap between technical constraints and business requirements."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>JD</div>
                      <div>
                        <h4 className={`text-sm font-bold ${headingClass}`}>Jane Doe</h4>
                        <p className={`text-xs ${subTextClass}`}>Product Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- AI & CONTACT (Simplified for brevity in switch) --- */}

          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto py-8 animate-in fade-in">
              <div className={`${cardBgClass} rounded-3xl p-8 border`}>
                <h2 className={`text-2xl font-bold ${headingClass} mb-6`}>Get in Touch</h2>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} placeholder="Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  <input className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <textarea className={`w-full p-3 rounded-xl border bg-transparent ${isDark ? 'border-slate-700' : 'border-slate-200'}`} rows="4" placeholder="Message" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Send Message</button>
                </form>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className={`mt-auto py-8 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${subTextClass}`}>© {new Date().getFullYear()} Ashfaque Rifaye. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/ashfaque-rifaye/" target="_blank" rel="noreferrer" onClick={() => trackEvent('social_link_click', { platform: 'LinkedIn', location: 'footer' })} className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-400"><Linkedin size={16} /> LinkedIn</a>
              <a href="mailto:ashfaque_rifaye@outlook.com" onClick={() => trackEvent('social_link_click', { platform: 'Email', location: 'footer' })} className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-400"><Mail size={16} /> Email</a>
            </div>
          </div>
        </footer>

      </div>

      {/* --- FLOATING AI CHAT WIDGET --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatWidgetOpen && (
          <div className={`w-80 md:w-96 rounded-3xl shadow-2xl border flex flex-col overflow-hidden ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`} style={{maxHeight: '600px'}}>
            {/* Header */}
            <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-white/5 bg-gradient-to-r from-slate-900 to-slate-800' : 'border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${headingClass}`}>Ashfaque's AI Twin</h3>
                  <p className={`text-xs ${subTextClass}`}>Ask about my experience</p>
                </div>
              </div>
              <button onClick={() => setIsChatWidgetOpen(false)} className={`p-1 rounded-lg transition-colors hover:bg-white/10 ${subTextClass}`}>
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="overflow-y-auto p-4 space-y-4 flex-1" style={{minHeight: '280px', maxHeight: '380px'}}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                    {/* Message Text - Simple render with line breaks */}
                    <div 
                      className="p-3 text-sm leading-relaxed break-words whitespace-pre-line"
                      style={{fontSize: '13px', lineHeight: '1.6'}}
                    >
                      {msg.text}
                    </div>
                    {/* Model Attribution */}
                    {msg.model && (
                      <div className={`px-3 pb-2 text-xs font-mono opacity-70 flex items-center justify-between gap-2`}>
                        <span>📌 {msg.model}</span>
                        {msg.role === 'model' && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text);
                              setCopiedIndex(i);
                              setTimeout(() => setCopiedIndex(null), 2000);
                              trackEvent('chat_response_copied', { message_index: i, response_length: msg.text.length });
                            }}
                            className="hover:opacity-100 opacity-50 transition-opacity"
                            title="Copy message"
                          >
                            {copiedIndex === i ? '✓ Copied!' : '📋 Copy'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading State */}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'} animate-bounce`} style={{animationDelay: '0ms'}}></div>
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'} animate-bounce`} style={{animationDelay: '150ms'}}></div>
                      <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'} animate-bounce`} style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            {/* Suggested Questions (show only if chat is empty or has few messages) */}
            {chatHistory.length <= 2 && !isChatLoading && (
              <div className={`px-4 py-3 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-xs font-semibold ${subTextClass} mb-2`}>Suggested questions:</p>
                <div className="space-y-1.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setChatInput(q);
                        trackEvent('chat_suggested_question_clicked', { question: q, question_index: idx });
                        // Auto-submit after setting input
                        setTimeout(() => {
                          const form = document.querySelector('form[data-chat-form]');
                          if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                        }, 50);
                      }}
                      className={`w-full text-left text-xs p-2 rounded-lg transition-all ${isDark ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form 
              onSubmit={handleChatSubmit} 
              className={`p-3 border-t flex gap-2 ${isDark ? 'border-white/5' : 'border-slate-100'}`}
              data-chat-form
            >
              <input
                className={`flex-1 bg-transparent border rounded-xl p-2.5 text-sm font-medium transition-all ${isDark ? 'border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none' : 'border-slate-200 text-black placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none'}`}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about my resume..."
                disabled={isChatLoading}
              />
              <button 
                type="submit" 
                disabled={isChatLoading}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 rounded-xl text-white transition-colors flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => {
            const willOpen = !isChatWidgetOpen;
            setIsChatWidgetOpen(prev => !prev);
            if (willOpen) {
              chatOpenTime.current = Date.now();
              chatSessionTurns.current = 0;
              trackEvent('chat_opened', { referrer_section: activeTab });
            } else {
              trackEvent('chat_closed', {
                turns_in_session: chatSessionTurns.current,
                session_duration_sec: chatOpenTime.current ? Math.round((Date.now() - chatOpenTime.current) / 1000) : 0
              });
            }
          }}
          className={`w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-2xl flex items-center justify-center transition-all duration-300 ${isChatWidgetOpen ? 'rotate-90' : 'animate-pulse'}`}
          aria-label="Chat with Ashfaque's AI Twin"
        >
          {isChatWidgetOpen ? <X size={22} /> : <Bot size={22} />}
        </button>
      </div>

    </div>
  );
};

export default Portfolio;