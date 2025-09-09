import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Clock, Users, Phone, User, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { id: 1, name: "Grilled Chicken", price: 25.99, category: "Mains", description: "Tender grilled chicken with herbs" },
  { id: 2, name: "Caesar Salad", price: 12.99, category: "Salads", description: "Fresh romaine with parmesan" },
  { id: 3, name: "Beef Burger", price: 18.99, category: "Mains", description: "Juicy beef burger with fries" },
  { id: 4, name: "Pasta Carbonara", price: 22.99, category: "Pasta", description: "Creamy pasta with bacon" },
  { id: 5, name: "Chocolate Cake", price: 8.99, category: "Desserts", description: "Rich chocolate layer cake" },
];

export default function Customer() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    guests: "",
    arrivalTime: "",
  });
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation.name || !reservation.phone || !reservation.guests || !reservation.arrivalTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all reservation details",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
    toast({
      title: "Reservation Details Saved",
      description: "Now you can pre-order food items",
    });
  };

  const addToOrder = (item: any) => {
    const quantity = quantities[item.id] || 1;
    const existingIndex = selectedItems.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      const updated = [...selectedItems];
      updated[existingIndex].quantity += quantity;
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity }]);
    }
    
    toast({
      title: "Added to Order",
      description: `${quantity}x ${item.name} added`,
    });
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFinalSubmit = () => {
    const tableNumber = Math.floor(Math.random() * 20) + 1;
    
    toast({
      title: "Reservation Confirmed! 🎉",
      description: `Table ${tableNumber} reserved. Arrival: ${reservation.arrivalTime}. Total: $${totalAmount.toFixed(2)}`,
    });
    
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-elegant border-success bg-gradient-to-br from-success/5 to-success/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-success flex items-center justify-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Reservation Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Name:</strong> {reservation.name}</div>
              <div><strong>Phone:</strong> {reservation.phone}</div>
              <div><strong>Guests:</strong> {reservation.guests}</div>
              <div><strong>Table:</strong> #{Math.floor(Math.random() * 20) + 1}</div>
              <div><strong>Arrival Time:</strong> {reservation.arrivalTime}</div>
              <div><strong>Estimated Bill:</strong> ${totalAmount.toFixed(2)}</div>
            </div>
            
            {selectedItems.length > 0 && (
              <>
                <Separator />
                <h4 className="font-semibold">Pre-ordered Items:</h4>
                <div className="space-y-2">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <Button 
              onClick={() => {setStep(1); setSelectedItems([]); setReservation({name: "", phone: "", guests: "", arrivalTime: ""});}} 
              className="w-full"
            >
              Make New Reservation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          WhatsApp Table Reservation
        </h1>
        <p className="text-muted-foreground">
          Reserve your table and pre-order food for a seamless dining experience
        </p>
      </div>

      {step === 1 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Reservation Details
            </CardTitle>
            <CardDescription>
              Please provide your reservation information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={reservation.name}
                    onChange={(e) => setReservation({...reservation, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={reservation.phone}
                    onChange={(e) => setReservation({...reservation, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Guests
                  </Label>
                  <Select onValueChange={(value) => setReservation({...reservation, guests: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Arrival Time
                  </Label>
                  <Select onValueChange={(value) => setReservation({...reservation, arrivalTime: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select arrival time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">In 30 minutes</SelectItem>
                      <SelectItem value="1hour">In 1 hour</SelectItem>
                      <SelectItem value="2hours">In 2 hours</SelectItem>
                      <SelectItem value="today-7pm">Today 7:00 PM</SelectItem>
                      <SelectItem value="today-8pm">Today 8:00 PM</SelectItem>
                      <SelectItem value="tomorrow-7pm">Tomorrow 7:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-gradient-restaurant hover:shadow-glow transition-smooth">
                Continue to Menu
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Menu & Pre-Order
                </CardTitle>
                <CardDescription>
                  Select items to pre-order (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="secondary">{item.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-lg font-semibold text-primary mt-1">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => setQuantities({...quantities, [item.id]: parseInt(value)})}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="1" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button onClick={() => addToOrder(item)} size="sm">
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="shadow-elegant sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No items selected</p>
                ) : (
                  <>
                    <div className="space-y-2">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}
                
                <Button onClick={handleFinalSubmit} className="w-full bg-gradient-restaurant">
                  Confirm Reservation
                </Button>
                
                <Button onClick={() => setStep(1)} variant="outline" className="w-full">
                  Back to Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}