import { createContext, useContext, useState } from 'react';

const MedsContext = createContext(null);
export function MedsProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [reminders, setReminders] = useState([]); 
  const toggleFavorite = (med) => {
    setFavorites((prev) =>
      prev.includes(med.id) ? prev.filter((x) => x !== med.id) : [...prev, med.id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);
  const addReminder = (r) => setReminders((prev) => [...prev, r]);
  const removeReminder = (id) =>
    setReminders((prev) => prev.filter((r) => r.id !== id));
  const value = {
    favorites, toggleFavorite, isFavorite, reminders, addReminder, removeReminder,
  };
  return <MedsContext.Provider value={value}>{children}</MedsContext.Provider>;
}

export const useMeds = () => useContext(MedsContext);