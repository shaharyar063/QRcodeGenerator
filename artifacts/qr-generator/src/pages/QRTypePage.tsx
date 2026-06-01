import { useRoute } from "wouter";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { qrTypes } from "@/data/qr-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { ChevronRight, CheckCircle2, Download, Paintbrush, ShieldCheck, Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import NotFoundPage from "./not-found";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export const typeContent: Record<string, {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subtitle: string;
  useCases: string[];
  howToSteps: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  seoContent: { heading: string; text: string }[];
}> = {
  url: {
    metaTitle: "Free URL QR Code Generator — Create Link QR Codes Instantly",
    metaDescription: "Create a free QR code for any website URL. No signup required. Customize colors and logo, download in PNG or SVG. Scan with any smartphone camera.",
    keywords: "url qr code generator, link qr code, website qr code, qr code for website, free url qr code",
    h1: "Free URL QR Code Generator",
    subtitle: "Turn any website link into a scannable QR code instantly. Free, no signup, high-quality PNG and SVG download.",
    useCases: [
      "Link directly to your company homepage on printed marketing materials and packaging.",
      "Direct customers to an app store download page or promotional landing page.",
      "Share digital restaurant menus without printing physical copies.",
      "Link product labels to tutorial videos, warranties, or detailed spec pages.",
      "Add a QR code to event flyers linking to the registration or ticket purchase page."
    ],
    howToSteps: [
      { title: "Select the URL tab", desc: "Choose 'URL' in the generator above and paste your link into the field." },
      { title: "Customize design", desc: "Pick your brand colors, choose a dot style, and optionally upload your logo." },
      { title: "Test the scan", desc: "Scan the live preview with your smartphone to confirm the link opens correctly." },
      { title: "Download", desc: "Save as PNG for digital use or SVG for crisp, print-ready quality at any size." }
    ],
    faqs: [
      { q: "Can I change the URL after creating the QR code?", a: "Static QR codes (like the ones we generate) encode the URL directly into the pattern. To change the destination, you need to generate a new QR code. For editable destinations, you would need a dynamic QR code service — but those require a paid subscription and stop working if you cancel." },
      { q: "What types of URLs work with a QR code?", a: "Any valid URL works: https websites, http pages, app store links, deep links into mobile apps, YouTube videos, Google Maps locations, or even tel: and mailto: links. Always include the full URL starting with https://." },
      { q: "How short should my URL be for a QR code?", a: "Shorter URLs produce simpler, less dense QR codes that scan faster and more reliably — especially at small print sizes. If your URL is long, consider using a URL shortener before generating the code. Keep the encoded string under 100 characters where possible." }
    ],
    seoContent: [
      {
        heading: "Why URL QR Codes Are the Most Popular Type",
        text: "URL QR codes are the foundation of modern print-to-digital marketing. By bridging physical media — business cards, posters, product labels, menus — with any online destination, they eliminate the friction of typing long web addresses. A well-placed URL QR code can turn a printed flyer into a complete sales funnel entry point."
      },
      {
        heading: "Static vs. Dynamic URL QR Codes",
        text: "Our generator creates static URL QR codes — the destination URL is encoded directly into the pattern. This means the code works forever without any subscription or third-party dependency. Dynamic URL QR codes allow you to change the destination after printing, but they require a paid plan and stop working if you cancel. For most use cases, static codes are the better, free choice."
      }
    ]
  },
  wifi: {
    metaTitle: "Free WiFi QR Code Generator — Share Your Network Password",
    metaDescription: "Create a free WiFi QR code. Guests scan it to connect instantly — no password typing. Supports WPA, WPA2, WEP. Download PNG or SVG. No signup required.",
    keywords: "wifi qr code generator, wifi qr code, qr code for wifi, wifi password qr code, free wifi qr code",
    h1: "Free WiFi QR Code Generator",
    subtitle: "Let guests join your WiFi network with a single scan — no password typing. Free, no signup, works on iPhone and Android.",
    useCases: [
      "Cafes and restaurants offering frictionless guest WiFi access at every table.",
      "Offices letting clients and visitors connect without calling the receptionist.",
      "Airbnb and short-term rental hosts helping guests connect the moment they arrive.",
      "Co-working spaces displaying a single scannable code at the entrance.",
      "Events and conferences with dedicated guest networks for attendees."
    ],
    howToSteps: [
      { title: "Select the WiFi tab", desc: "Choose 'WiFi' in the generator and enter your network name (SSID) exactly as it appears." },
      { title: "Enter your password", desc: "Type your WiFi password and select the security type — WPA/WPA2 for most modern routers." },
      { title: "Customize and test", desc: "Optionally add your logo or brand colors. Scan the preview to confirm automatic connection." },
      { title: "Print and display", desc: "Download as SVG for print-ready quality. Place on table tents, menus, or near the entrance." }
    ],
    faqs: [
      { q: "Does the WiFi QR code work on iPhone?", a: "Yes. iOS 11 and later can connect to WiFi networks directly from the native Camera app when scanning a WiFi QR code — no additional app required. Android 10 and later also support this natively." },
      { q: "Is it safe to create a WiFi QR code?", a: "Yes. The WiFi password is encoded into the QR code pattern itself — it is not stored on any server. However, anyone who scans the code will be able to connect to your network, so treat the QR code with the same care as posting your password on a sign." },
      { q: "What if my WiFi password changes?", a: "You need to generate a new QR code whenever the password changes. To minimize this, create a dedicated guest network with a stable password, separate from your main network — this also improves security." }
    ],
    seoContent: [
      {
        heading: "How WiFi QR Codes Work",
        text: "A WiFi QR code encodes your network credentials in the WIFI: URI format (WIFI:S:NetworkName;T:WPA;P:password;;). When a compatible device scans it, the operating system interprets this format and automatically offers to join the network. The password is never transmitted to any server — it is decoded locally on the device."
      },
      {
        heading: "Best Practices for Displaying WiFi QR Codes",
        text: "Print the code at a minimum of 3 × 3 cm for reliable scanning in typical café lighting. Place it at eye level on table tents or near the entrance — locations where guests naturally look when they arrive. Add a brief label 'Scan to connect to WiFi' since not all guests immediately recognize QR codes. Download in SVG format for perfect print quality at any size."
      }
    ]
  },
  email: {
    metaTitle: "Free Email QR Code Generator — Pre-Fill Email Address & Subject",
    metaDescription: "Create a free QR code that pre-fills an email with your address, subject line, and body text. No signup needed. Download PNG or SVG instantly.",
    keywords: "email qr code generator, email qr code, qr code for email, mailto qr code, free email qr code",
    h1: "Free Email QR Code Generator",
    subtitle: "Create a QR code that opens a pre-addressed email draft when scanned. No signup, no cost, PNG and SVG download.",
    useCases: [
      "Print-to-email marketing: let magazine readers email you with one scan.",
      "Event networking: attendees email you their contact details by scanning your badge.",
      "Customer feedback: scan to send a pre-formatted support or review request.",
      "Conference sponsorships: exhibitors collect leads without a form.",
      "Product packaging: customers email for warranty support or questions."
    ],
    howToSteps: [
      { title: "Select the Email tab", desc: "Choose 'Email' and enter the recipient address, subject line, and optional message body." },
      { title: "Preview the mailto", desc: "The generated code will open the device's default email app with your fields pre-filled." },
      { title: "Customize", desc: "Add brand colors or a logo to match your printed materials." },
      { title: "Download", desc: "Save as PNG for digital or SVG for high-quality print." }
    ],
    faqs: [
      { q: "Which email apps will the QR code open?", a: "The code generates a mailto: URI, which opens the device's default email app — Gmail, Apple Mail, Outlook, or any other email client the user has set as default." },
      { q: "Can I pre-fill the email body?", a: "Yes. Our generator lets you pre-fill the To address, Subject line, and the Body of the email." }
    ],
    seoContent: [
      {
        heading: "How Email QR Codes Work",
        text: "Email QR codes encode a mailto: URI — for example, mailto:hello@company.com?subject=Inquiry&body=Hello. When scanned, the device's default email app opens with the specified fields pre-filled. The user only needs to tap Send, dramatically lowering the barrier to getting in touch."
      }
    ]
  },
  phone: {
    metaTitle: "Free Phone QR Code Generator — Dial a Number Instantly",
    metaDescription: "Create a free QR code that auto-dials your phone number when scanned. No signup. Download PNG or SVG. Perfect for business cards and signage.",
    keywords: "phone qr code generator, phone number qr code, call qr code, tel qr code, free phone qr code",
    h1: "Free Phone Number QR Code Generator",
    subtitle: "Create a QR code that opens a phone dial screen instantly. Free, no signup, great for business cards and advertising.",
    useCases: [
      "Business cards: customers call you with one scan instead of dialing manually.",
      "Storefront window signs: visitors call for appointments or inquiries.",
      "Real estate yard signs: potential buyers call the agent instantly.",
      "Emergency contact posters: staff dial the right person in seconds.",
      "Customer service desks: link to the direct support line without typing."
    ],
    howToSteps: [
      { title: "Select the Phone tab", desc: "Enter your phone number including the international dialing code (e.g., +1 for the US)." },
      { title: "Preview the call link", desc: "The code encodes a tel: URI — scanning opens the phone dialer with the number pre-entered." },
      { title: "Customize", desc: "Add your logo or brand color to match your business card design." },
      { title: "Download", desc: "Use SVG for print-ready business cards or PNG for digital." }
    ],
    faqs: [
      { q: "Will the QR code call automatically or just open the dialer?", a: "The code opens the phone app with the number pre-filled. The user still taps Call to initiate the call — this is the standard behavior for tel: links on all platforms." }
    ],
    seoContent: [
      {
        heading: "Phone QR Codes for Business",
        text: "A phone QR code encodes a tel: URI, which opens the device's native phone dialer with your number ready to call. For business cards, storefront signs, and advertising materials, this removes the single most friction-filled step between a prospect seeing your number and actually calling you."
      }
    ]
  },
  sms: {
    metaTitle: "Free SMS QR Code Generator — Pre-Fill Text Messages",
    metaDescription: "Create a free SMS QR code that opens a pre-addressed text message when scanned. No signup. Download PNG or SVG. Perfect for marketing and support.",
    keywords: "sms qr code generator, sms qr code, text message qr code, qr code for text, free sms qr code",
    h1: "Free SMS QR Code Generator",
    subtitle: "Generate a QR code that opens a pre-written text message to your number. Free, no signup, works on iPhone and Android.",
    useCases: [
      "SMS marketing opt-ins: customers text a keyword by scanning your flyer.",
      "Customer service: scan to send a pre-formatted support request.",
      "Event RSVPs: guests confirm attendance by scanning and tapping Send.",
      "Retail loyalty programs: scan to join a text-based loyalty scheme.",
      "Appointment reminders: scan to text a confirmation."
    ],
    howToSteps: [
      { title: "Select the SMS tab", desc: "Enter the destination phone number and your pre-written message text." },
      { title: "Test on device", desc: "Scan the preview to confirm the messaging app opens with the correct number and message." },
      { title: "Customize and download", desc: "Apply brand colors, add a logo, then download PNG or SVG." }
    ],
    faqs: [
      { q: "Can I include a pre-written message in the SMS QR code?", a: "Yes. The code encodes both the recipient number and the message body. When scanned, the messaging app opens with both fields pre-filled — the user simply taps Send." }
    ],
    seoContent: [
      {
        heading: "SMS QR Codes for Marketing and Support",
        text: "SMS QR codes encode an SMSTO: URI that opens the device's native messaging app with your number and a pre-written message. This is particularly powerful for opt-in marketing campaigns where you want customers to text a specific keyword, or for customer service where you want to receive structured support requests."
      }
    ]
  },
  vcard: {
    metaTitle: "Free vCard QR Code Generator — Digital Business Card",
    metaDescription: "Create a free vCard QR code for your digital business card. Scan to save contact info instantly. No signup. Download PNG or SVG for print.",
    keywords: "vcard qr code generator, vcard qr code, digital business card qr code, contact qr code, free vcard qr code",
    h1: "Free vCard QR Code Generator",
    subtitle: "Create a digital business card QR code. One scan saves your full contact details to any smartphone — no app required.",
    useCases: [
      "Business cards: replace manual contact exchange with a single scan.",
      "Name badges at conferences: attendees scan to save your details instantly.",
      "Email signatures: embed your vCard QR code so recipients can save your contact.",
      "Website 'About' pages: let visitors save your contact info on mobile.",
      "Press kits: journalists scan to get your PR contact details instantly."
    ],
    howToSteps: [
      { title: "Select the vCard tab", desc: "Fill in your name, phone number, email, job title, company, and website." },
      { title: "Add your logo", desc: "Upload your company logo to appear at the center of the QR code." },
      { title: "Test on both platforms", desc: "Scan with both an iPhone and Android to confirm the contact saves correctly on each." },
      { title: "Download SVG for print", desc: "Use SVG format for crisp, scalable output on business cards and badges." }
    ],
    faqs: [
      { q: "What information can a vCard QR code include?", a: "Name, phone numbers (multiple), email addresses, job title, company name, website URLs, physical address, and notes. Our generator covers the most common fields used in professional settings." },
      { q: "Do I need an app to scan a vCard QR code?", a: "No. The native Camera app on iPhone (iOS 11+) and most Android devices reads vCard QR codes and offers to save the contact directly to the address book — no additional app required." }
    ],
    seoContent: [
      {
        heading: "Why vCard QR Codes Are Better Than Plain Business Cards",
        text: "A business card without a QR code requires the recipient to type your contact details manually — and most people never do. A vCard QR code lets them save your complete contact information in under two seconds, directly from the business card, with no typing and no errors. It converts a physical introduction into a reliable digital connection."
      }
    ]
  },
  whatsapp: {
    metaTitle: "Free WhatsApp QR Code Generator — Open Chat Instantly",
    metaDescription: "Create a free WhatsApp QR code that opens a chat to your number with a preset message. No signup. Download PNG or SVG. Works on iPhone and Android.",
    keywords: "whatsapp qr code generator, whatsapp qr code, whatsapp link qr code, wa.me qr code, free whatsapp qr code",
    h1: "Free WhatsApp QR Code Generator",
    subtitle: "Create a QR code that opens a WhatsApp conversation with your number. Free, no signup, instant download.",
    useCases: [
      "Customer service: let customers start a WhatsApp conversation directly from your storefront or packaging.",
      "E-commerce: add to product inserts for post-purchase support or upsells.",
      "Freelancers and consultants: put on business cards for quick client contact.",
      "Real estate: yard signs that let buyers WhatsApp the agent instantly.",
      "Restaurants: link to a WhatsApp number for reservations or delivery orders."
    ],
    howToSteps: [
      { title: "Select WhatsApp tab", desc: "Enter your phone number with the international country code (e.g., +44 for UK, +1 for US). Do not include spaces or dashes." },
      { title: "Optional: add a preset message", desc: "Pre-fill a greeting like 'Hi, I'd like to enquire about...' to guide the conversation." },
      { title: "Customize and test", desc: "Scan the preview to confirm WhatsApp opens to the correct number." },
      { title: "Download", desc: "PNG for digital use, SVG for print." }
    ],
    faqs: [
      { q: "Does the WhatsApp QR code work for WhatsApp Business?", a: "Yes. The generated link uses the standard wa.me format which works for both personal WhatsApp and WhatsApp Business accounts." },
      { q: "What if the user doesn't have WhatsApp installed?", a: "If the device does not have WhatsApp installed, the link will open the wa.me web page in the browser, which prompts the user to install WhatsApp or use WhatsApp Web." }
    ],
    seoContent: [
      {
        heading: "WhatsApp QR Codes for Business Communication",
        text: "WhatsApp has over 2 billion active users globally, making it the most popular messaging platform in most countries outside North America. A WhatsApp QR code makes it effortless for customers to reach you on their preferred platform — no phone number dialing, no finding your profile in search. The wa.me link format opens WhatsApp directly with your number and optional pre-filled message."
      }
    ]
  },
  text: {
    metaTitle: "Free Text QR Code Generator — Display Plain Text When Scanned",
    metaDescription: "Create a free QR code that displays plain text when scanned — no internet required. Perfect for offline messages, labels, and signs. Download PNG or SVG.",
    keywords: "text qr code generator, plain text qr code, qr code for text, free text qr code, offline qr code",
    h1: "Free Text QR Code Generator",
    subtitle: "Create a QR code that displays plain text when scanned — no internet connection required. Free, no signup.",
    useCases: [
      "Museum and gallery labels: scan to read extended descriptions without internet.",
      "Product instructions: encode brief assembly steps directly on packaging.",
      "Outdoor signs: display information that works without any network dependency.",
      "Emergency information: critical instructions that work when connectivity is unavailable.",
      "Coupons and voucher codes: encode a discount code directly in the pattern."
    ],
    howToSteps: [
      { title: "Select the Text tab", desc: "Type or paste your text into the field. Keep it under 300 characters for the most reliable scanning." },
      { title: "Preview the output", desc: "Scan the live preview to see exactly what text will appear when someone scans the code." },
      { title: "Download", desc: "PNG for on-screen display, SVG for print applications." }
    ],
    faqs: [
      { q: "Does a text QR code require internet to scan?", a: "No. Text QR codes are entirely offline — the text is decoded locally on the device with no server request. This makes them ideal for signage and packaging in locations with unreliable connectivity." },
      { q: "How much text can I encode in a QR code?", a: "A standard QR code can hold up to 4,296 alphanumeric characters. However, longer text creates denser patterns that are harder to scan. Keep text QR codes under 300 characters for best results." }
    ],
    seoContent: [
      {
        heading: "When to Use Text QR Codes",
        text: "Text QR codes are unique among QR types because they require no internet connection — the content is fully self-contained in the pattern. This makes them the right choice for remote locations, packaging where internet access cannot be guaranteed, emergency information displays, and any situation where the content should be accessible regardless of network availability."
      }
    ]
  },
  location: {
    metaTitle: "Free Location QR Code Generator — Share GPS Coordinates",
    metaDescription: "Create a free QR code for any GPS location. Opens in Google Maps or Apple Maps when scanned. No signup. Download PNG or SVG.",
    keywords: "location qr code generator, gps qr code, google maps qr code, map qr code, free location qr code",
    h1: "Free Location QR Code Generator",
    subtitle: "Generate a QR code that opens your exact GPS location in Google Maps or Apple Maps. Free, no signup, instant download.",
    useCases: [
      "Event invitations: scan to get turn-by-turn directions to the venue.",
      "Delivery addresses: encode the exact pickup or drop-off coordinates.",
      "Real estate: yard signs that open the property location in Maps.",
      "Hiking and outdoor: mark trailheads, campsites, or meeting points.",
      "Business cards: link to your office location for easy navigation."
    ],
    howToSteps: [
      { title: "Select Location tab", desc: "Enter the latitude and longitude coordinates of your location." },
      { title: "Verify the coordinates", desc: "Get coordinates from Google Maps by right-clicking a point and selecting the coordinates shown." },
      { title: "Download", desc: "Print the QR code on event invitations, signage, or business cards." }
    ],
    faqs: [
      { q: "How do I find GPS coordinates for my location?", a: "Open Google Maps, navigate to your location, right-click (or long-press on mobile) and the latitude and longitude will appear at the top of the context menu. Copy these numbers into our generator." },
      { q: "Which map app will the QR code open?", a: "The code uses the geo: URI scheme, which opens Google Maps on Android and typically Apple Maps or Google Maps on iOS depending on the user's default maps app." }
    ],
    seoContent: [
      {
        heading: "Location QR Codes for Events and Navigation",
        text: "A location QR code encodes GPS coordinates in the geo: URI format (e.g., geo:51.5074,-0.1278). When scanned, the device opens its default maps app at that exact location, offering turn-by-turn directions. This is far more precise than a text address and works in any country with any address format."
      }
    ]
  },
  event: {
    metaTitle: "Free Event QR Code Generator — Add to Calendar Instantly",
    metaDescription: "Create a free QR code that adds an event to any calendar app when scanned. Supports title, date, time, location, and description. No signup required.",
    keywords: "event qr code generator, calendar qr code, ics qr code, add to calendar qr code, free event qr code",
    h1: "Free Event QR Code Generator",
    subtitle: "Create a QR code that adds your event to iPhone, Android, or Outlook calendars with a single scan. Free, no signup.",
    useCases: [
      "Conference and trade show invitations: scan to add sessions to the calendar.",
      "Wedding invitations: guests add the date instantly without typing.",
      "Product launch events: print on marketing materials for easy RSVP tracking.",
      "Meetup and networking events: flyers that add the event time and location.",
      "Training sessions: send participants a QR code to block their calendar."
    ],
    howToSteps: [
      { title: "Select Event tab", desc: "Enter the event title, start date and time, end time, location, and optional description." },
      { title: "Test the calendar add", desc: "Scan the preview on your phone — it should prompt you to add the event to your calendar app." },
      { title: "Download and share", desc: "PNG for digital invitations and emails; SVG for print invitations and posters." }
    ],
    faqs: [
      { q: "Which calendar apps does the event QR code support?", a: "The code generates a VEVENT in iCalendar format, which is compatible with Apple Calendar, Google Calendar, Outlook, and virtually any standards-compliant calendar application." },
      { q: "Can I include a location and description in the calendar event?", a: "Yes. Our generator supports event title, start/end date and time, location, and a description field — all of which will appear in the calendar entry after scanning." }
    ],
    seoContent: [
      {
        heading: "How Event QR Codes Work",
        text: "Event QR codes encode a VEVENT iCalendar object — the same format used in .ics calendar files. When scanned, the device offers to add the event directly to the native calendar app, including the title, date, time, location, and description. No manual data entry, no risk of getting the date wrong."
      }
    ]
  }
};

