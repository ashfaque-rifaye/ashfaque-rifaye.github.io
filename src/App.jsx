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
  ScrollText
} from 'lucide-react';

const Portfolio = () => {
  // --- CONFIGURATION ---
  // 1. Get your API Key from https://aistudio.google.com/ (for the Chatbot)
  const apiKey = ""; 
  
  // 2. Get your Measurement ID from Google Analytics (Admin > Data Streams)
  // Format: "G-XXXXXXXXXX"
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 

  const RESUME_CONTEXT = `
  You are an AI assistant for Ashfaque Rifaye, a Technical Business Analyst and Product Owner with 9 years of experience.
  Your goal is to answer questions about Ashfaque's professional background professionally and accurately based ONLY on the following resume data.
  
  RESUME DATA:
  - Name: Ashfaque Rifaye
  - Role: Tech Business Analyst | AI Product Manager
  - Location: Chennai, IND (Open to Relocate: Bangalore, Hyderabad, Dubai, Remote)
  - Contact: ashfaque_rifaye@outlook.com, linkedin.com/ashfaque-rifaye
  - Summary: 9 years exp in AI-driven digital solutions, virtual assistants, and enterprise automation. Skilled in Genesys/Google Dialogflow, AI/ML, CRM integrations, and SAFe Agile.
  - Experience 1: AT&T (Aug 2022 - Present) - AI Business Analyst. Lead functional ownership for GenAI Virtual Assistant (Google CCAI). Delivered 45% containment via RAG. Designed KPI dashboards (Power BI, SQL).
  - Experience 2: Verizon Data Services (Mar 2020 - Aug 2022) - Consultant. Drove $1.5M+ revenue with Hum+ Wi-Fi Plan. 11% growth in order fulfillment.
  - Experience 3: Infosys (May 2016 - Feb 2020) - Senior Software Engineer. Modernized legacy WSRD for Boeing. Reduced downtime by 40%. Used Java, React, Spring Boot.
  - Core Competencies: Product Ownership, Strategy Roadmaps, SAFe Agile, Scrum, Conversational AI, RAG, LLMs, Google CCAI, Dialogflow CX/ES, NLP, Python, SQL, REST APIs.
  - Education: B.E. Mechanical Engineering, Velammal Engineering College (2016).
  - Certifications: SAFe 6 Lean Portfolio Manager (2024), SAFe 6 Agilist (2023), CSPO (2022), Azure AI Fundamentals (2023).
  - Awards: AT&T Connection Award (2023), Verizon Spotlight Award (2021).
  
  Tone: Professional, confident, helpful.
  If asked about something not in the resume, say: "I don't see that specific detail in Ashfaque's resume, but I can tell you about his expertise in Conversational AI and Product Ownership. Would you like to know about that?"
  `;

  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  const [isDark, setIsDark] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Ashfaque's AI Twin. Ask me anything about his experience, skills, or projects! ✨" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

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
    // Log to console for debugging
    console.log(`[Analytics] ${eventName}:`, params);

    // Send to Google Analytics if active
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
    
    // Check for Admin Mode (URL parameter ?admin=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }

    trackEvent('page_view', { page_title: 'Portfolio Home' });
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // --- HANDLERS ---
  const handleThemeToggle = () => {
    setIsDark(!isDark);
    trackEvent('toggle_theme', { mode: !isDark ? 'dark' : 'light' });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
    trackEvent('file_download', { 
      file_name: 'Ashfaque_Resume', 
      file_extension: format 
    });
    // Replace these links with your actual file URLs (e.g., from Google Drive or public folder)
    alert(`Downloading Resume in ${format} format...`);
    setShowDownloadOptions(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsChatLoading(true);
    
    // Track Chat Usage
    trackEvent('ai_assistant_query', { 
      query_length: userMessage.length 
    });

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            ...chatHistory.map(msg => ({
              role: msg.role === 'model' ? 'model' : 'user',
              parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: userMessage }] }
          ],
          systemInstruction: {
            parts: [{ text: RESUME_CONTEXT }]
          }
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting to my brain right now. Please try again!";
      setChatHistory(prev => [...prev, { role: 'model', text: aiResponse }]);

    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered a connection error. Please try again later." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // --- THEME CLASSES ---
  const bgClass = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textClass = isDark ? 'text-slate-200' : 'text-slate-800';
  const cardBgClass = isDark 
    ? 'bg-slate-900/50 backdrop-blur-sm border-white/5' 
    : 'bg-white/70 backdrop-blur-sm border-slate-200 shadow-sm';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';
  const subTextClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const accentTextClass = isDark ? 'text-indigo-400' : 'text-indigo-600';

  // --- SKILL ICONS (Devicon) ---
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
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse ${!isDark && 'opacity-30'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse delay-1000 ${!isDark && 'opacity-30'}`}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        
        {/* --- HEADER --- */}
        <header className="flex flex-wrap justify-between items-center mb-10 md:mb-12">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${isDark ? 'border-indigo-500/20 bg-indigo-500/10' : 'border-indigo-200 bg-indigo-50'}`}>
              <Terminal size={24} className={accentTextClass} />
            </div>
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${headingClass} tracking-tight`}>Ashfaque Rifaye</h1>
              <p className={`text-xs ${subTextClass} font-mono uppercase tracking-wide`}>Tech Business Analyst | AI Product Manager</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <nav className={`flex items-center space-x-1 p-1 rounded-full border ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-200'}`}>
              {['overview', 'experience', 'works', 'awards', 'AI Assistant', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : `${subTextClass} hover:${headingClass} hover:bg-black/5`
                  }`}
                >
                  {tab === 'AI Assistant' && <Sparkles size={14} className={activeTab === tab ? "text-yellow-300" : "text-indigo-400"} />}
                  {tab === 'awards' ? 'Awards & Testimonials' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
            
            <button 
              onClick={handleThemeToggle}
              className={`p-2 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-white/10 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
             <button 
              onClick={handleThemeToggle}
              className={`p-2 rounded-full border transition-all ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={headingClass}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <div className="md:hidden mb-6 p-4 rounded-2xl bg-slate-800/90 backdrop-blur border border-white/10 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2">
              {['overview', 'experience', 'works', 'awards', 'AI Assistant', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    handleTabChange(tab);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-2 ${
                    activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {tab === 'AI Assistant' && <Sparkles size={14} />}
                  {tab === 'awards' ? 'Awards & Testimonials' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        )}

        <main className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
          
          {/* --- HERO SECTION --- */}
          <div className={`md:col-span-2 md:row-span-2 ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-white'} rounded-3xl p-6 md:p-8 border ${isDark ? 'border-white/5' : 'border-slate-200'} shadow-xl relative overflow-hidden group`}>
            
            {/* BRAIN ICON - Opacity reduced to 5% */}
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${isDark ? 'text-white' : 'text-indigo-900'}`}>
              <Brain size={120} />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-6">
                   <div className="relative shrink-0">
                      <img 
                        src="https://ui-avatars.com/api/?name=Ashfaque+Rifaye&size=120&background=4c63d2&color=fff&bold=true&font-size=0.4&rounded=true" 
                        alt="Profile" 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                         <div className="w-full h-full rounded-full animate-ping bg-emerald-400 opacity-75 absolute"></div>
                      </div>
                   </div>
                   
                   {/* RESUME & OPEN TO WORK STACK */}
                   <div className="flex flex-col gap-3 w-full md:w-auto items-start md:items-end">
                     <div className="flex flex-row items-center gap-3">
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
                     <div className={`flex flex-col items-start md:items-end text-right`}>
                        <div className={`flex items-center gap-1 text-sm font-bold ${headingClass}`}>
                           <MapPin size={14} className={accentTextClass} /> Chennai, IND
                        </div>
                        <p className={`text-[10px] ${subTextClass} mt-0.5`}>Open to: BLR, HYD, DXB, Remote</p>
                     </div>
                   </div>
                </div>

                <h2 className={`text-3xl md:text-5xl font-bold ${headingClass} leading-tight mb-4`}>
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Intelligent Products</span> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">AI Era</span>.
                </h2>
              </div>
              
              <div className={`mt-8 font-mono ${accentTextClass} h-6 text-sm md:text-base`}>
                &gt; {typedText}<span className="animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* --- TOP RIGHT TILES --- */}
          
          {/* TILE 1: EXPERIENCE */}
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

          {/* TILE 2: GLOBAL CERTIFICATIONS (NEW REPLACEMENT FOR LOCATION TILE) */}
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

          {/* --- BOTTOM RIGHT TILES --- */}
          
          {/* TILE 3: REVENUE GROWTH */}
          <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
             <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                   <TrendingUp size={24} />
                </div>
             </div>
             <div>
                <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>$1.5M+</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Revenue Growth</span>
             </div>
          </div>

          {/* TILE 4: AWARDS */}
          <div className={`${cardBgClass} rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 group border flex flex-col justify-between h-full`}>
             <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                   <Award size={24} />
                </div>
             </div>
             <div>
                <span className={`text-3xl md:text-4xl font-bold ${headingClass} block mb-1`}>3</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${subTextClass}`}>Industry Awards</span>
             </div>
          </div>

          {/* --- CONTENT TABS --- */}
          <div className="md:col-span-4 min-h-[400px]">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full animate-in fade-in zoom-in duration-300">
                <div className={`md:col-span-2 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                  <h3 className={`text-xl font-bold ${headingClass} mb-6 flex items-center`}>
                    <Cpu className={`mr-2 ${accentTextClass}`} /> Core Competencies & Skills
                  </h3>
                  
                  {/* VISUAL SKILLS SECTION */}
                  <div className="mb-8">
                     <h4 className={`text-sm font-medium ${subTextClass} mb-4 uppercase tracking-wider`}>Tools & Technologies</h4>
                     <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                        {skills.map((skill) => (
                          <div key={skill.name} className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all hover:scale-105 ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:shadow-md'}`}>
                             <img src={skill.icon} alt={skill.name} className="w-8 h-8 mb-2" />
                             <span className={`text-[10px] font-medium ${subTextClass}`}>{skill.name}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* SPLIT SKILLS: PRODUCT & AI */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}>
                        <Target size={16} className="text-indigo-500"/> Product Strategy & Agile
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Product Ownership', 'Strategy Roadmap', 'SAFe Agile', 'Scrum', 'Jira', 'Data Driven Decisioning', 'Backlog Grooming', 'User Stories'].map(skill => (
                          <span key={skill} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-default ${isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'} border`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-bold ${headingClass} mb-3 flex items-center gap-2`}>
                        <Bot size={16} className="text-emerald-500"/> AI & Technical Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Generative AI', 'RAG Architecture', 'Google CCAI', 'Dialogflow CX', 'LLMs', 'NLP', 'Python', 'API Integration'].map(skill => (
                          <span key={skill} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-default ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-100 text-emerald-700'} border`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-3xl p-8 border flex flex-col justify-between ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <div>
                    <h3 className={`text-xl font-bold ${headingClass} mb-4`}>About Me</h3>
                    <p className={`${subTextClass} leading-relaxed mb-4`}>
                      I'm a <strong>Business Analyst</strong> with 9 years of experience delivering Enterprise-level Scalable Digital Transformation and AI solutions. 
                      I specialize in bridging the gap between business strategy and technical execution, particularly in the <strong>Telecom, Airlines and E-Commerce Domain</strong>.
                    </p>
                  </div>
                  <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                    <h4 className={`text-sm font-semibold ${headingClass} mb-2`}>Education</h4>
                    <p className={`text-sm ${subTextClass}`}>B.E. Mechanical Engineering</p>
                    <p className={`text-xs ${subTextClass} opacity-70`}>Velammal Engineering College (2016)</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                {/* AT&T */}
                <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>AT&T</h3>
                      <p className={`text-sm ${accentTextClass}`}>AI Business Analyst</p>
                    </div>
                    <span className={`text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-2 py-1 rounded`}>Aug 2022 - Present</span>
                  </div>
                  
                  <div className="mb-4">
                     <h4 className={`text-xs uppercase tracking-wide font-bold mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>What I did:</h4>
                     <ul className="space-y-3">
                      {[
                        "Lead functional ownership for GenAI-powered Virtual Assistant (Google CCAI).",
                        "Delivered 45% containment and reduced live-agent escalations through RAG-powered search.",
                        "Designed KPI dashboards using Power BI & SQL for performance tracking."
                      ].map((item, i) => (
                        <li key={i} className={`flex items-start text-sm ${subTextClass}`}>
                          <ChevronRight size={16} className={`mt-0.5 mr-2 ${accentTextClass} shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verizon */}
                <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group border`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Verizon Data Services</h3>
                      <p className={`text-sm ${accentTextClass}`}>Consultant (Digital Sales)</p>
                    </div>
                    <span className={`text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-2 py-1 rounded`}>Mar 2020 - Aug 2022</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className={`text-xs uppercase tracking-wide font-bold mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>What I did:</h4>
                    <ul className="space-y-3">
                       {[
                        "Drove $1.5M+ revenue growth through digital solutions like Hum+ Wi-Fi Plan.",
                        "Achieved 11% growth in order fulfillment via Omni Universal Cart optimization.",
                        "Collaborated with UX and Data teams to align solutions with OKRs."
                      ].map((item, i) => (
                        <li key={i} className={`flex items-start text-sm ${subTextClass}`}>
                          <ChevronRight size={16} className={`mt-0.5 mr-2 ${accentTextClass} shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Infosys */}
                <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 hover:border-indigo-500/30 transition-all group md:col-span-2 border`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${headingClass} group-hover:${accentTextClass} transition-colors`}>Infosys</h3>
                      <p className={`text-sm ${accentTextClass}`}>Senior Software Engineer</p>
                    </div>
                    <span className={`text-xs font-mono ${subTextClass} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} px-2 py-1 rounded`}>May 2016 - Feb 2020</span>
                  </div>
                  <h4 className={`text-xs uppercase tracking-wide font-bold mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>What I did:</h4>
                  <p className={`text-sm ${subTextClass} mb-3`}>
                    Modernized legacy Work Statement Requirement Database for Boeing. Reduced downtime by 40% and increased throughput by 30% through critical incident resolution and robust application development using Java, React, and Spring Boot.
                  </p>
                </div>
              </div>
            )}

            {/* 3. WORKS / PROJECTS TAB (RENAMED & EXPANDED) */}
            {activeTab === 'works' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Project 1 */}
                <div className={`rounded-3xl p-6 border relative overflow-hidden group ${isDark ? 'bg-gradient-to-br from-indigo-900/20 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <MessageSquare className="text-indigo-400 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-2`}>GenAI Virtual Assistant</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>
                    RAG-powered CCAI implementation for AT&T. Orchestrated seamless integrations between AI layer and backend CRMs.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>Dialogflow</span>
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>RAG</span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className={`rounded-3xl p-6 border relative overflow-hidden group ${isDark ? 'bg-gradient-to-br from-violet-900/20 to-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <Sparkles className="text-violet-400 mb-4" size={32} />
                  <h3 className={`text-lg font-bold ${headingClass} mb-2`}>Retail Hyper-Personalization</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>
                    Program to tailor retail experiences using data analytics, driving customer engagement and sales optimization.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>Data Analytics</span>
                  </div>
                </div>
                
                {/* Placeholder for Future Works */}
                <div className={`rounded-3xl p-6 border border-dashed flex flex-col items-center justify-center text-center group ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-slate-300 bg-slate-50'}`}>
                   <div className={`p-3 rounded-full mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                     <Star size={24} className={subTextClass} />
                   </div>
                   <h3 className={`text-sm font-bold ${headingClass}`}>More Works Coming Soon</h3>
                   <p className={`text-xs ${subTextClass} mt-2`}>I'll be adding more detailed case studies and project links here shortly.</p>
                </div>
              </div>
            )}
            
            {/* 4. AWARDS & TESTIMONIALS TAB (NEW) */}
            {activeTab === 'awards' && (
              <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                 {/* Awards Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className={`rounded-3xl p-6 border relative overflow-hidden ${isDark ? 'bg-gradient-to-r from-amber-900/20 to-slate-900 border-amber-500/20' : 'bg-gradient-to-r from-amber-50 to-white border-amber-200'}`}>
                       <div className="flex items-start justify-between">
                         <Award className="text-amber-500 mb-4" size={32} />
                         <span className={`text-xs font-mono px-2 py-1 rounded ${isDark ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>2023</span>
                       </div>
                       <h3 className={`text-lg font-bold ${headingClass} mb-2`}>AT&T Connection Award</h3>
                       <p className={`text-sm ${subTextClass}`}>Recognized by the AT&T CTX team for outstanding contribution to the Virtual Assistant project.</p>
                    </div>

                    <div className={`rounded-3xl p-6 border relative overflow-hidden ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-slate-900 border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-white border-blue-200'}`}>
                       <div className="flex items-start justify-between">
                         <Award className="text-blue-500 mb-4" size={32} />
                         <span className={`text-xs font-mono px-2 py-1 rounded ${isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>2021</span>
                       </div>
                       <h3 className={`text-lg font-bold ${headingClass} mb-2`}>Verizon Spotlight Award</h3>
                       <p className={`text-sm ${subTextClass}`}>Awarded for Customer Excellence by the Verizon GTS team.</p>
                    </div>
                 </div>
                 
                 {/* Testimonials Section */}
                 <div>
                    <h3 className={`text-lg font-bold ${headingClass} mb-4 flex items-center gap-2`}>
                      <ThumbsUp size={20} className={accentTextClass} /> Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       {/* Placeholder Testimonial 1 */}
                       <div className={`${cardBgClass} rounded-3xl p-6 border`}>
                          <Quote className={`mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={24} />
                          <p className={`text-sm ${subTextClass} mb-6 italic`}>
                            "Ashfaque is a fantastic Product Owner who truly understands how to bridge the gap between technical constraints and business requirements. His work on the Dialogflow integration was instrumental to our success."
                          </p>
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>JD</div>
                             <div>
                                <h4 className={`text-sm font-bold ${headingClass}`}>Jane Doe</h4>
                                <p className={`text-xs ${subTextClass}`}>Product Director @ AT&T</p>
                             </div>
                          </div>
                       </div>

                       {/* Placeholder Testimonial 2 */}
                       <div className={`${cardBgClass} rounded-3xl p-6 border`}>
                          <Quote className={`mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} size={24} />
                          <p className={`text-sm ${subTextClass} mb-6 italic`}>
                            "I worked with Ashfaque at Verizon. His analytical skills and ability to drive revenue growth through data-driven decisions are top-notch. Highly recommended!"
                          </p>
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isDark ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>JS</div>
                             <div>
                                <h4 className={`text-sm font-bold ${headingClass}`}>John Smith</h4>
                                <p className={`text-xs ${subTextClass}`}>Senior Manager @ Verizon</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* 5. AI ASSISTANT TAB */}
            {activeTab === 'AI Assistant' && (
              <div className="h-[600px] w-full animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row gap-4">
                
                {/* Chat Area */}
                <div className={`flex-1 ${cardBgClass} rounded-3xl border flex flex-col overflow-hidden`}>
                  
                  {/* Chat Header */}
                  <div className={`p-4 border-b ${isDark ? 'border-white/5' : 'border-slate-100'} flex items-center justify-between bg-opacity-50`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500 rounded-lg">
                        <Bot size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold ${headingClass}`}>Ashfaque's AI Twin</h3>
                        <p className={`text-xs ${subTextClass} flex items-center gap-1`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Powered by Gemini 2.5
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none' 
                            : `${isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'} rounded-tl-none`
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className={`rounded-2xl p-4 rounded-tl-none ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                          <Loader2 size={20} className={`animate-spin ${accentTextClass}`} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Area */}
                  <form onSubmit={handleChatSubmit} className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                    {/* Quick Prompts */}
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                      {["Summarize experience", "Key skills?", "Why hire Ashfaque?", "Tell me about RAG"].map(prompt => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => {
                            setChatInput(prompt);
                          }}
                          className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask anything about my resume..."
                        className={`flex-1 p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                          isDark 
                            ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' 
                            : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                      <button 
                        type="submit"
                        disabled={!chatInput.trim() || isChatLoading}
                        className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
                      >
                        {isChatLoading ? <Loader2 size={20} className="animate-spin" /> : "✨"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-64 flex flex-col gap-4">
                  <div className={`${cardBgClass} rounded-3xl p-6 border h-full`}>
                    <h4 className={`font-bold ${headingClass} mb-3 flex items-center gap-2`}>
                      <Bot size={18} className="text-indigo-400" />
                      About this AI
                    </h4>
                    <p className={`text-sm ${subTextClass} mb-4`}>
                      This assistant is powered by Google's <strong>Gemini 2.5 Flash</strong> model. It has read my entire resume and can answer questions about my experience, skills, and background instantly.
                    </p>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'} border ${isDark ? 'border-indigo-500/20' : 'border-indigo-100'}`}>
                      <p className={`text-xs ${accentTextClass} font-medium`}>
                        <strong>Try asking:</strong><br/>
                        "What is his experience with Dialogflow?"
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 6. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full animate-in fade-in zoom-in duration-300">
                <div className={`${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
                  <h3 className={`text-xl font-bold ${headingClass} mb-4`}>Send me a message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className={`block text-xs font-medium ${subTextClass} mb-1`}>Name</label>
                      <input 
                        type="text" 
                        required
                        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${subTextClass} mb-1`}>Email</label>
                      <input 
                        type="email" 
                        required
                        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium ${subTextClass} mb-1`}>Message</label>
                      <textarea 
                        required
                        rows="4"
                        className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        placeholder="Hi, I'd like to discuss a project..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center transition-colors"
                    >
                      <Send size={18} className="mr-2" /> Send Message
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-2">
                      *Opens your default email client
                    </p>
                  </form>
                </div>

                <div className="flex flex-col gap-4">
                  <div className={`${cardBgClass} rounded-3xl p-8 border flex flex-col justify-center items-center text-center h-full`}>
                    <Mail size={48} className={`mb-4 ${accentTextClass}`} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Email Directly</h3>
                    <p className={`text-sm ${subTextClass} mb-6`}>ashfaque_rifaye@outlook.com</p>
                    <a 
                      href="mailto:ashfaque_rifaye@outlook.com"
                      onClick={() => trackEvent('click_contact', { type: 'email_button' })}
                      className={`px-6 py-2 rounded-full border transition-colors ${isDark ? 'border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}
                    >
                      Copy Email
                    </a>
                  </div>
                  
                  <div className={`${cardBgClass} rounded-3xl p-8 border flex flex-col justify-center items-center text-center h-full`}>
                    <Linkedin size={48} className={`mb-4 text-blue-500`} />
                    <h3 className={`text-xl font-bold ${headingClass} mb-2`}>Let's Connect</h3>
                    <p className={`text-sm ${subTextClass} mb-6`}>Find me on LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/ashfaque-rifaye/"
                      target="_blank" 
                      rel="noreferrer"
                      onClick={() => trackEvent('click_contact', { type: 'linkedin_button' })}
                      className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* FOOTER - CERTIFICATIONS (VISUAL REDESIGN) */}
          <div className={`md:col-span-4 ${cardBgClass} rounded-3xl p-6 md:p-8 border`}>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-emerald-500" size={24} />
              <h3 className={`text-lg font-bold ${headingClass}`}>Professional Credentials & Certifications</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "SAFe 6 LPM", desc: "Lean Portfolio Manager", year: "2024", color: "text-amber-500", bg: "bg-amber-500/10" },
                { name: "SAFe 6 Agilist", desc: "Product Owner/Manager", year: "2023", color: "text-blue-500", bg: "bg-blue-500/10" },
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

          {/* ANALYTICS BADGE (HIDDEN BY DEFAULT - VISIBLE ONLY IF ?admin=true) */}
          {isAdmin && (
            <div className={`md:col-span-4 rounded-3xl p-6 flex items-center justify-center gap-2 shadow-lg ${isDark ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-indigo-600 text-white'}`}>
               <BarChart2 size={24} className="text-white/80" />
               <div className="text-left">
                 <p className="text-xs text-white/60 font-mono">Analytics Ready</p>
                 <p className="text-sm font-bold text-white">Track Visits</p>
               </div>
            </div>
          )}

        </main>
        
        <footer className={`mt-16 pb-8 border-t ${isDark ? 'border-white/10' : 'border-slate-200'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${subTextClass}`}>
              <p>© {new Date().getFullYear()} Ashfaque Rifaye. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-6">
               <a 
                 href="https://www.linkedin.com/in/ashfaque-rifaye/" 
                 target="_blank" 
                 rel="noreferrer"
                 className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
               >
                 <Linkedin size={18} />
                 <span>Connect on LinkedIn</span>
               </a>
               <a 
                 href="mailto:ashfaque_rifaye@outlook.com"
                 className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
               >
                 <Mail size={18} />
                 <span>Get in Touch</span>
               </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
