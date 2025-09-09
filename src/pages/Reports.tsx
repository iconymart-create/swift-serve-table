import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock,
  ChefHat,
  Star,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock analytics data
const todayStats = {
  totalReservations: 42,
  completedOrders: 38,
  totalRevenue: 2485.50,
  avgOrderValue: 65.40,
  tableUtilization: 85,
  avgWaitTime: 12,
  peakHours: "7:00 PM - 9:00 PM",
  popularDish: "Grilled Chicken"
};

const weeklyData = [
  { day: "Monday", reservations: 32, revenue: 1950.00, avgOrder: 60.94 },
  { day: "Tuesday", reservations: 28, revenue: 1680.00, avgOrder: 60.00 },
  { day: "Wednesday", reservations: 35, revenue: 2100.00, avgOrder: 60.00 },
  { day: "Thursday", reservations: 40, revenue: 2400.00, avgOrder: 60.00 },
  { day: "Friday", reservations: 55, revenue: 3850.00, avgOrder: 70.00 },
  { day: "Saturday", reservations: 58, revenue: 4060.00, avgOrder: 70.00 },
  { day: "Sunday", reservations: 42, revenue: 2485.50, avgOrder: 65.40 }
];

const topDishes = [
  { name: "Grilled Chicken", orders: 28, revenue: 727.72, percentage: 24 },
  { name: "Pasta Carbonara", orders: 22, revenue: 505.78, percentage: 19 },
  { name: "Beef Burger", orders: 18, revenue: 341.82, percentage: 15 },
  { name: "Caesar Salad", orders: 15, revenue: 194.85, percentage: 13 },
  { name: "Chocolate Cake", orders: 12, revenue: 107.88, percentage: 10 }
];

const recentReservations = [
  { 
    customer: "John Smith", 
    time: "7:00 PM", 
    table: 12, 
    guests: 4, 
    status: "completed", 
    revenue: 89.96,
    satisfaction: 5
  },
  { 
    customer: "Sarah Johnson", 
    time: "8:30 PM", 
    table: 5, 
    guests: 2, 
    status: "completed", 
    revenue: 45.98,
    satisfaction: 4
  },
  { 
    customer: "Mike Davis", 
    time: "6:30 PM", 
    table: 8, 
    guests: 6, 
    status: "completed", 
    revenue: 134.94,
    satisfaction: 5
  }
];

export default function Reports() {
  const handleExportData = () => {
    // Mock export functionality - in real app would generate CSV/PDF
    alert("Exporting data to Google Sheets... (This would connect to actual Google Sheets API)");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Today's performance and key insights
          </p>
        </div>
        
        <Button onClick={handleExportData} className="gap-2" variant="restaurant">
          <Download className="h-4 w-4" />
          Export to Sheets
        </Button>
      </div>

      {/* Today's KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reservations</p>
                <p className="text-2xl font-bold text-primary">{todayStats.totalReservations}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs yesterday
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-success">${todayStats.totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% vs yesterday
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-primary">${todayStats.avgOrderValue}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% vs yesterday
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Table Utilization</p>
                <p className="text-2xl font-bold text-warning">{todayStats.tableUtilization}%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3% vs yesterday
                </p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Performance
            </CardTitle>
            <CardDescription>
              Last 7 days overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Avg Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyData.map((day) => (
                  <TableRow key={day.day} className="hover:bg-muted/50 transition-smooth">
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>{day.reservations}</TableCell>
                    <TableCell className="text-success font-semibold">${day.revenue.toFixed(2)}</TableCell>
                    <TableCell>${day.avgOrder.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Dishes */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Top Performing Dishes
            </CardTitle>
            <CardDescription>
              Most popular items today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <div key={dish.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{dish.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dish.orders} orders • {dish.percentage}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">${dish.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operational Metrics
            </CardTitle>
            <CardDescription>
              Today's operational performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                <p className="text-xl font-bold text-primary">{todayStats.avgWaitTime} min</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Peak Hours</p>
                <p className="text-sm font-semibold text-primary">{todayStats.peakHours}</p>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold">Most Popular Dish</span>
              </div>
              <p className="text-xl font-bold text-primary">{todayStats.popularDish}</p>
              <p className="text-sm text-muted-foreground">28 orders today</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Completed Orders */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Completed Orders
            </CardTitle>
            <CardDescription>
              Latest customer feedback and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReservations.map((reservation, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{reservation.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        Table {reservation.table} • {reservation.guests} guests • {reservation.time}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < reservation.satisfaction 
                              ? "text-warning fill-current" 
                              : "text-muted-foreground"
                          }`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({reservation.satisfaction}/5)
                      </span>
                    </div>
                    
                    <span className="font-semibold text-success">
                      ${reservation.revenue.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}