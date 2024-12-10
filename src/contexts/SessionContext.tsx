// import React, { createContext, useContext, useState } from "react";

// export const SessionContext = createContext(null);

// export function SessionProvider({ children }: { children: React.ReactNode }) {
//   const [session, setSession] = useState(null);

//   const signIn = () =>
//     setSession({ user: { name: "John Doe", email: "john@example.com" } });
//   const signOut = () => setSession(null);

//   return (
//     <SessionContext.Provider value={{ session, signIn, signOut }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export const useSession = () => useContext(SessionContext);
