import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AppSidebar from "@/components/AppSidebar";
import MobileNav from "@/components/MobileNav";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import GameDetail from "./pages/GameDetail";
import Lobbies from "./pages/Lobbies";
import Leaderboard from "./pages/Leaderboard";
import AIRecommendations from "./pages/AIRecommendations";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import DeveloperPortal from "./pages/DeveloperPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <AppSidebar />
    <MobileNav />
    <main className="lg:ml-64 p-4 md:p-6 lg:p-8">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/developer-portal" element={<DeveloperPortal />} />
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/game/:id" element={<GameDetail />} />
                    <Route path="/lobbies" element={<Lobbies />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/ai-recommendations" element={<AIRecommendations />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
