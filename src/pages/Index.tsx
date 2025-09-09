import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChefHat, 
  BarChart3, 
  Users, 
  MessageSquare, 
  ArrowRight,
  Smartphone,
  Database,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Customer Portal",
      description: "WhatsApp-style table reservations with food pre-ordering",
      icon: MessageSquare,
      href: "/customer",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Admin Dashboard", 
      description: "Manage reservations, tables, and monitor real-time operations",
      icon: Calendar,
      href: "/admin", 
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Kitchen View",
      description: "Real-time order management sorted by priority and timing",
      icon: ChefHat,
      href: "/kitchen",
      color: "text-warning", 
      bgColor: "bg-warning/10"
    },
    {
      title: "Reports & Analytics",
      description: "KPIs, revenue tracking, and Google Sheets integration",
      icon: BarChart3,
      href: "/reports",
      color: "text-pending",
      bgColor: "bg-pending/10"
    }
  ];

  const integrations = [
    { name: "WhatsApp Business API", icon: Smartphone },
    { name: "Supabase Database", icon: Database },
    { name: "Google Sheets", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            🍽️ Restaurant Management System
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
            Table Reservations & 
            <br />Food Pre-Orders
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete WhatsApp-integrated restaurant management system with real-time reservations, 
            kitchen dashboard, and comprehensive analytics. Built for modern dining experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="restaurant" className="text-lg px-8" asChild>
              <Link to="/customer">
                Try Customer Portal
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/admin">
                View Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-elegant hover:shadow-glow transition-bounce group">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 transition-smooth" asChild>
                  <Link to={feature.href}>
                    Explore Feature
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Showcase */}
        <Card className="shadow-elegant bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              Ready for Production Integration
            </CardTitle>
            <CardDescription className="text-lg">
              This frontend connects seamlessly with backend services
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {integrations.map((integration) => (
                <div key={integration.name} className="flex items-center gap-3 p-4 bg-background/80 rounded-lg">
                  <integration.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium">{integration.name}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 px-4 py-2">
                Connect to Supabase for full backend functionality
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-muted-foreground text-lg">
            Start with the customer portal or explore the full admin experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="restaurant" asChild>
              <Link to="/customer">
                <Users className="h-5 w-5" />
                Customer Experience
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link to="/kitchen">
                <ChefHat className="h-5 w-5" />
                Kitchen Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
