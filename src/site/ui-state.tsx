import {
  createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ChatLauncher } from '../components/chat/ChatLauncher';
import { CommandPalette } from '../components/layout/CommandPalette';
import { VideoModal } from '../components/video/VideoModal';
import { trackEvent } from '../lib/analytics';
import { applyTheme, readTheme, type Theme } from './theme';

/* Site-wide UI: theme, the ⌘K palette, the floating AI Twin, the demo
   player and the Hiring Agent hand-off. The chat panel is code-split and
   mounts on first open; nothing interactive renders during the prerender. */
const ChatPanel = lazy(() => import('../components/chat/ChatPanel').then((m) => ({ default: m.ChatPanel })));

export interface ChatRequest {
  location: string;
  /** Message to send as soon as the panel is ready. */
  message?: string;
  nonce: number;
}

export interface AgentHandoff {
  jd?: string;
  autorun?: boolean;
  source?: 'chat' | 'link';
}

interface UiState {
  theme: Theme;
  setTheme: (theme: Theme, location: string) => void;
  toggleTheme: (location: string) => void;
  openPalette: () => void;
  openChat: (location: string, message?: string) => void;
  playDemo: (id: string, location: string) => void;
  runHiringAgent: (jd?: string, source?: 'chat' | 'link') => void;
}

const noop = () => {};
const UiContext = createContext<UiState>({
  theme: 'dark',
  setTheme: noop,
  toggleTheme: noop,
  openPalette: noop,
  openChat: noop,
  playDemo: noop,
  runHiringAgent: noop,
});

export function UiProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [theme, setThemeState] = useState<Theme>('dark');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);
  const [chatRequest, setChatRequest] = useState<ChatRequest | null>(null);
  const [video, setVideo] = useState<{ id: string; location: string } | null>(null);

  useEffect(() => setThemeState(readTheme()), []);

  const setTheme = useCallback((next: Theme, location: string) => {
    applyTheme(next);
    setThemeState(next);
    trackEvent('theme_changed', { theme: next, location });
  }, []);
  const toggleTheme = useCallback((location: string) => setTheme(readTheme() === 'dark' ? 'light' : 'dark', location), [setTheme]);

  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    trackEvent('command_palette_opened', {});
  }, []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const openChat = useCallback((location: string, message?: string) => {
    setChatMounted(true);
    setChatOpen(true);
    setChatRequest({ location, message, nonce: Date.now() });
  }, []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const toggleChat = useCallback(() => {
    setChatMounted(true);
    setChatOpen((o) => {
      if (!o) setChatRequest({ location: 'launcher', nonce: Date.now() });
      return !o;
    });
  }, []);

  const playDemo = useCallback((id: string, location: string) => {
    setVideo({ id, location });
  }, []);

  const runHiringAgent = useCallback(
    (jd?: string, source: 'chat' | 'link' = 'link') => {
      const state: AgentHandoff = { jd, autorun: Boolean(jd), source };
      navigate('/agent/', { state });
    },
    [navigate]
  );

  useEffect(() => setPaletteOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => {
          if (!o) trackEvent('command_palette_opened', {});
          return !o;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, openPalette, openChat, playDemo, runHiringAgent }),
    [theme, setTheme, toggleTheme, openPalette, openChat, playDemo, runHiringAgent]
  );

  return (
    <UiContext.Provider value={value}>
      {children}
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <ChatLauncher open={chatOpen} onToggle={toggleChat} />
      {chatMounted && (
        <Suspense fallback={null}>
          <ChatPanel open={chatOpen} request={chatRequest} onClose={closeChat} />
        </Suspense>
      )}
      {video && <VideoModal demoId={video.id} location={video.location} onClose={() => setVideo(null)} />}
    </UiContext.Provider>
  );
}

export const useUi = () => useContext(UiContext);
