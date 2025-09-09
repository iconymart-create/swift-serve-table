import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Phone, Users, Clock, MapPin } from "lucide-react";

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

export default function AdminReservations() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Reservations Management
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage all customer reservations and table assignments
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Reservations
          </CardTitle>
          <CardDescription>
            Manage customer reservations and update their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Details</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Party Size</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Pre-ordered Items</TableHead>
                <TableHead>Estimated Bill</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id} className="hover:bg-muted/50 transition-smooth">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {reservation.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {reservation.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <MapPin className="h-3 w-3" />
                      Table #{reservation.tableNumber}
                    </Badge>
                  </TableCell>
                  <TableCell>{reservation.guests} guests</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {reservation.arrivalTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {reservation.items.map((item, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {item}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-success">
                      ${reservation.estimatedBill.toFixed(2)}
                    </span>
                  </TableCell>
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
    </div>
  );
}