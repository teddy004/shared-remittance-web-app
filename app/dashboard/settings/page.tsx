"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Smartphone,
  FileText,
  HelpCircle,
  LogOut,
  Check,
} from "@/lib/icons";
import { useAuth } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-primary">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-2">
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Security</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notifications</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-primary text-white">
                  <Globe className="h-5 w-5" />
                  <span className="font-medium">Preferences</span>
                </button>
              </nav>

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help Center</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  <FileText className="h-5 w-5" />
                  <span>Terms & Privacy</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-error hover:text-error/80 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Preferences Tab */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">App Preferences</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    defaultValue="en"
                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                  >
                    <option value="en">English</option>
                    <option value="am">አማርኛ (Amharic)</option>
                    <option value="om">Afaan Oromoo (Oromo)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <select
                    id="currency"
                    defaultValue="USD"
                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="ETB">ETB - Ethiopian Birr</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    defaultValue="America/New_York"
                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="Africa/Addis_Ababa">
                      East Africa Time (EAT)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary">Save Preferences</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
