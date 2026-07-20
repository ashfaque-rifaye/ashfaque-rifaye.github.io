/* Chat backend for the "AI Twin" widget: tries the hosted LLM gateway,
   and degrades to a local knowledge-base answer when the gateway is
   unreachable or unconfigured — the widget never shows a dead end. */

const LLM_ENDPOINTS = [
  'https://ashfaque94-inference-gateway-4.hf.space',
  'https://ashfaque94-inference-gateway-5.hf.space',
];
const GATEWAY_API_KEY = import.meta.env.VITE_GATEWAY_API_KEY || '';

export const SUGGESTED_QUESTIONS = [
  'AI/ML experience?',
  'AT&T projects?',
  'Hackathon wins?',
  'Key certifications?',
];

const SYSTEM_PROMPT = `
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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  model: string;
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
  'AI/ML': ['ai', 'ml', 'machine learning', 'chatbot', 'nlp', 'llm', 'dialogflow', 'genai', 'rag', 'ccai'],
  'AT&T': ['att', 'at&t', 'helios', 'virtual assistant', 'telecom'],
  Hackathon: ['hackathon', 'hack', 'innovation jam', 'award', 'win'],
  Certifications: ['cert', 'certification', 'safe', 'azure', 'cspo', 'credential'],
  Skills: ['skill', 'python', 'sql', 'react', 'power bi', 'tech stack'],
  Experience: ['experience', 'years', 'career', 'job', 'work', 'role'],
  Contact: ['contact', 'email', 'reach', 'hire', 'linkedin', 'resume'],
};

export function detectTopic(message: string): string {
  const lower = message.toLowerCase();
  return (
    Object.entries(TOPIC_KEYWORDS).find(([, kws]) => kws.some((kw) => lower.includes(kw)))?.[0] ??
    'General'
  );
}

/* Curated answers used when the live gateway isn't available. */
const FALLBACK_ANSWERS: Record<string, string> = {
  'AI/ML': '🚀 GenAI Virtual Assistant [1.5M+ monthly] | 💡 RAG-powered CCAI/Dialogflow | 📊 55% containment, $4.2M saved',
  'AT&T': "🎯 Product owner of AT&T's GenAI assistant | 🚀 350+ intents, omnichannel | 📊 $4.2M annual savings",
  Hackathon: '⭐ Best in Show — AT&T Innovation Jam 2025 | 🚀 1st Place + Most Impactful — AT&T Hackathon 2025',
  Certifications: '⭐ SAFe 6 LPM [2024] | ⭐ SAFe 6 Agilist [2023] | ⭐ Azure AI [2023] | ⭐ CSPO [2022]',
  Skills: '💡 Python, SQL, Power BI, React | 🎯 Product Ownership, SAFe, RAG, Dialogflow',
  Experience: '🚀 9+ years: AT&T (AI PM), Verizon (Product Consultant), Infosys (Sr. SWE) | 📊 $4.2M+ impact',
  Contact: '📊 Email ashfaque_rifaye@outlook.com | 💡 LinkedIn in/ashfaque-rifaye | 🚀 Resume in the Contact section',
  General: "🚀 9+ yrs AI product leadership | 💡 Ask about AT&T, hackathons, skills, or certs — or grab the resume below",
};

export function fallbackAnswer(topic: string): string {
  return FALLBACK_ANSWERS[topic] ?? FALLBACK_ANSWERS.General;
}

const truncate = (text: string, max = 200) =>
  text.length > max ? `${text.slice(0, max).trim()}...` : text;

export interface ChatResult {
  text: string;
  model: string;
  viaFallback: boolean;
}

export async function askGateway(history: ChatMessage[], userMessage: string): Promise<ChatResult> {
  const topic = detectTopic(userMessage);
  if (GATEWAY_API_KEY) {
    for (const endpoint of LLM_ENDPOINTS) {
      try {
        const res = await fetch(`${endpoint}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GATEWAY_API_KEY}` },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...history.map((m) => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.text })),
              { role: 'user', content: userMessage },
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text = truncate(data.choices?.[0]?.message?.content || fallbackAnswer(topic));
        return { text, model: data.model || data.provider || 'AI', viaFallback: false };
      } catch {
        // try next endpoint, then fall through to the local answer
      }
    }
  }
  return { text: fallbackAnswer(topic), model: 'Offline', viaFallback: true };
}
