import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Clock, DollarSign, CheckCircle, AlertCircle, Utensils } from "lucide-react";

// Mock data
const mockReservations = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    guests: 4,
    arrivalTime: "7:00 PM Today",
    tableNumber: 12,
    status: "pending",
    estimatedBill: 89.96,
    items: ["2x Grilled Chicken", "1x Caesar Salad", "1x Pasta Carbonara"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    guests: 2,
    arrivalTime: "8:30 PM Today",
    tableNumber: 5,
    status: "seated",
    estimatedBill: 45.98,
    items: ["1x Beef Burger", "1x Caesar Salad"]
  },
  {
    id: 3,
    name: "Mike Davis",
    phone: "+1 (555) 456-7890",
    guests: 6,
    arrivalTime: "6:30 PM Today",
    tableNumber: 8,
    status: "completed",
    estimatedBill: 134.94,
    items: ["3x Grilled Chicken", "2x Pasta Carbonara", "1x Chocolate Cake"]
  },
  {
    id: 4,
    name: "Emily Wilson",
    phone: "+1 (555) 234-5678",
    guests: 3,
    arrivalTime: "7:30 PM Today",
    tableNumber: 3,
    status: "pending",
    estimatedBill: 67.97,
    items: ["2x Beef Burger", "1x Chocolate Cake"]
  }
];

const mockTables = Array.from({length: 20}, (_, i) => ({
  number: i + 1,
  capacity: Math.floor(Math.random() * 6) + 2,
  status: i < 8 ? "occupied" : "available",
  customer: i < 8 ? mockReservations[i % 4]?.name : null,
  arrivalTime: i < 8 ? mockReservations[i % 4]?.arrivalTime : null
}));

export default function Admin() {
  const [reservations, setReservations] = useState(mockReservations);
  
  const updateReservationStatus = (id: number, newStatus: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-pending text-pending-foreground">Pending</Badge>;
      case "seated":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Seated</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-success text-success-foreground">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalReservations = reservations.length;
  const pendingReservations = reservations.filter(r => r.status === "pending").length;
  const occupiedTables = mockTables.filter(t => t.status === "occupied").length;
  const totalRevenue = reservations
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.estimatedBill, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage reservations, tables, and monitor restaurant operations
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reservations</p>
                <p className="text-2xl font-bold text-primary">{totalReservations}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-pending">{pendingReservations}</p>
              </div>
              <Clock className="h-8 w-8 text-pending" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied Tables</p>
                <p className="text-2xl font-bold text-warning">{occupiedTables}/20</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
                <p className="text-2xl font-bold text-success">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations Table */}
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Active Reservations
            </CardTitle>
            <CardDescription>
              Manage customer reservations and table assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id} className="hover:bg-muted/50 transition-smooth">
                    <TableCell>
                      <div>
                        <p className="font-medium">{reservation.name}</p>
                        <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Table #{reservation.tableNumber}</Badge>
                    </TableCell>
                    <TableCell>{reservation.guests}</TableCell>
                    <TableCell>{reservation.arrivalTime}</TableCell>
                    <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                    <TableCell>
                      <Select
                        value={reservation.status}
                        onValueChange={(value) => updateReservationStatus(reservation.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="seated">Seated</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Table Status Overview */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Table Status
            </CardTitle>
            <CardDescription>
              Real-time table availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {mockTables.map((table) => (
                <div
                  key={table.number}
                  className={`
                    p-3 rounded-lg border text-center text-sm transition-smooth cursor-pointer
                    ${table.status === "occupied" 
                      ? "bg-warning/10 border-warning text-warning-foreground" 
                      : "bg-success/10 border-success text-success-foreground hover:bg-success/20"
                    }
                  `}
                >
                  <div className="font-semibold">#{table.number}</div>
                  <div className="text-xs mt-1">
                    {table.status === "occupied" ? (
                      <div>
                        <div className="font-medium">{table.customer}</div>
                        <div className="text-xs opacity-75">{table.arrivalTime}</div>
                      </div>
                    ) : (
                      <div className="text-success">{table.capacity} seats</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Available:</span>
                <span className="font-semibold text-success">{mockTables.filter(t => t.status === "available").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Occupied:</span>
                <span className="font-semibold text-warning">{occupiedTables}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-2">
                <span>Total Tables:</span>
                <span>{mockTables.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}