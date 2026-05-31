import { SITE_ORIGIN } from "@/lib/site";

export function formatQRData(type: string, values: any): string {
  if (!values) return SITE_ORIGIN;

  switch (type) {
    case 'url':
      return values.url || SITE_ORIGIN;
      
    case 'wifi':
      const ssid = values.ssid || "";
      const password = values.password || "";
      const security = values.security || "WPA";
      const hidden = values.hidden ? "true" : "false";
      return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`;
      
    case 'email':
      const email = values.email || "";
      const subject = values.subject ? `?subject=${encodeURIComponent(values.subject)}` : "";
      const body = values.body ? `${subject ? '&' : '?'}body=${encodeURIComponent(values.body)}` : "";
      return `mailto:${email}${subject}${body}`;
      
    case 'phone':
      return `tel:${values.phone || ""}`;
      
    case 'sms':
      return `SMSTO:${values.phone || ""}:${values.message || ""}`;
      
    case 'whatsapp':
      const waPhone = (values.phone || "").replace(/[^0-9]/g, "");
      const waText = values.message ? `?text=${encodeURIComponent(values.message)}` : "";
      return `https://wa.me/${waPhone}${waText}`;
      
    case 'vcard':
      return `BEGIN:VCARD
VERSION:3.0
N:${values.lastName || ""};${values.firstName || ""};;;
FN:${values.firstName || ""} ${values.lastName || ""}
ORG:${values.organization || ""}
TITLE:${values.jobTitle || ""}
TEL;TYPE=WORK,VOICE:${values.phone || ""}
EMAIL:${values.email || ""}
URL:${values.website || ""}
ADR;TYPE=WORK:;;${values.address || ""};;;;
END:VCARD`;
      
    case 'text':
      return values.text || "Hello World";
      
    case 'location':
      return `geo:${values.latitude || "0"},${values.longitude || "0"}`;
      
    case 'event':
      const formatDT = (dateStr: string) => {
        if (!dateStr) return "";
        return dateStr.replace(/[-:]/g, "").substring(0, 15) + "Z";
      };
      return `BEGIN:VEVENT
SUMMARY:${values.eventName || ""}
DTSTART:${formatDT(values.startDate)}
DTEND:${formatDT(values.endDate)}
LOCATION:${values.location || ""}
DESCRIPTION:${values.description || ""}
END:VEVENT`;
      
    default:
      return SITE_ORIGIN;
  }
}
