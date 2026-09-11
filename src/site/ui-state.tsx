import {
  createContext, lazy, Suspense, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { useLocation } from 'react-router';
import { CommandPalette } from '../components/layout/CommandPalette';
import { trackEvent } from '../lib/analytics';

/* The AI Twin is code-split: its fact sheet and gateway client only load
   when someone opens it. Nothing here renders during the prerender. */
const ChatPanel = lazy(() => import('../components/chat/ChatPanel').then((m) => ({ default: m.ChatPanel })));

interface UiState {
  openPalette: () => void;
  openChat: (location: string) => void;
}

const UiContext = createContext<UiState>({ openPalette: () => {}, openChat: () => {} });

export function UiProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatFrom, setChatFrom] = useState<string | null>(null);
  const { pathname } = useLocation();

  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    trackEvent('command_palette_opened', {});
  }, []);
  const openChat = useCallback((location: string) => setChatFrom(location), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeChat = useCallback(() => setChatFrom(null), []);

  useEffect(() => setPaletteOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(() => ({ openPalette, openChat }), [openPalette, openChat]);

  return (
    <UiContext.Provider value={value}>
      {children}
      <CommandPalette open={paletteOpen} onClose={closePalette} onChat={() => openChat('command_palette')} />
      {chatFrom !== null && (
        <Suspense fallback={null}>
          <ChatPanel location={chatFrom} onClose={closeChat} />
        </Suspense>
      )}
    </UiContext.Provider>
  );
}

export const useUi = () => useContext(UiContext);
