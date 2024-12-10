import React from "react";

interface User {
  name: string;
  email: string;
  image?: string;
}

interface Session {
  user: User;
}

export const demoSession: Session = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    // image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

export const useSession = () => {
  const [session, setSession] = React.useState<Session | null>(demoSession);

  return { session, setSession };
};
