"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface SSEContextProps {
  isConnected: boolean;
  isFinished: boolean;
  openConnection: () => void;
  closeConnection: () => void;
  resetFinished: () => void;
}

const SSEContext = createContext<SSEContextProps | null>(null);

interface LayoutProps {
  children: ReactNode
}
export function SSEProvider({ children }: LayoutProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const openConnection = () => {
    if (eventSourceRef.current) return;
    const eventSource = new EventSource(
      "http://localhost:3001/api/clients/upload/events"
    );

    eventSourceRef.current = eventSource;
    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const operationRegex = /^\[UPLOAD_CSV\] - (\w+)$/;
      const operationStatus = String(event.data).match(operationRegex);
      if (operationStatus && operationStatus[1] === "Success") {
        setIsFinished(true);
        closeConnection();
      }
    };

    eventSource.onerror = (error) => {
      console.error("Erro na conexão SSE:", error);
      setIsConnected(false);
    };
  };

  const closeConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  };

  const resetFinished = () => {
    setIsFinished(false);
  };

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, []);

  return (
    <SSEContext.Provider
      value={{
        isConnected,
        isFinished,
        openConnection,
        closeConnection,
        resetFinished,
      }}
    >
      {children}
    </SSEContext.Provider>
  );
}

export function useSSE() {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error("useSSE must be used within an SSEProvider");
  }

  return context;
}
