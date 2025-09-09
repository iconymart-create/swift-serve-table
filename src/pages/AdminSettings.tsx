import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Clock, MapPin, Phone, Mail, Wifi, Database, Shield } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    restaurant: {
      name: "RestaurantPro",
      address: "123 Main Street, City, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@restaurantpro.com",
      description: "A premium dining experience with exceptional service."
    },
    operations: {
      openingHours: "10:00 AM",
      closingHours: "11:00 PM",
      reservationBuffer: "30",
      maxAdvanceBooking: "30",
      autoConfirm: true,
      tableTimeout: "120"
    },
    notifications: {
      smsEnabled: true,
      emailEnabled: true,
      whatsappEnabled: true,
      pushNotifications: true,
      kitchenAlerts: true
    },
    integrations: {
      googleSheets: false,
      whatsappApi: false,
      paymentGateway: false,
      analytics: true
    }
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-restaurant bg-clip-text text-transparent">
          Restaurant Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure restaurant information, operations, and system integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Information */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Restaurant Information
            </CardTitle>
            <CardDescription>
              Basic restaurant details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                value={settings.restaurant.name}
                onChange={(e) => updateSetting('restaurant', 'name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={settings.restaurant.address}
                onChange={(e) => updateSetting('restaurant', 'address', e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.restaurant.phone}
                  onChange={(e) => updateSetting('restaurant', 'phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.restaurant.email}
                  onChange={(e) => updateSetting('restaurant', 'email', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={settings.restaurant.description}
                onChange={(e) => updateSetting('restaurant', 'description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours & Reservations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operations Settings
            </CardTitle>
            <CardDescription>
              Configure operating hours and reservation policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="openingHours">Opening Time</Label>
                <Input
                  id="openingHours"
                  type="time"
                  value={settings.operations.openingHours}
                  onChange={(e) => updateSetting('operations', 'openingHours', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="closingHours">Closing Time</Label>
                <Input
                  id="closingHours"
                  type="time"
                  value={settings.operations.closingHours}
                  onChange={(e) => updateSetting('operations', 'closingHours', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="reservationBuffer">Reservation Buffer (minutes)</Label>
              <Input
                id="reservationBuffer"
                type="number"
                value={settings.operations.reservationBuffer}
                onChange={(e) => updateSetting('operations', 'reservationBuffer', e.target.value)}
                placeholder="Time between reservations"
              />
            </div>
            
            <div>
              <Label htmlFor="maxAdvanceBooking">Max Advance Booking (days)</Label>
              <Input
                id="maxAdvanceBooking"
                type="number"
                value={settings.operations.maxAdvanceBooking}
                onChange={(e) => updateSetting('operations', 'maxAdvanceBooking', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="tableTimeout">Table Timeout (minutes)</Label>
              <Input
                id="tableTimeout"
                type="number"
                value={settings.operations.tableTimeout}
                onChange={(e) => updateSetting('operations', 'tableTimeout', e.target.value)}
                placeholder="Auto-release table after"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-confirm Reservations</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically confirm valid reservations
                </p>
              </div>
              <Switch
                checked={settings.operations.autoConfirm}
                onCheckedChange={(checked) => updateSetting('operations', 'autoConfirm', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how customers and staff receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Send SMS alerts to customers</p>
              </div>
              <Switch
                checked={settings.notifications.smsEnabled}
                onCheckedChange={(checked) => updateSetting('notifications', 'smsEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email confirmations</p>
              </div>
              <Switch
                checked={settings.notifications.emailEnabled}
                onCheckedChange={(checked) => updateSetting('notifications', 'emailEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WhatsApp Integration</Label>
                <p className="text-sm text-muted-foreground">Enable WhatsApp bookings</p>
              </div>
              <Switch
                checked={settings.notifications.whatsappEnabled}
                onCheckedChange={(checked) => updateSetting('notifications', 'whatsappEnabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Real-time web notifications</p>
              </div>
              <Switch
                checked={settings.notifications.pushNotifications}
                onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Kitchen Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert kitchen staff of new orders</p>
              </div>
              <Switch
                checked={settings.notifications.kitchenAlerts}
                onCheckedChange={(checked) => updateSetting('notifications', 'kitchenAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Integrations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              System Integrations
            </CardTitle>
            <CardDescription>
              Connect with external services and APIs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Google Sheets Sync</Label>
                <p className="text-sm text-muted-foreground">Auto-export data to Google Sheets</p>
              </div>
              <Switch
                checked={settings.integrations.googleSheets}
                onCheckedChange={(checked) => updateSetting('integrations', 'googleSheets', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WhatsApp Business API</Label>
                <p className="text-sm text-muted-foreground">Connect WhatsApp Business account</p>
              </div>
              <Switch
                checked={settings.integrations.whatsappApi}
                onCheckedChange={(checked) => updateSetting('integrations', 'whatsappApi', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Gateway</Label>
                <p className="text-sm text-muted-foreground">Enable online payments</p>
              </div>
              <Switch
                checked={settings.integrations.paymentGateway}
                onCheckedChange={(checked) => updateSetting('integrations', 'paymentGateway', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-muted-foreground">Track user behavior and performance</p>
              </div>
              <Switch
                checked={settings.integrations.analytics}
                onCheckedChange={(checked) => updateSetting('integrations', 'analytics', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <Card className="shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Save Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Apply all changes to the restaurant system
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save All Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}