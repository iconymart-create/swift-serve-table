import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
import AdminReservations from "./pages/AdminReservations";
import AdminTables from "./pages/AdminTables";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import Kitchen from "./pages/Kitchen";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer" element={<Layout><Customer /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
          <Route path="/admin/reservations" element={<Layout><AdminReservations /></Layout>} />
          <Route path="/admin/tables" element={<Layout><AdminTables /></Layout>} />
          <Route path="/admin/orders" element={<Layout><AdminOrders /></Layout>} />
          <Route path="/admin/settings" element={<Layout><AdminSettings /></Layout>} />
          <Route path="/kitchen" element={<Layout><Kitchen /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
