import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { sendInstantNotification } from '../utils/notifications';

const MedsContext = createContext(null);
export function MedsProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [lastResumed, setLastResumed] = useState(null);
  const [resumeCount, setResumeCount] = useState(0);
  const appState = useRef(AppState.currentState);
  
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        console.log('App has come to the foreground!');
        setLastResumed(new Date().toLocaleTimeString());
        setResumeCount((c) => c + 1);
      }
      appState.current = nextState;
    });
    return () => sub.remove();
  }, []);
  const toggleFavorite = (med) => {
    const already = favorites.includes(med.id);
    setFavorites((prev) =>
      already ? prev.filter((x) => x !== med.id) : [...prev, med.id]
    );
    if (!already) {
      sendInstantNotification('Added to My Meds', `${med.name} was saved.`);
    }
  };
  
  const isFavorite = (id) => favorites.includes(id);
  const addReminder = (r) => setReminders((prev) => [...prev, r]);
  const removeReminder = (id) =>
    setReminders((prev) => prev.filter((r) => r.id !== id));
  const value = {
    favorites, toggleFavorite, isFavorite,
    reminders, addReminder, removeReminder,
    lastResumed, resumeCount,
  };
  return <MedsContext.Provider value={value}>{children}</MedsContext.Provider>;
}
export const useMeds = () => useContext(MedsContext);