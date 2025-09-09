import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, Plus, Edit, Trash2, Users, Clock, MapPin } from "lucide-react";

// Mock reservations for table assignments
const mockReservations = [
  {
    id: 1,
    name: "John Smith",
    arrivalTime: "7:00 PM Today",
    status: "pending"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    arrivalTime: "8:30 PM Today",
    status: "seated"
  }
];

// Mock tables with dynamic availability based on reservations
const mockTables = Array.from({length: 20}, (_, i) => ({
  id: i + 1,
  number: i + 1,
  capacity: Math.floor(Math.random() * 6) + 2,
  status: i < 8 ? "occupied" : "available",
  customer: i < 8 ? mockReservations[i % 2]?.name : null,
  arrivalTime: i < 8 ? mockReservations[i % 2]?.arrivalTime : null,
  reservationStatus: i < 8 ? mockReservations[i % 2]?.status : null
}));

export default function AdminTables() {
  const [tables, setTables] = useState(mockTables);
  const [newTable, setNewTable] = useState({ number: "", capacity: "" });

  const updateTableStatus = (tableId: number, newStatus: string) => {
    setTables(prev => 
      prev.map(table => 
        table.id === tableId 
          ? { 
              ...table, 
              status: newStatus,
              customer: newStatus === "available" ? null : table.customer,
              arrivalTime: newStatus === "available" ? null : table.arrivalTime,
              reservationStatus: newStatus === "available" ? null : table.reservationStatus
            }
          : table
      )
    );
  };

  const addNewTable = () => {
    if (newTable.number && newTable.capacity) {
      const tableExists = tables.some(table => table.number === parseInt(newTable.number));
      if (!tableExists) {
        setTables(prev => [
          ...prev,
          {
            id: Math.max(...prev.map(t => t.id)) + 1,
            number: parseInt(newTable.number),
            capacity: parseInt(newTable.capacity),
            status: "available",
            customer: null,
            arrivalTime: null,
            reservationStatus: null
          }
        ]);
        setNewTable({ number: "", capacity: "" });
      }
    }
  };

  const deleteTable = (tableId: number) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
  };

  const availableTables = tables.filter(t => t.status === "available");
  const occupiedTables = tables.filter(t => t.status === "occupied");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Table Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage restaurant tables, assignments, and availability
        </p>
      </div>

      {/* Table Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tables</p>
                <p className="text-2xl font-bold text-primary">{tables.length}</p>
              </div>
              <Utensils className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Tables</p>
                <p className="text-2xl font-bold text-success">{availableTables.length}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-elegant transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied Tables</p>
                <p className="text-2xl font-bold text-warning">{occupiedTables.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Table */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Table
            </CardTitle>
            <CardDescription>
              Create a new table for the restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                type="number"
                placeholder="Enter table number"
                value={newTable.number}
                onChange={(e) => setNewTable(prev => ({ ...prev, number: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="capacity">Seating Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Number of seats"
                value={newTable.capacity}
                onChange={(e) => setNewTable(prev => ({ ...prev, capacity: e.target.value }))}
              />
            </div>
            <Button onClick={addNewTable} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </CardContent>
        </Card>

        {/* Table Status Grid */}
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Restaurant Floor Plan
            </CardTitle>
            <CardDescription>
              Real-time table status and customer assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`
                    p-4 rounded-lg border text-center text-sm transition-smooth relative group
                    ${table.status === "occupied" 
                      ? "bg-warning/10 border-warning text-warning-foreground" 
                      : "bg-success/10 border-success text-success-foreground hover:bg-success/20"
                    }
                  `}
                >
                  <div className="font-semibold text-lg">#{table.number}</div>
                  <div className="text-xs mt-1">
                    {table.status === "occupied" ? (
                      <div>
                        <div className="font-medium truncate">{table.customer}</div>
                        <div className="text-xs opacity-75">{table.arrivalTime}</div>
                        <Badge 
                          variant="outline" 
                          className="mt-1 text-xs"
                        >
                          {table.reservationStatus}
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-success">
                        <Users className="h-4 w-4 mx-auto mb-1" />
                        {table.capacity} seats
                      </div>
                    )}
                  </div>
                  
                  {/* Management Controls */}
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                    <Select
                      value={table.status}
                      onValueChange={(value) => updateTableStatus(table.id, value)}
                    >
                      <SelectTrigger className="w-20 h-6 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Free</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={() => deleteTable(table.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Available Tables:</span>
                  <span className="font-semibold text-success">{availableTables.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Occupied Tables:</span>
                  <span className="font-semibold text-warning">{occupiedTables.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Capacity:</span>
                  <span className="font-semibold">{tables.reduce((sum, t) => sum + t.capacity, 0)} seats</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Occupancy Rate:</span>
                  <span>{Math.round((occupiedTables.length / tables.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}