import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, ChefHat, CheckCircle, AlertCircle, DollarSign, Users } from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: 1,
    reservationId: 1,
    customerName: "John Smith",
    tableNumber: 12,
    arrivalTime: "7:00 PM Today",
    items: [
      { name: "Grilled Chicken", quantity: 2, price: 24.99 },
      { name: "Caesar Salad", quantity: 1, price: 12.99 },
      { name: "Pasta Carbonara", quantity: 1, price: 18.99 }
    ],
    status: "pending",
    orderTime: "6:45 PM",
    estimatedCompletion: "7:15 PM",
    totalAmount: 89.96
  },
  {
    id: 2,
    reservationId: 2,
    customerName: "Sarah Johnson",
    tableNumber: 5,
    arrivalTime: "8:30 PM Today",
    items: [
      { name: "Beef Burger", quantity: 1, price: 16.99 },
      { name: "Caesar Salad", quantity: 1, price: 12.99 }
    ],
    status: "preparing",
    orderTime: "8:25 PM",
    estimatedCompletion: "8:50 PM",
    totalAmount: 45.98
  },
  {
    id: 3,
    reservationId: 3,
    customerName: "Mike Davis",
    tableNumber: 8,
    arrivalTime: "6:30 PM Today",
    items: [
      { name: "Grilled Chicken", quantity: 3, price: 24.99 },
      { name: "Pasta Carbonara", quantity: 2, price: 18.99 },
      { name: "Chocolate Cake", quantity: 1, price: 8.99 }
    ],
    status: "ready",
    orderTime: "6:35 PM",
    estimatedCompletion: "7:00 PM",
    totalAmount: 134.94
  },
  {
    id: 4,
    reservationId: 4,
    customerName: "Emily Wilson",
    tableNumber: 3,
    arrivalTime: "7:30 PM Today",
    items: [
      { name: "Beef Burger", quantity: 2, price: 16.99 },
      { name: "Chocolate Cake", quantity: 1, price: 8.99 }
    ],
    status: "served",
    orderTime: "7:25 PM",
    estimatedCompletion: "7:50 PM",
    totalAmount: 67.97
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders);
  
  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-pending text-pending-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "preparing":
        return (
          <Badge variant="secondary" className="bg-warning text-warning-foreground">
            <ChefHat className="h-3 w-3 mr-1" />
            Preparing
          </Badge>
        );
      case "ready":
        return (
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            <AlertCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        );
      case "served":
        return (
          <Badge variant="secondary" className="bg-success text-success-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Served
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusCount = (status: string) => orders.filter(o => o.status === status).length;
  const totalRevenue = orders.filter(o => o.status === "served").reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Order Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage all pre-orders and kitchen operations
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-pending">{getStatusCount("pending")}</p>
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
                <p className="text-2xl font-bold text-warning">{getStatusCount("preparing")}</p>
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
                <p className="text-2xl font-bold text-primary">{getStatusCount("ready")}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-success">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            All Orders
          </CardTitle>
          <CardDescription>
            Manage pre-orders and track kitchen operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Details</TableHead>
                <TableHead>Customer & Table</TableHead>
                <TableHead>Order Items</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-smooth">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Reservation #{order.reservationId}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {order.customerName}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Table #{order.tableNumber}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1 max-w-xs">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{item.quantity}x</span> {item.name}
                          <span className="text-muted-foreground ml-2">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>Ordered: {order.orderTime}</div>
                      <div>ETA: {order.estimatedCompletion}</div>
                      <div className="text-muted-foreground">
                        Arrival: {order.arrivalTime}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="font-semibold text-success">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </TableCell>
                  
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="served">Served</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}