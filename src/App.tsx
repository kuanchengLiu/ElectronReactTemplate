import { AppProvider, DashboardLayout } from "@toolpad/core";
import { GlobalTheme } from "./themes/GlobalTheme";
import { useCustomRouter } from "./hooks/useRouter";
import { useSession, demoSession } from "./hooks/useSession";
import SidebarFooterAccount from "./components/SidebarFooterAccount";
import { Box, Typography } from "@mui/material";
import HomePage from "./pages/Home/HomePage";
import ServerPage from "./pages/Server/ServerPage";
import UserPage from "./pages/User/UserPage";
import { NAVIGATION } from "./types/Navigation";
import React from "react";

function DemoPageContent({ pathname }: { pathname: string }) {
  const pageContentMap: Record<string, JSX.Element> = {
    "/home": <HomePage />,
    "/server": <ServerPage />,
    "/user": <UserPage />,
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pageContentMap[pathname] || <Typography>Page Not Found</Typography>}
    </Box>
  );
}

export default function App() {
  const customRouter = useCustomRouter(); // Use once and share
  const { pathname } = customRouter; // Destructure pathname for DemoPageContent
  const { session, setSession } = useSession();

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={customRouter} // Pass the full router object
      theme={GlobalTheme}
      authentication={authentication}
      session={session}
      branding={{
        title: "Dashboard",
      }}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <DemoPageContent pathname={pathname} /> {/* Use pathname here */}
      </DashboardLayout>
    </AppProvider>
  );
}
