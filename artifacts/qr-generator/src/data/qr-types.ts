import { Link, Wifi, Mail, Phone, MessageSquare, Contact, MessageCircle, FileText, MapPin, Calendar } from 'lucide-react';

/** Top 3 QR types shown directly in the header nav */
export const primaryNavQrTypeIds = ["url", "wifi", "vcard"] as const;

export const qrTypes = [
  {
    id: "url",
    label: "URL",
    icon: Link,
    description: "Link to any website",
    slug: "url",
    example: "https://example.com"
  },
  {
    id: "wifi",
    label: "WiFi",
    icon: Wifi,
    description: "Connect to a wireless network",
    slug: "wifi",
    example: "WIFI:S:MyNetwork;T:WPA;P:password;;"
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    description: "Draft an email",
    slug: "email",
    example: "mailto:hello@example.com"
  },
  {
    id: "phone",
    label: "Phone",
    icon: Phone,
    description: "Call a phone number",
    slug: "phone",
    example: "tel:+1234567890"
  },
  {
    id: "sms",
    label: "SMS",
    icon: MessageSquare,
    description: "Send a text message",
    slug: "sms",
    example: "SMSTO:+1234567890:Hello"
  },
  {
    id: "vcard",
    label: "vCard",
    icon: Contact,
    description: "Share contact details",
    slug: "vcard",
    example: "BEGIN:VCARD..."
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    description: "Start a WhatsApp chat",
    slug: "whatsapp",
    example: "https://wa.me/1234567890"
  },
  {
    id: "text",
    label: "Text",
    icon: FileText,
    description: "Display plain text",
    slug: "text",
    example: "Hello World"
  },
  {
    id: "location",
    label: "Location",
    icon: MapPin,
    description: "Share map coordinates",
    slug: "location",
    example: "geo:40.7128,-74.0060"
  },
  {
    id: "event",
    label: "Event",
    icon: Calendar,
    description: "Add an event to calendar",
    slug: "event",
    example: "BEGIN:VEVENT..."
  }
];
