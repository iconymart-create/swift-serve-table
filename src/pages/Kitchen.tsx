import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Clock, CheckCircle, AlertCircle, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock kitchen orders data
const mockKitchenOrders = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customerName: "John Smith",
    tableNumber: 12,
    arrivalTime: "7:00 PM",
    timeRemaining: 25,
    items: [
      { name: "Grilled Chicken", quantity: 2, notes: "Well done, no spice" },
      { name: "Caesar Salad", quantity: 1, notes: "Extra dressing" },
      { name: "Pasta Carbonara", quantity: 1, notes: "" }
    ],
    priority: "high",
    status: "preparing",
    estimatedTime: 30
  },
  {
    id: 2,
    orderNumber: "ORD-002", 
    customerName: "Sarah Johnson",
    tableNumber: 5,
    arrivalTime: "8:30 PM",
    timeRemaining: 95,
    items: [
      { name: "Beef Burger", quantity: 1, notes: "Medium rare" },
      { name: "Caesar Salad", quantity: 1, notes: "" }
    ],
    priority: "medium",
    status: "pending",
    estimatedTime: 20
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customerName: "Mike Davis",
    tableNumber: 8,
    arrivalTime: "6:30 PM",
    timeRemaining: -15,
    items: [
      { name: "Grilled Chicken", quantity: 3, notes: "" },
      { name: "Pasta Carbonara", quantity: 2, notes: "Extra cheese" },
      { name: "Chocolate Cake", quantity: 1, notes: "Birthday special" }
    ],
    priority: "urgent",
    status: "ready",
    estimatedTime: 45
  },
  {
    id: 4,
    orderNumber: "ORD-004",
    customerName: "Emily Wilson", 
    tableNumber: 3,
    arrivalTime: "7:30 PM",
    timeRemaining: 55,
    items: [
      { name: "Beef Burger", quantity: 2, notes: "" },
      { name: "Chocolate Cake", quantity: 1, notes: "" }
    ],
    priority: "medium",
    status: "preparing",
    estimatedTime: 25
  }
];

export default function Kitchen() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockKitchenOrders);

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    const order = orders.find(o => o.id === orderId);
    if (order && newStatus === "ready") {
      toast({
        title: "Order Ready! 👨‍🍳",
        description: `${order.orderNumber} for Table ${order.tableNumber} is ready to serve`,
      });
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive" className="animate-pulse">URGENT</Badge>;
      case "high":
        return <Badge className="bg-warning text-warning-foreground">HIGH</Badge>;
      case "medium":
        return <Badge variant="secondary">MEDIUM</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-pending text-pending-foreground">Pending</Badge>;
      case "preparing":
        return <Badge className="bg-warning text-warning-foreground">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-success text-success-foreground">Ready</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTimeColor = (timeRemaining: number) => {
    if (timeRemaining < 0) return "text-destructive";
    if (timeRemaining < 10) return "text-warning";
    return "text-success";
  };

  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const preparingOrders = orders.filter(o => o.status === "preparing").length;
  const readyOrders = orders.filter(o => o.status === "ready").length;
  const urgentOrders = orders.filter(o => o.priority === "urgent").length;

  // Sort orders by priority and time remaining
  const sortedOrders = [...orders].sort((a, b) => {
    const priorityWeight = { urgent: 3, high: 2, medium: 1 };
    const aPriority = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
    const bPriority = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
    
    if (aPriority !== bPriority) return bPriority - aPriority;
    return a.timeRemaining - b.timeRemaining;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Kitchen Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time order management for kitchen staff
        </p>
      </div>

      {/* Kitchen KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-pending">{pendingOrders}</p>
              </div>
              <Clock className="h-8 w-8 text-pending" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold text-warning">{preparingOrders}</p>
              </div>
              <ChefHat className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready to Serve</p>
                <p className="text-2xl font-bold text-success">{readyOrders}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent Orders</p>
                <p className="text-2xl font-bold text-destructive">{urgentOrders}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <Card 
            key={order.id} 
            className={`shadow-elegant transition-smooth hover:shadow-glow ${
              order.priority === "urgent" ? "ring-2 ring-destructive" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  {order.orderNumber}
                </CardTitle>
                {getPriorityBadge(order.priority)}
              </div>
              <CardDescription className="space-y-1">
                <div className="flex justify-between">
                  <span>{order.customerName} • Table {order.tableNumber}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Arrival: {order.arrivalTime}</span>
                  <span className={getTimeColor(order.timeRemaining)}>
                    {order.timeRemaining < 0 
                      ? `${Math.abs(order.timeRemaining)}m overdue` 
                      : `${order.timeRemaining}m remaining`
                    }
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  Items to Prepare
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium">{item.quantity}x {item.name}</div>
                          {item.notes && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Note: {item.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Est. Time: {order.estimatedTime} min
                </div>
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <Button 
                      size="sm" 
                      variant="warning"
                      onClick={() => updateOrderStatus(order.id, "preparing")}
                    >
                      Start Cooking
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={() => updateOrderStatus(order.id, "ready")}
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled
                    >
                      Ready to Serve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedOrders.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="py-16 text-center">
            <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Orders in Kitchen</h3>
            <p className="text-muted-foreground">All caught up! No orders to prepare right now.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}