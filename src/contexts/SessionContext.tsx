import React, { createContext, useContext, useState } from "react";

interface Session {
  user: { name: string; email: string } | null;
}

interface SessionContextProps {
  session: Session | null;
  signIn: () => void;
  signOut: () => void;
}

// Define the context type
export const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  const signIn = () =>
    setSession({ user: { name: "John Doe", email: "john@example.com" } });
  const signOut = () => setSession(null);

  return (
    <SessionContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
