import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { qrTypeFormConfig } from "@/data/qr-form-config";

interface QRFormProps {
  type: string;
  data: any;
  onChange: (data: any) => void;
  variant?: "default" | "hero";
}

function HeroField({
  heading,
  hint,
  children,
}: {
  heading: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug">
          {heading}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export function QRForm({ type, data, onChange, variant = "default" }: QRFormProps) {
  const handleChange = (key: string, value: any) => {
    onChange({ ...data, [key]: value });
  };

  const config = qrTypeFormConfig[type];
  const isHero = variant === "hero";

  const wrapHero = (fields: React.ReactNode) =>
    isHero && config ? (
      <HeroField heading={config.heading} hint={config.hint}>
        {fields}
      </HeroField>
    ) : (
      fields
    );

  switch (type) {
    case "url":
      return wrapHero(
        <div className={isHero ? "space-y-0" : "space-y-4"}>
          {!isHero && <Label htmlFor="url">Website URL</Label>}
          <Input
            id="url"
            placeholder={config?.placeholder ?? "https://example.com"}
            value={data.url || ""}
            onChange={(e) => handleChange("url", e.target.value)}
            className={isHero ? "h-11 rounded-full text-sm" : undefined}
          />
        </div>,
      );

    case "wifi":
      return wrapHero(
        <div className="space-y-3">
          <div className="space-y-2">
            {!isHero && <Label htmlFor="ssid">Network Name (SSID)</Label>}
            <Input
              id="ssid"
              placeholder="My Home WiFi"
              value={data.ssid || ""}
              onChange={(e) => handleChange("ssid", e.target.value)}
              className={isHero ? "h-10 rounded-lg text-sm" : undefined}
            />
          </div>
          <div className="space-y-2">
            {!isHero && <Label htmlFor="password">Password</Label>}
            <Input
              id="password"
              type="password"
              placeholder="Secret123"
              value={data.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              className={isHero ? "h-10 rounded-lg text-sm" : undefined}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              {!isHero && <Label htmlFor="security">Security</Label>}
              <Select
                value={data.security || "WPA"}
                onValueChange={(v) => handleChange("security", v)}
              >
                <SelectTrigger className={isHero ? "h-10 text-sm" : undefined}>
                  <SelectValue placeholder="WPA/WPA2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-6 sm:pt-7">
              <Switch
                id="hidden"
                checked={data.hidden || false}
                onCheckedChange={(v) => handleChange("hidden", v)}
              />
              <Label htmlFor="hidden" className="text-xs sm:text-sm">
                Hidden
              </Label>
            </div>
          </div>
        </div>,
      );

    case "email":
      return wrapHero(
        <div className="space-y-3">
          <div className="space-y-2">
            {!isHero && <Label htmlFor="email">Email Address</Label>}
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className={isHero ? "h-10 rounded-lg text-sm" : undefined}
            />
          </div>
          <div className="space-y-2">
            {!isHero && <Label htmlFor="subject">Subject</Label>}
            <Input
              id="subject"
              placeholder="Inquiry"
              value={data.subject || ""}
              onChange={(e) => handleChange("subject", e.target.value)}
              className={isHero ? "h-10 rounded-lg text-sm" : undefined}
            />
          </div>
          <div className="space-y-2">
            {!isHero && <Label htmlFor="body">Message</Label>}
            <Textarea
              id="body"
              placeholder="Type your message here..."
              value={data.body || ""}
              onChange={(e) => handleChange("body", e.target.value)}
              className={isHero ? "min-h-[88px] text-sm rounded-lg" : undefined}
            />
          </div>
        </div>,
      );

    case "phone":
      return wrapHero(
        <div className={isHero ? "space-y-0" : "space-y-4"}>
          {!isHero && <Label htmlFor="phone">Phone Number</Label>}
          <Input
            id="phone"
            type="tel"
            placeholder="+1 234 567 8900"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={isHero ? "h-11 rounded-full text-sm" : undefined}
          />
        </div>,
      );

    case "sms":
      return wrapHero(
        <div className="space-y-3">
          <div className="space-y-2">
            {!isHero && <Label htmlFor="phone">Phone Number</Label>}
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={isHero ? "h-10 rounded-lg text-sm" : undefined}
            />
          </div>
          <div className="space-y-2">
            {!isHero && <Label htmlFor="message">Message</Label>}
            <Textarea
              id="message"
              placeholder="Hello..."
              value={data.message || ""}
              onChange={(e) => handleChange("message", e.target.value)}
              className={isHero ? "min-h-[72px] text-sm rounded-lg" : undefined}
            />
          </div>
        </div>,
      );

    case "vcard":
      return wrapHero(
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First name"
              value={data.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
            <Input
              placeholder="Last name"
              value={data.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="tel"
              placeholder="Phone"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
            <Input
              type="email"
              placeholder="Email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Company"
              value={data.organization || ""}
              onChange={(e) => handleChange("organization", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
            <Input
              placeholder="Job title"
              value={data.jobTitle || ""}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
          </div>
          <Input
            placeholder="Website"
            value={data.website || ""}
            onChange={(e) => handleChange("website", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
          <Input
            placeholder="Address"
            value={data.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
        </div>,
      );

    case "whatsapp":
      return wrapHero(
        <div className="space-y-3">
          <Input
            type="tel"
            placeholder="+1 234 567 8900"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={isHero ? "h-10 rounded-lg text-sm" : undefined}
          />
          <Textarea
            placeholder="Pre-filled message..."
            value={data.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
            className={isHero ? "min-h-[72px] text-sm rounded-lg" : undefined}
          />
        </div>,
      );

    case "text":
      return wrapHero(
        <Textarea
          placeholder="Enter any text here..."
          className={isHero ? "min-h-[120px] text-sm rounded-lg" : "min-h-[150px]"}
          value={data.text || ""}
          onChange={(e) => handleChange("text", e.target.value)}
        />,
      );

    case "location":
      return wrapHero(
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Latitude"
            value={data.latitude || ""}
            onChange={(e) => handleChange("latitude", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
          <Input
            placeholder="Longitude"
            value={data.longitude || ""}
            onChange={(e) => handleChange("longitude", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
        </div>,
      );

    case "event":
      return wrapHero(
        <div className="space-y-3">
          <Input
            placeholder="Event name"
            value={data.eventName || ""}
            onChange={(e) => handleChange("eventName", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="datetime-local"
              value={data.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
            <Input
              type="datetime-local"
              value={data.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className={isHero ? "h-10 text-sm rounded-lg" : undefined}
            />
          </div>
          <Input
            placeholder="Location"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            className={isHero ? "h-10 text-sm rounded-lg" : undefined}
          />
          <Textarea
            placeholder="Description"
            value={data.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className={isHero ? "min-h-[72px] text-sm rounded-lg" : undefined}
          />
        </div>,
      );

    default:
      return null;
  }
}
