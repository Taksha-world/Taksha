"use client";

import { useState, createContext, useContext, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Rocket, GitFork, Share2 } from "lucide-react";

type ToastType = "success" | "error" | "info" | "deploy" | "fork" | "share";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <Check className="h-4 w-4 text-green-600" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  info: <AlertCircle className="h-4 w-4 text-amber-600" />,
  deploy: <Rocket className="h-4 w-4 text-green-600" />,
  fork: <GitFork className="h-4 w-4 text-amber-600" />,
  share: <Share2 className="h-4 w-4 text-blue-600" />,
};

const bgColors: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  info: "bg-amber-50 border-amber-200",
  deploy: "bg-green-50 border-green-200",
  fork: "bg-amber-50 border-amber-200",
  share: "bg-blue-50 border-blue-200",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-2 items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${bgColors[t.type]}`}
            >
              {icons[t.type]}
              <span className="text-sm font-medium text-stone-700">{t.message}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="ml-2 p-0.5 rounded text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
