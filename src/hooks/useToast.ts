import { useState, useCallback } from 'react';
import { ToastNotification } from '../types';

export function useToast() {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastNotification, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newToast: ToastNotification = {
        id,
        durationMs: 4000,
        ...toast,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.durationMs && newToast.durationMs > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.durationMs);
      }

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
}
