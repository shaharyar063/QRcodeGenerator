export const qrTypeFormConfig: Record<
  string,
  { heading: string; hint: string; placeholder?: string }
> = {
  url: {
    heading: "Redirect to an existing web URL",
    hint: "Try something like https://example.com/",
    placeholder: "Enter URL",
  },
  wifi: {
    heading: "Share your WiFi network",
    hint: "Guests scan to connect — no password typing needed.",
  },
  email: {
    heading: "Pre-fill an email message",
    hint: "Opens the recipient's email app with your details.",
  },
  phone: {
    heading: "Dial a phone number",
    hint: "Scanning opens the phone dialer instantly.",
  },
  sms: {
    heading: "Send a pre-filled text message",
    hint: "Great for support lines and SMS campaigns.",
  },
  vcard: {
    heading: "Share a digital business card",
    hint: "Save contact details with one scan.",
  },
  whatsapp: {
    heading: "Start a WhatsApp chat",
    hint: "Include country code, e.g. +1 234 567 8900",
  },
  text: {
    heading: "Display plain text",
    hint: "Works offline — no internet required to scan.",
  },
  location: {
    heading: "Open a map location",
    hint: "Uses GPS coordinates for Google or Apple Maps.",
  },
  event: {
    heading: "Add a calendar event",
    hint: "Includes title, date, time, and location.",
  },
};
