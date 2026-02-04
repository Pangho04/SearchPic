import { useState, useCallback, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Alert from '@/components/Alert';
import type { AlertConfig } from './AlertProvider.types';
import { AlertContext } from './AlertContext';

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);

  const showAlert = useCallback((config: Omit<AlertConfig, 'id'>) => {
    const id = `alert-${Date.now()}-${Math.random()}`;

    setAlerts((prev) => [{ ...config, id }, ...prev]);

    return id;
  }, []);

  const closeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ showAlert, closeAlert }), [showAlert, closeAlert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alerts.length > 0 &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className={index > 0 ? 'hidden' : ''}
                style={{ zIndex: alerts.length - index }}
              >
                <Alert
                  title={alert.title}
                  onClose={() => closeAlert(alert.id)}
                  buttons={alert.buttons}
                >
                  {alert.children}
                </Alert>
              </div>
            ))}
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
}
