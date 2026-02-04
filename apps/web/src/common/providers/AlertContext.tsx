import { createContext } from 'react';
import type { AlertConfig } from './AlertProvider.types';

type AlertContextType = {
  showAlert: (config: Omit<AlertConfig, 'id'>) => string;
  closeAlert: (id: string) => void;
};

export const AlertContext = createContext<AlertContextType | null>(null);
