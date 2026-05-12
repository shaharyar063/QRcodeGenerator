import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QRFormProps {
  type: string;
  data: any;
  onChange: (data: any) => void;
}

export function QRForm({ type, data, onChange }: QRFormProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...data, [key]: value });
  };

  switch (type) {
    case 'url':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input 
              id="url" 
              placeholder="https://example.com" 
              value={data.url || ''} 
              onChange={(e) => handleChange('url', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ssid">Network Name (SSID)</Label>
            <Input 
              id="ssid" 
              placeholder="My Home WiFi" 
              value={data.ssid || ''} 
              onChange={(e) => handleChange('ssid', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="Secret123" 
              value={data.password || ''} 
              onChange={(e) => handleChange('password', e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="security">Security</Label>
              <Select value={data.security || "WPA"} onValueChange={(v) => handleChange('security', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="WPA/WPA2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-8">
              <Switch 
                id="hidden" 
                checked={data.hidden || false} 
                onCheckedChange={(v) => handleChange('hidden', v)} 
              />
              <Label htmlFor="hidden">Hidden Network</Label>
            </div>
          </div>
        </div>
      );

    case 'email':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email"
              placeholder="hello@example.com" 
              value={data.email || ''} 
              onChange={(e) => handleChange('email', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              placeholder="Inquiry" 
              value={data.subject || ''} 
              onChange={(e) => handleChange('subject', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <Textarea 
              id="body" 
              placeholder="Type your message here..." 
              value={data.body || ''} 
              onChange={(e) => handleChange('body', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'phone':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="+1 234 567 8900" 
              value={data.phone || ''} 
              onChange={(e) => handleChange('phone', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'sms':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="+1 234 567 8900" 
              value={data.phone || ''} 
              onChange={(e) => handleChange('phone', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hello..." 
              value={data.message || ''} 
              onChange={(e) => handleChange('message', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={data.firstName || ''} 
                onChange={(e) => handleChange('firstName', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={data.lastName || ''} 
                onChange={(e) => handleChange('lastName', e.target.value)} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                type="tel"
                value={data.phone || ''} 
                onChange={(e) => handleChange('phone', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={data.email || ''} 
                onChange={(e) => handleChange('email', e.target.value)} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Company</Label>
              <Input 
                id="organization" 
                value={data.organization || ''} 
                onChange={(e) => handleChange('organization', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                value={data.jobTitle || ''} 
                onChange={(e) => handleChange('jobTitle', e.target.value)} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website" 
              placeholder="https://"
              value={data.website || ''} 
              onChange={(e) => handleChange('website', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={data.address || ''} 
              onChange={(e) => handleChange('address', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'whatsapp':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (with country code)</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="+1 234 567 8900" 
              value={data.phone || ''} 
              onChange={(e) => handleChange('phone', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Pre-filled Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hello..." 
              value={data.message || ''} 
              onChange={(e) => handleChange('message', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea 
              id="text" 
              placeholder="Enter any text here..." 
              className="min-h-[150px]"
              value={data.text || ''} 
              onChange={(e) => handleChange('text', e.target.value)} 
            />
          </div>
        </div>
      );

    case 'location':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input 
                id="latitude" 
                placeholder="40.7128" 
                value={data.latitude || ''} 
                onChange={(e) => handleChange('latitude', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input 
                id="longitude" 
                placeholder="-74.0060" 
                value={data.longitude || ''} 
                onChange={(e) => handleChange('longitude', e.target.value)} 
              />
            </div>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input 
              id="eventName" 
              value={data.eventName || ''} 
              onChange={(e) => handleChange('eventName', e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date/Time</Label>
              <Input 
                id="startDate" 
                type="datetime-local"
                value={data.startDate || ''} 
                onChange={(e) => handleChange('startDate', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date/Time</Label>
              <Input 
                id="endDate" 
                type="datetime-local"
                value={data.endDate || ''} 
                onChange={(e) => handleChange('endDate', e.target.value)} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={data.location || ''} 
              onChange={(e) => handleChange('location', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={data.description || ''} 
              onChange={(e) => handleChange('description', e.target.value)} 
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
