/* Client for the hosted, OpenAI-compatible LLM gateway used by the AI Twin
   and the Hiring Agent. Requests are hedged: the primary route (OpenRouter,
   Gemini 2.5 Flash) goes first; if it fails or is still silent after a few
   seconds, a second route (Hugging Face, Qwen 2.5 72B) starts on the other
   gateway instance and the first answer wins. Naming the provider skips
   the gateway's generic fallback chain, which is slow when upstreams fail.
   Callers always have a deterministic fallback, so a missing key or an
   unreachable gateway never leaves a dead end.
   Note: VITE_ variables ship in the client bundle; the gateway key must be
   scoped and rate-limited on the gateway side. */

const ROUTES = [
  { endpoint: 'https://ashfaque94-inference-gateway-4.hf.space', provider: 'openrouter', model: 'google/gemini-2.5-flash' },
  { endpoint: 'https://ashfaque94-inference-gateway-5.hf.space', provider: 'huggingface', model: 'Qwen/Qwen2.5-72B-Instruct' },
] as const;
const HEDGE_AFTER_MS = 3500;
const GATEWAY_API_KEY = import.meta.env.VITE_GATEWAY_API_KEY || '';

export const LLM_ENABLED = Boolean(GATEWAY_API_KEY);

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmResult {
  text: string;
  model: string;
}

export async function complete(
  messages: LlmMessage[],
  { temperature = 0.3, maxTokens = 500, timeoutMs = 14_000 }: { temperature?: number; maxTokens?: number; timeoutMs?: number } = {}
): Promise<LlmResult> {
  if (!LLM_ENABLED) throw new Error('Gateway not configured');
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  let hedgeTimer = 0;

  const attempt = async (route: (typeof ROUTES)[number]): Promise<LlmResult> => {
    const res = await fetch(`${route.endpoint}/v1/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GATEWAY_API_KEY}` },
      body: JSON.stringify({ provider: route.provider, model: route.model, messages, temperature, max_tokens: maxTokens }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;
    if (!content || !content.trim()) throw new Error('Empty response');
    return { text: content.trim(), model: prettyModel(data.model || route.model) };
  };

  try {
    return await new Promise<LlmResult>((resolve, reject) => {
      let started = 0;
      let failed = 0;
      const launch = () => {
        if (started >= ROUTES.length) return;
        const route = ROUTES[started++];
        attempt(route).then(resolve, () => {
          failed += 1;
          if (failed === ROUTES.length) reject(new Error('All routes failed'));
          else launch(); // a fast failure starts the hedge immediately
        });
      };
      launch();
      hedgeTimer = window.setTimeout(launch, HEDGE_AFTER_MS);
    });
  } finally {
    window.clearTimeout(timer);
    window.clearTimeout(hedgeTimer);
    controller.abort();
  }
}

/** Pull the first JSON object out of a model reply (tolerates code fences and prose). */
export function parseJsonObject<T>(text: string): T | null {
  const cleaned = text.replace(/```(?:json)?/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

function prettyModel(raw: string): string {
  const name = String(raw).split('/').pop() || raw;
  return name
    .replace(/^gemini/i, 'Gemini')
    .replace(/-/g, ' ')
    .replace(/\bflash\b/i, 'Flash')
    .replace(/\bpro\b/i, 'Pro');
}