export default function QRTypePage() {
  const [match, params] = useRoute("/qr-code-generator/:type");

  const typeConfig = qrTypes.find(t => t.slug === params?.type);

  const content = typeConfig
    ? (typeContent[typeConfig.id] ?? {
        metaTitle: `Free ${typeConfig.label} QR Code Generator`,
        metaDescription: `Create a free ${typeConfig.label} QR code. No signup required. Download PNG or SVG instantly.`,
        keywords: `${typeConfig.label.toLowerCase()} qr code generator, free ${typeConfig.label.toLowerCase()} qr code`,
        h1: `Free ${typeConfig.label} QR Code Generator`,
        subtitle: `Create a custom, high-quality ${typeConfig.label} QR code for free. No signup required.`,
        useCases: [
          "Streamline communication by removing the need to manually type data.",
          "Bridge physical print materials with instant digital actions on mobile."
        ],
        howToSteps: [
          { title: `Select ${typeConfig.label}`, desc: `Choose the '${typeConfig.label}' tab and fill in your information.` },
          { title: "Customize", desc: "Adjust colors, dot styles, and upload a logo." },
          { title: "Download", desc: "Save as PNG for digital or SVG for print." }
        ],
        faqs: [] as { q: string; a: string }[],
        seoContent: [] as { heading: string; text: string }[]
      })
    : null;

  // Hook must be called unconditionally — use empty/fallback values when no typeConfig
  useSEO({
    title: content?.metaTitle ?? "Free QR Code Generator",
    description: content?.metaDescription ?? "Create free QR codes instantly.",
    canonicalPath: typeConfig ? `/qr-code-generator/${typeConfig.slug}` : "/",
    ogImage: typeConfig ? `og-qr-${typeConfig.slug}` : undefined,
    keywords: content?.keywords,
    jsonLd: typeConfig && content ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "name": `Free ${typeConfig.label} QR Code Generator`,
          "url": `${SITE_ORIGIN}/qr-code-generator/${typeConfig.slug}`,
          "description": content.metaDescription,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_ORIGIN },
            { "@type": "ListItem", "position": 2, "name": SITE_NAME, "item": SITE_ORIGIN },
            { "@type": "ListItem", "position": 3, "name": `${typeConfig.label} QR Code` }
          ]
        },
        ...(content.faqs.length > 0 ? [{
          "@type": "FAQPage",
          "mainEntity": content.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        }] : [])
      ]
    } : undefined
  });

  // Conditional renders come AFTER all hooks
  if (!match || !params?.type || !typeConfig || !content) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <Link href="/" className="hover:text-foreground transition-colors">QR Code Generator</Link>
            <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
            <span className="text-foreground font-medium">{typeConfig.label} QR Code</span>
          </nav>
        </div>
      </div>

      {/* Hero + Generator */}
      <section className="pt-7 pb-12 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto text-center mb-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {content.h1}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
            {[
              { icon: ShieldCheck, label: "No Signup" },
              { icon: Zap, label: "Free Forever" },
              { icon: Download, label: "PNG & SVG" },
              { icon: Paintbrush, label: "Fully Custom" }
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 bg-card border px-3 py-1 rounded-full">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-0 md:px-4">
          <QRGenerator initialType={typeConfig.id} />
        </div>
      </section>

      {/* How to Create */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">How to Create a {typeConfig.label} QR Code</h2>
              <ol className="space-y-4">
                {content.howToSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-7 h-7 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
              <ul className="space-y-3">
                {content.useCases.map((uc, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{uc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Sections */}
      {content.seoContent.length > 0 && (
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-8">
              {content.seoContent.map((block, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-3">{block.heading}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="py-14 bg-card border-t">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {content.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Other QR Types */}
      <section className="py-14 bg-background border-t">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">Explore Other Free QR Code Types</h2>
          <p className="text-sm text-muted-foreground mb-6">All 10 types are free — no signup required.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {qrTypes.filter(t => t.id !== typeConfig.id).map(type => (
              <Link 
                key={type.id} 
                href={`/qr-code-generator/${type.slug}`}
                className="px-4 py-2 bg-card border rounded-full text-sm font-medium hover:border-foreground hover:bg-muted transition-colors flex items-center gap-2"
              >
                <type.icon className="w-4 h-4" />
                {type.label} QR Code
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
